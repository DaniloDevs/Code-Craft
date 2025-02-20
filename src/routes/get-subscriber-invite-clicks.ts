import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getSubscriberInviteClicks } from '../functions/get-subscriber-invite-clicks'

export const GetSubscriberInviteClicks: FastifyPluginAsyncZod =
  async server => {
    server.get(
      '/subscribers/:subscriberId/ranking/click',
      {
        schema: {
          summary: 'Get subscribers invite clicks counc',
          tags: ['Referral'],
          params: z.object({
            subscriberId: z.string(),
          }),
          200: z.object({
            count: z.number(),
          }),
        },
      },
      async (request, reply) => {
        const { subscriberId } = request.params

        const { count } = await getSubscriberInviteClicks({ subscriberId })

        return reply.status(200).send({ count })
      }
    )
  }
