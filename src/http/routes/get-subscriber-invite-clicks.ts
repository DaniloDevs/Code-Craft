import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getSubscribersInviteClicksSchema } from '../@types/get-subscriber-invite-clicks'
import { GetSubscribersInviteClickController } from '../controllers/get-subscribers-invite-clicks'
import { GetSubscriberInviteClicksService } from '@src/services/get-subscriber-invite-clicks'
import { RedisRepository } from '@src/repositories/redis-repository'

export const GetSubscriberInviteClicks: FastifyPluginAsyncZod = async (
   server,
) => {
   const cacheRepository = new RedisRepository()
   const service = new GetSubscriberInviteClicksService(cacheRepository)
   const controller = new GetSubscribersInviteClickController(service)

   server.get(
      '/subscribers/:subscriberId/ranking/click',
      {
         schema: {
            summary: 'Get subscribers invite clicks count',
            tags: ['Referral'],
            params: getSubscribersInviteClicksSchema.params,
            response: getSubscribersInviteClicksSchema.response,
         },
      },
      async (request, reply) => controller.handle(request, reply),
   )
}
