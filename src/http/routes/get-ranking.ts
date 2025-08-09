import { PrismaSubscriptionpRepository } from '@src/repositories/prisma-repository'
import { RedisRepository } from '@src/repositories/redis-repository'
import { GetRankingService } from '@src/services/get-ranking'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const GetRanking: FastifyPluginAsyncZod = async (server) => {
   server.get(
      '/ranking',
      {
         schema: {
            summary: 'Get ranking',
            tags: ['Referral'],
            200: z.object({
               ranking: z.array(
                  z.object({
                     id: z.string(),
                     name: z.string(),
                     score: z.number(),
                  }),
               ),
            }),
         },
      },
      async (_, reply) => {
         const cacheRepository = new RedisRepository()
         const subscribeRepository = new PrismaSubscriptionpRepository()
         const getRanking = new GetRankingService(
            cacheRepository,
            subscribeRepository,
         )

         const { rankingWithScore } = await getRanking.execute()

         return reply.status(200).send({
            ranking: rankingWithScore,
         })
      },
   )
}
