import type { SubscribeToEventService } from '@src/services/subscribe-to-event'
import type { FastifyReply, FastifyRequest } from 'fastify'
import type { subscribeToEventBody } from '../@types/subscribe-to-event'

export class subscribeToEventController {
   constructor(private service: SubscribeToEventService) {}

   async handle(request: FastifyRequest, reply: FastifyReply) {
      const { name, email, referrer } = request.body as subscribeToEventBody

      const { subscriberId } = await this.service.execute({
         name,
         email,
         referrerId: referrer,
      })

      return reply.status(201).send({
         subscriberId,
      })
   }
}
