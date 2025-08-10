import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getSubscribersInviteCountSchema } from '../@types/get-subscriber-invite-count'
import { GetsubscribersInviteCountController } from '../controllers/get-subscribers-invite-count'
import { getSubscriberInvitesCountService } from '@src/services/get-subscriber-invites-count'
import { RedisRepository } from '@src/repositories/redis-repository'

export const GetSubscriberInvitesCount: FastifyPluginAsyncZod = async (
   server,
) => {
   const cacheRepositry = new RedisRepository()
   const service = new getSubscriberInvitesCountService(cacheRepositry)
   const controller = new GetsubscribersInviteCountController(service)

   server.get(
      '/subscribers/:subscriberId/ranking/count',
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
