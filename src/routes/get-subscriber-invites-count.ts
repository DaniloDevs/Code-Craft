import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { getSubscriberInviteClicks } from '../functions/get-subscriber-invite-clicks'
import { getSubscriberInvitesCount } from '../functions/get-subscriber-invites-count'

export const GetSubscriberInvitesCount: FastifyPluginAsyncZod =
  async server => {
    server.get(
      '/subscribers/:subscriberId/ranking/count',
      {
        schema: {
          summary: 'Get subscribers invite count',
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

        const { count } = await getSubscriberInvitesCount({ subscriberId })

        return reply.status(200).send({ count })
      }
    )
  }
