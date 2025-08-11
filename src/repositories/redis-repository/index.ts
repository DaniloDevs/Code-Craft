import { redis } from '@src/connection/redis-client'
import { type ICacheRepository } from './../cache-repository'

export class RedisRepository implements ICacheRepository {
   async get(key: string): Promise<string | null> {
      return await redis.get(key)
   }

   async set(key: string, value: string) {
      await redis.set(key, value)
   }

   async hashIncrement(hashKey: string, field: string, increment: number) {
      await redis.hincrby(hashKey, field, increment)
   }

   async hashSet(hashKey: string, field: string, value: string): Promise<void> {
      await redis.hset(hashKey, field, value)
   }
   async hashGet(hashKey: string, field: string): Promise<string | null> {
      return await redis.hget(hashKey, field)
   }

   async rankingIncrement(key: string, member: string, increment: number) {
      await redis.zincrby(key, increment, member)
   }
   async rankingGetTop(
      key: string,
      start: number,
      end: number,
      withScores?: boolean,
   ): Promise<string[]> {
      if (withScores) {
         return await redis.zrevrange(key, start, end, 'WITHSCORES')
      }
      return await redis.zrevrange(key, start, end)
   }
   async rankingGetScore(key: string, member: string): Promise<string | null> {
      return await redis.zscore(key, member)
   }
   async rankingGetPosition(
      key: string,
      member: string,
   ): Promise<number | null> {
      return await redis.zrevrank(key, member)
   }
}
