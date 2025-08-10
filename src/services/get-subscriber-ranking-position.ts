import type { ICacheRepository } from '@src/repositories/cache-repository'

interface GetSubscriberRankingPositionParams {
   subscriberId: string
}

export class getSubscriberRankingPositionService {
   constructor(private cache: ICacheRepository) {}

   async execute({ subscriberId }: GetSubscriberRankingPositionParams) {
      const rank = await this.cache.rankingGetPosition(
         'referral:ranking',
         subscriberId,
      )

      if (rank === null) {
         return {
            position: null,
         }
      }

      return { position: rank + 1 }
   }
}
