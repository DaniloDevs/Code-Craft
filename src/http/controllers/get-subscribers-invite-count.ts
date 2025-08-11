import type { FastifyReply, FastifyRequest } from 'fastify'
import type { getSubscribersInviteClicksParams } from '../@types/get-subscriber-invite-clicks'
import type { getSubscriberInvitesCountService } from '@src/services/get-subscriber-invites-count'

export class GetsubscribersInviteCountController {
   constructor(private service: getSubscriberInvitesCountService) {}

   async handle(request: FastifyRequest, reply: FastifyReply) {
      const { subscriberId } =
         request.params as getSubscribersInviteClicksParams

      const { count } = await this.service.execute({ subscriberId })

      return reply.status(200).send({ count })
   }
}
