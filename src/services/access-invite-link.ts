import { env } from '@src/env/env'
import { redis } from '../connection/redis-client'

interface AccessInviteLinkParams {
   subscriberId: string
}

export async function accessInviteLink({
   subscriberId,
}: AccessInviteLinkParams) {
   await redis.hincrby('referral:access-count', subscriberId, 1)

   const redirectUrl = new URL(env.WEB_URL)

   redirectUrl.searchParams.set('referrer', subscriberId)

   return { redirectUrl }
}
