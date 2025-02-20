import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

export const SubscribeToEvent: FastifyPluginAsyncZod = async server => {
  server.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribes someone to the event',
        tags: ['Subscription'],
        description: 'Route that adds someone to an event by name and email',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body

      const { subscriberId } = await subscribeToEvent({ name, email })

      return reply.status(201).send({
        subscriberId
      })
    }
  )
}
