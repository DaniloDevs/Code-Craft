import type { FastifyInstance } from 'fastify'
import { AccessInviteLink } from './routes/access-invite-link'
import { SubscribeToEvent } from './routes/subscribe-to-event'
import { GetRanking } from './routes/get-ranking'
import { GetSubscriberInviteClicks } from './routes/get-subscriber-invite-clicks'
import { GetSubscriberInvitesCount } from './routes/get-subscriber-invites-count'
import { GetSubscriberRankingPosition } from './routes/get-subscriber-ranking-position'

export async function SetupRoutes(app: FastifyInstance) {
   app.register(SubscribeToEvent)
   app.register(AccessInviteLink)
   app.register(GetSubscriberInviteClicks)
   app.register(GetSubscriberInvitesCount)
   app.register(GetSubscriberRankingPosition)
   app.register(GetRanking)
}
