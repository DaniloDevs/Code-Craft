import { getSubscriberInvitesCountService } from '@src/services/get-subscriber-invites-count'
import { getSubscribersInviteCountSchema } from '../@types/get-subscriber-invite-count'
import { RedisRepository } from '@src/repositories/redis-repository'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { GetsubscribersInviteCountController } from '../controllers/get-subscribers-invite-count'

export const GetSubscriberInvitesCount: FastifyPluginAsyncZod = async (
   server,
) => {
   const cacheRepository = new RedisRepository()
   const service = new getSubscriberInvitesCountService(cacheRepository)
   const controller = new GetsubscribersInviteCountController(service)

   server.get(
      '/subscribers/:subscriberId/invites/count',
      {
         schema: {
            summary: 'Get subscribers invite count',
            tags: ['Referral'],
            params: getSubscribersInviteCountSchema.params,
            response: getSubscribersInviteCountSchema.response,
         },
      },
      async (request, reply) => controller.handle(request, reply),
   )
}
