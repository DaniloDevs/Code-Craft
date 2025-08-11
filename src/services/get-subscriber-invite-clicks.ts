import type { ICacheRepository } from '@src/repositories/cache-repository'

interface GetSubscriberInviteClicksParams {
   subscriberId: string
}

export class GetSubscriberInviteClicksService {
   constructor(private cache: ICacheRepository) {}

   async excute({ subscriberId }: GetSubscriberInviteClicksParams) {
      const count = await this.cache.hashGet(
         'referral:access-count',
         subscriberId,
      )

      return { count: count ? Number.parseInt(count) : 0 }
   }
}
