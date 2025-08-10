import { env } from '../env/env'
import type { ICacheRepository } from '@src/repositories/cache-repository'

interface AccessInviteLinkParams {
   subscriberId: string
}

export class AccesseInviteLinkService {
   constructor(private cacheRepository: ICacheRepository) {}

   async execute({ subscriberId }: AccessInviteLinkParams) {
      await this.cacheRepository.incrementValue(
         'referral:access-count',
         subscriberId,
         1,
      )

      const redirectUrl = new URL(env.WEB_URL)

      redirectUrl.searchParams.set('referrer', subscriberId)

      return { redirectUrl }
   }
}
