import { argv } from 'zx-cjs'

import { parseBooleanishValue } from './constants/parser.utilt'
import { machineIdSync } from './shared/utils/machine.util'
import { mergeArgv } from './utils/env.util'
import type { AxiosRequestConfig } from 'axios'

export const API_VERSION = 1

console.info(argv)

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
