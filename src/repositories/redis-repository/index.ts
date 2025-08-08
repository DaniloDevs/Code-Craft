import { redis } from '@src/connection/redis-client'
import { type ICacheRepository } from './../cache-repository'

export class RedisRepository implements ICacheRepository {
   async set(key: string, value: string) {
      await redis.set(key, value)
   }

   async incrementValue(key: string, increment: number, member: string) {
      await redis.zincrby(key, increment, member)
   }
}
