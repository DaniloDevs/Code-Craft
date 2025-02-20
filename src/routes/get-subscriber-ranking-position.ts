import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getSubscriberRankingPosition } from '../functions/get-subscriber-ranking-position'

export const GetSubscriberRankingPosition: FastifyPluginAsyncZod =
  async server => {
    server.get(
      '/subscribers/:subscriberId/ranking/position',
      {
        schema: {
          summary: 'Get subscribers invite count',
          tags: ['Referral'],
          params: z.object({
            subscriberId: z.string(),
          }),
          200: z.object({
            position: z.number().nullable(),
          }),
        },
      },
      async (request, reply) => {
        const { subscriberId } = request.params

        const { position } = await getSubscriberRankingPosition({ subscriberId })

        return reply.status(200).send({ position })
      }
    )
  }
