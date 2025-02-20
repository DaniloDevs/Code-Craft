import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getRanking } from '../functions/get-ranking'

export const GetRanking: FastifyPluginAsyncZod = async server => {
  server.get(
    '/ranking',
    {
      schema: {
        summary: 'Get ranking   ',
        tags: ['Referral'],
        200: z.object({
          ranking: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              score: z.number(),
            })
          ),
        }),
      },
    },
    async (request, reply) => {
      const { rankingWithScore } = await getRanking()

      return reply.status(200).send({
        ranking: rankingWithScore,
      })
    }
  )
}
