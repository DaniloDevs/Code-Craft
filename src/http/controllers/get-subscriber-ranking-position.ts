import type { FastifyReply, FastifyRequest } from 'fastify'
import type { getSubscribersInviteClicksParams } from '../@types/get-subscriber-invite-clicks'
import type { getSubscriberRankingPositionService } from '@src/services/get-subscriber-ranking-position'

export class GetSubscriberRankingPositionController {
   constructor(private service: getSubscriberRankingPositionService) {}

   async execute(request: FastifyRequest, reply: FastifyReply) {
      const { subscriberId } =
         request.params as getSubscribersInviteClicksParams

      const { position } = await this.service.execute({
         subscriberId,
      })

      return reply.status(200).send({ position })
   }
}
