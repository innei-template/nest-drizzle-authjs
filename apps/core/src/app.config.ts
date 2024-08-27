import { program } from 'commander'
import { parseBooleanishValue } from './constants/parser.utilt'
import { machineIdSync } from './shared/utils/machine.util'
import 'dotenv-expand/config'

import type { AxiosRequestConfig } from 'axios'
import { isDev } from './global/env.global'

export const API_VERSION = 1

program
  .option('-p, --port <port>', 'port to listen')
  .option('--disable_cache', 'disable cache')
  .option('--redis_host <host>', 'redis host')
  .option('--redis_port <port>', 'redis port')
  .option('--redis_password <password>', 'redis password')
  .option('--jwtSecret <secret>', 'jwt secret')

program.parse(process.argv)
const argv = program.opts()

export const PORT = mergeArgv('port') || 3333

export const CROSS_DOMAIN = {
  allowedOrigins: [
    'innei.in',
    'shizuri.net',
    'localhost',
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
  max: 5,
  disableApiCache:
    (isDev || argv.disable_cache) && !process.env.ENABLE_CACHE_DEBUG,
}

export const HTTP_CACHE = {
  ttl: 15, // s
  enableCDNHeader:
    parseBooleanishValue(argv.http_cache_enable_cdn_header) ?? true, // s-maxage
  enableForceCacheHeader:
    parseBooleanishValue(argv.http_cache_enable_force_cache_header) ?? false, // cache-control: max-age
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

export const AUTH = {
  github: {
    clientId: mergeArgv('github_client_id'),
    clientSecret: mergeArgv('github_client_secret'),
  },
  secret: mergeArgv('auth_secret'),
}

function mergeArgv(key: string) {
  const env = process.env
  const toUpperCase = (key: string) => key.toUpperCase()
  return argv[key] ?? env[toUpperCase(key)]
}
