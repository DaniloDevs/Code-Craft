import { redis } from '@src/connection/redis-client'
import { type ICacheRepository } from './../cache-repository'

export class RedisRepository implements ICacheRepository {
   async set(key: string, value: string) {
      await redis.set(key, value)
   }

   async incrementValueInRanking(
      key: string,
      increment: number,
      member: string,
   ) {
      await redis.zincrby(key, increment, member)
   }

   async incrementValue(key: string, member: string, increment: number) {
      await redis.hincrby(key, member, increment)
   }

   async getTopRanking(
      key: string,
      valueStart: string | number,
      valueEnd: string | number,
      withScores: 'WITHSCORES',
   ): Promise<string[]> {
      return await redis.zrevrange(key, valueStart, valueEnd, withScores)
   }
}
