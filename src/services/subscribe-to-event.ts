import type { ICacheRepository } from '@src/repositories/cache-repository'
import type { ISubscriptionRepository } from '@src/repositories/subscription-repository'

interface SubscribeToEventParams {
   name: string
   email: string
   referrerId?: string | null
}

export class SubscribeToEventService {
   constructor(
      private subscriberRepository: ISubscriptionRepository,
      private cacheRepository: ICacheRepository,
   ) {}

   async execute({ email, name, referrerId }: SubscribeToEventParams) {
      const existSubscribe = await this.subscriberRepository.findByEmail(email)

      if (existSubscribe) {
         return {
            subscriberId: existSubscribe.id,
         }
      }

      const newSubscribe = await this.subscriberRepository.create({
         name,
         email,
      })

      if (referrerId) {
         await this.cacheRepository.rankingIncrement(
            'referral:ranking',
            referrerId,
            1,
         )
      }

      return {
         subscriberId: newSubscribe.id,
      }
   }
}
