import { mkdirSync } from 'node:fs'

import crypto from 'node:crypto'
import { DATA_DIR, LOG_DIR } from '@core/constants/path.constant'
import { Logger } from '@nestjs/common'

import './dayjs.global'

import chalk from 'chalk'

// 建立目录
function mkdirs() {
  mkdirSync(DATA_DIR, { recursive: true })
  Logger.log(chalk.blue(`Data dir is make up: ${DATA_DIR}`))

  mkdirSync(LOG_DIR, { recursive: true })
  Logger.log(chalk.blue(`Log dir is make up: ${LOG_DIR}`))
}

export function register() {
  mkdirs()

  if (!globalThis.crypto)
    // @ts-expect-error
    // Compatibility with node 18
    globalThis.crypto = crypto.webcrypto
}
