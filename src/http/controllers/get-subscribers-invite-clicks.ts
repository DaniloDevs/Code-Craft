import type { FastifyReply, FastifyRequest } from 'fastify'
import type { getSubscribersInviteClicksParams } from '../@types/get-subscriber-invite-clicks'
import { type GetSubscriberInviteClicksService } from '@src/services/get-subscriber-invite-clicks'

export class GetSubscribersInviteClickController {
   constructor(private service: GetSubscriberInviteClicksService) {}

   async handle(request: FastifyRequest, reply: FastifyReply) {
      const { subscriberId } =
         request.params as getSubscribersInviteClicksParams

      const { count } = await this.service.excute({ subscriberId })

      return reply.status(200).send({ count })
   }
}
