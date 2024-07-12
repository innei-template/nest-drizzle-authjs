import { DatabaseService } from '@core/processors/database/database.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  constructor(private readonly db: DatabaseService) {}
}
