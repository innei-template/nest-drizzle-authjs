import { program } from 'commander'

import type { AxiosRequestConfig } from 'axios'
import { isDev } from './global/env.global'

program
  .option('-p, --port [port]', 'port to listen')
  .option('--disable_cache', 'disable cache')
  .option('--redis_host [host]', 'redis host')
  .option('--redis_port [port]', 'redis port')
  .option('--redis_password [password]', 'redis password')
  .option('--jwtSecret [secret]', 'jwt secret')

program.parse(process.argv)

const argv = program.opts()
export const PORT = argv.port || 3333
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

export const DATABASE = {
  url: mergeArgv('database_url'),
}

export const REDIS = {
  host: argv.redis_host || 'localhost',
  port: argv.redis_port || 6379,
  password: argv.redis_password || null,
  ttl: null,
  httpCacheTTL: 5,
  max: 5,
  disableApiCache:
    (isDev || argv.disable_cache) && !process.env.ENABLE_CACHE_DEBUG,
}
export const SECURITY = {
  jwtSecret: argv.jwtSecret || 'asjhczxiucipoiopiqm2376',
  jwtExpire: '7d',
}

export const AXIOS_CONFIG: AxiosRequestConfig = {
  timeout: 10000,
}

function mergeArgv(key: string) {
  const env = process.env
  const toUpperCase = (key: string) => key.toUpperCase()
  return argv[key] ?? env[toUpperCase(key)]
}
