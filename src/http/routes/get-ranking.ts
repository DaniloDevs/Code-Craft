import { getRankingSchema } from '../@types/get-ranking-schema'
import { PrismaSubscriptionpRepository } from '@src/repositories/prisma-repository'
import { RedisRepository } from '@src/repositories/redis-repository'
import { GetRankingService } from '@src/services/get-ranking'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { GetRankingController } from '../controllers/get-ranking'

export const GetRanking: FastifyPluginAsyncZod = async (server) => {
   const cacheRepository = new RedisRepository()
   const subscribeRepository = new PrismaSubscriptionpRepository()
   const service = new GetRankingService(cacheRepository, subscribeRepository)
   const getRankingController = new GetRankingController(service)

   server.get(
      '/ranking',
      {
         schema: {
            summary: 'Get ranking',
            tags: ['Referral'],
            response: getRankingSchema.response,
         },
      },
      async (_, reply) => getRankingController.handle(_, reply),
   )
}
