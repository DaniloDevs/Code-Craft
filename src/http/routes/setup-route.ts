import type { FastifyInstance } from 'fastify'
import { AccessInviteLink } from './access-invite-link'
import { GetRanking } from './get-ranking'
import { GetSubscriberInviteClicks } from './get-subscriber-invite-clicks'
import { GetSubscriberInvitesCount } from './get-subscriber-invites-count'
import { GetSubscriberRankingPosition } from './get-subscriber-ranking-position'
import { SubscribeToEvent } from './subscribe-to-event'

export async function SetupRoutes(app: FastifyInstance) {
   app.register(SubscribeToEvent)
   app.register(AccessInviteLink)
   app.register(GetSubscriberInviteClicks)
   app.register(GetSubscriberInvitesCount)
   app.register(GetSubscriberRankingPosition)
   app.register(GetRanking)
}
