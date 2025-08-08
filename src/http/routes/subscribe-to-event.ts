import { PrismaSubscriptionpRepository } from '@src/repositories/prisma-repository'
import { RedisRepository } from '@src/repositories/redis-repository'
import { SubscribeToEventService } from '@src/services/subscribe-to-event'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const SubscribeToEvent: FastifyPluginAsyncZod = async (server) => {
   server.post(
      '/subscriptions',
      {
         schema: {
            summary: 'Subscribes someone to the event',
            tags: ['Subscription'],
            description:
               'Route that adds someone to an event by name and email',
            body: z.object({
               name: z.string(),
               email: z.string().email(),
               referrer: z.string().nullish(),
            }),
            response: {
               201: z.object({
                  subscriberId: z.string(),
               }),
            },
         },
      },
      async (request, reply) => {
         const { name, email, referrer } = request.body

         const subscribeRepository = new PrismaSubscriptionpRepository()
         const cacheRepository = new RedisRepository()
         const subscribeToEvent = new SubscribeToEventService(
            subscribeRepository,
            cacheRepository,
         )

         const { subscriberId } = await subscribeToEvent.execute({
            name,
            email,
            referrerId: referrer,
         })

         return reply.status(201).send({
            subscriberId,
         })
      },
   )
}
