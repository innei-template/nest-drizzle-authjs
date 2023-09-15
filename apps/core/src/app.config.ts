import { AxiosRequestConfig } from 'axios'
import { argv } from 'zx-cjs'

import { parseBooleanishValue } from './constants/parser.utilt'
import { isDev } from './shared/utils/environment.util'
import { machineIdSync } from './shared/utils/machine.util'
import { mergeArgv } from './utils/env.util'

export const API_VERSION = 1

console.log(argv)

export const PORT = mergeArgv('port') || 3333

export const CROSS_DOMAIN = {
  allowedOrigins: [
    'innei.in',
    'shizuri.net',
    'localhost:9528',
    'localhost:2323',
    '127.0.0.1',
    'mbp.cc',
    'local.innei.test',
    '22333322.xyz',
  ],
  allowedReferer: 'innei.in',
}

export const REDIS = {
  host: mergeArgv('redis_host') || 'localhost',
  port: mergeArgv('redis_port') || 6379,
  password: mergeArgv('redis_password') || null,
  ttl: null,
  httpCacheTTL: 5,
  max: 5,
  disableApiCache:
    (isDev || mergeArgv('disable_cache')) && mergeArgv('enable_cache_debug'),
}

export const DATABASE = {
  url: mergeArgv('database_url'),
}

export const SECURITY = {
  jwtSecret: mergeArgv('jwtSecret') || 'asjhczxiucipoiopiqm2376',
  jwtExpire: '7d',
}

export const AXIOS_CONFIG: AxiosRequestConfig = {
  timeout: 10000,
}

export const CLUSTER = {
  enable: mergeArgv('cluster') ?? false,
  workers: mergeArgv('cluster_workers'),
}

const ENCRYPT_KEY = mergeArgv('encrypt_key') || mergeArgv('mx_encrypt_key')

export const ENCRYPT = {
  key: ENCRYPT_KEY || machineIdSync(),
  enable: parseBooleanishValue(mergeArgv('encrypt_enable'))
    ? !!ENCRYPT_KEY
    : false,
  algorithm: mergeArgv('encrypt_algorithm') || 'aes-256-ecb',
}
