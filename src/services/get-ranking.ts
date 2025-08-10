import type { ICacheRepository } from '@src/repositories/cache-repository'
import type { ISubscriptionRepository } from '@src/repositories/subscription-repository'

export class GetRankingService {
   constructor(
      private cacheRepository: ICacheRepository,
      private subscriptionRepository: ISubscriptionRepository,
   ) {}

   async execute() {
      const ranking = await this.cacheRepository.rankingGetTop(
         'referral:ranking',
         0,
         2,
         true,
      )

      const subscriberIdAndScore: Record<string, number> = {}
      for (let i = 0; i < ranking.length; i += 2) {
         const subscriberId = ranking[i]
         const score = parseFloat(ranking[i + 1])
         subscriberIdAndScore[subscriberId] = score
      }

      const subscribers = await this.subscriptionRepository.findByIds(
         Object.keys(subscriberIdAndScore),
      )

      if (!subscribers) {
         //TODO Create manipulation error
         return { subscribers }
      }

      const rankingWithScore = subscribers
         .map((subscriber) => {
            return {
               id: subscriber.id,
               name: subscriber.name,
               score: subscriberIdAndScore[subscriber.id],
            }
         })
         .sort((sub1, sub2) => {
            return sub2.score - sub1.score
         })

      return { rankingWithScore }
   }
}
