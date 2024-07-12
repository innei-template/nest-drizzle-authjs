import { compareSync, hashSync } from 'bcryptjs'

import { BizException } from '@core/common/exceptions/biz.exception'
import { ErrorCodeEnum } from '@core/constants/error-code.constant'
import { DatabaseService } from '@core/processors/database/database.service'
import { InferInsertModel, eq, schema } from '@meta-muse/drizzle'
import { nanoid } from '@meta-muse/utils'
import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common'

import { AuthService } from '../auth/auth.service'
import { UserRegisterDto } from './dtos/register.dto'
import {
  UserSchemaProjection,
  UserSchemaSerializeProjection,
  userSchema,
} from './user.protect'

@Injectable()
export class UserService {
  private Logger = new Logger(UserService.name)

  constructor(
    private readonly authService: AuthService,

    private readonly db: DatabaseService,
  ) {}

  async register(userDto: UserRegisterDto) {
    const isExist = await this.db.drizzle.query.user
      .findFirst({
        where: (user, { eq }) => eq(user.username, userDto.username),
      })
      .then((user) => !!user)

    if (isExist) {
      throw new BizException(ErrorCodeEnum.UserExist)
    }

    const authCode = await this.authService.generateAuthCode()

    const model = await this.db.drizzle
      .insert(schema.user)
      .values({
        authCode,
        ...userDto,
        password: hashSync(userDto.password, 10),
      })
      .returning()

    return model[0]
  }

  /**
   * 修改密码
   *
   * @async
   * @param {string} id - 用户 id
   * @param {Partial} data - 部分修改数据
   */
  async patchUserData(
    id: string,
    data: Partial<InferInsertModel<typeof schema.user>>,
  ) {
    const { password } = data

    for (const key in UserSchemaProjection) {
      if (key in data) {
        delete data[key]
      }
    }

    const doc = { ...data }
    if (password !== undefined) {
      const currentUser = await this.db.drizzle.query.user.findFirst({
        where: (user, { eq }) => eq(user.id, id),
        columns: {
          password: true,
        },
      })

      if (!currentUser) {
        throw new BizException(ErrorCodeEnum.UserNotFound)
      }
      // 1. 验证新旧密码是否一致
      const isSamePassword = compareSync(password, currentUser.password)
      if (isSamePassword) {
        throw new UnprocessableEntityException('密码可不能和原来的一样哦')
      }

      // 2. 认证码重新生成
      const newCode = nanoid(10)
      doc.authCode = newCode
    }

    await this.db.drizzle
      .update(schema.user)
      .set({
        ...doc,
      })
      .where(eq(schema.user.id, id))
  }

  async getOwner() {
    const firstUser = await this.db.drizzle.query.user.findFirst()

    if (!firstUser) {
      throw new BizException(ErrorCodeEnum.UserNotFound)
    }
    return await userSchema
      .omit(UserSchemaSerializeProjection)
      .parseAsync(firstUser)
  }
}
