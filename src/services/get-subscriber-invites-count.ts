import type { ICacheRepository } from '@src/repositories/cache-repository'
import { redis } from '../connection/redis-client'

interface GetSubscriberInvitesCountParams {
   subscriberId: string
}

export class getSubscriberInvitesCountService {
   constructor(private cache: ICacheRepository) {}

   async execute({ subscriberId }: GetSubscriberInvitesCountParams) {
      const count = await redis.zscore('referral:ranking', subscriberId)

      return { count: count ? Number.parseInt(count) : 0 }
   }
}
