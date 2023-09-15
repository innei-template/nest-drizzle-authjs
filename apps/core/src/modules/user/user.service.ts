import { compareSync, hashSync } from 'bcrypt'
import { nanoid } from 'nanoid'

import { BizException } from '@core/common/exceptions/biz.exception'
import { ErrorCodeEnum } from '@core/constants/error-code.constant'
import { DatabaseService } from '@core/processors/database/database.service'
import { schema } from '@meta-muse/drizzle'
import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common'

import { AuthService } from '../auth/auth.service'
import { UserRegisterDto } from './dtos/register.dto'
import { UserSchemaProjection } from './user.protect'

@Injectable()
export class UserService {
  private Logger = new Logger(UserService.name)

  constructor(
    private readonly authService: AuthService,

    private readonly db: DatabaseService,
  ) {}

  async register(userDto: UserRegisterDto) {
    // const isExist = await this.db.prisma.user.exists({
    //   where: {
    //     username: userDto.username,
    //   },
    // })

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

    return model
  }

  /**
   * 修改密码
   *
   * @async
   * @param {string} id - 用户 id
   * @param {Partial} data - 部分修改数据
   */
  async patchUserData(id: string, data: Partial<UserRegisterDto>) {
    const { password } = data

    for (const key in UserSchemaProjection) {
      if (key in data) {
        delete data[key]
      }
    }

    const doc = { ...data }
    if (password !== undefined) {
      // const currentUser = await this.db.prisma.user.findUnique({
      //   where: {
      //     id,
      //   },
      //   select: {
      //     password: true,
      //     apiTokens: true,
      //   },
      // })

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

    await this.db.prisma.user.update({
      where: {
        id,
      },
      data: doc,
    })
  }

  /**
   * 记录登陆的足迹 (ip, 时间)
   *
   * @async
   * @param {string} ip - string
   * @return {Promise<Record<string, Date|string>>} 返回上次足迹
   */
  async recordFootstep(ip: string): Promise<Record<string, Date | string>> {
    const master = await this.db.prisma.user.findFirst()
    if (!master) {
      throw new BizException(ErrorCodeEnum.UserNotFound)
    }
    const PrevFootstep = {
      lastLoginTime: master.lastLoginTime || new Date(1586090559569),
      lastLoginIp: master.lastLoginIp || null,
    }
    await this.db.prisma.user.update({
      where: {
        id: master.id,
      },
      data: {
        lastLoginTime: new Date(),
        lastLoginIp: ip,
      },
    })

    this.Logger.warn(`主人已登录，IP: ${ip}`)
    return PrevFootstep as any
  }

  getOwner() {
    // TODO omit keys
    return this.db.prisma.user
      .findFirstOrThrow()
      .catch(
        resourceNotFoundWrapper(new BizException(ErrorCodeEnum.UserNotFound)),
      )
  }
}
