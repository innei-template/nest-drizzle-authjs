import { name } from 'package.json'

export enum RedisKeys {
  JWTStore = 'jwt_store',
  /** HTTP 请求缓存 */
  HTTPCache = 'http_cache',

  ConfigCache = 'config_cache',

  /** 最大在线人数 */
  MaxOnlineCount = 'max_online_count',

  // Article count
  //
  Read = 'read',
  Like = 'like',
}
export const API_CACHE_PREFIX = `${name}#api:`

export enum CacheKeys {}
