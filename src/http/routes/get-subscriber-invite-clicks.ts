import { GetSubscriberInviteClicksService } from '@src/services/get-subscriber-invite-clicks'
import { getSubscribersInviteClicksSchema } from '../@types/get-subscriber-invite-clicks'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { GetSubscribersInviteClickController } from '../controllers/get-subscribers-invite-clicks'
import { RedisRepository } from '@src/repositories/redis-repository'

export const GetSubscriberInviteClicks: FastifyPluginAsyncZod = async (
   server,
) => {
   const cacheRepository = new RedisRepository()
   const service = new GetSubscriberInviteClicksService(cacheRepository)
   const controller = new GetSubscribersInviteClickController(service)

   server.get(
      '/subscribers/:subscriberId/invites/clicks',
      {
         schema: {
            summary: 'Get subscribers invite clicks',
            tags: ['Referral'],
            params: getSubscribersInviteClicksSchema.params,
            response: getSubscribersInviteClicksSchema.response,
         },
      },
      async (request, reply) => controller.handle(request, reply),
   )
}
