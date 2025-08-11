import { GetSubscriberRankingPositionController } from './../controllers/get-subscriber-ranking-position'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getSubscribersRankingPosition } from '../@types/get-subscriber-ranking-position'
import { RedisRepository } from '@src/repositories/redis-repository'
import { getSubscriberRankingPositionService } from '@src/services/get-subscriber-ranking-position'

export const GetSubscriberRankingPosition: FastifyPluginAsyncZod = async (
   server,
) => {
   const cacheRepository = new RedisRepository()
   const service = new getSubscriberRankingPositionService(cacheRepository)
   const controller = new GetSubscriberRankingPositionController(service)

   server.get(
      '/subscribers/:subscriberId/ranking/position',
      {
         schema: {
            summary: 'Get subscribers invite count',
            tags: ['Referral'],
            params: getSubscribersRankingPosition.params,
            response: getSubscribersRankingPosition.response,
         },
      },
      async (request, reply) => controller.execute(request, reply),
   )
}
