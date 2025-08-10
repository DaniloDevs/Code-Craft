import type { GetRankingService } from '@src/services/get-ranking'
import type { FastifyReply, FastifyRequest } from 'fastify'

export class GetRankingController {
   constructor(private service: GetRankingService) {}

   async handle(request: FastifyRequest, reply: FastifyReply) {
      const { rankingWithScore } = await this.service.execute()

      return reply.status(200).send({
         ranking: rankingWithScore,
      })
   }
}
