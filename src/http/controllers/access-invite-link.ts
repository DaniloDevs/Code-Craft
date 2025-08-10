import type { FastifyReply, FastifyRequest } from 'fastify'
import { type AccesseInviteLinkService } from '@src/services/access-invite-link'
import type { AccessInviteLinkParams } from '../@types/access-invite-schema'

export class AccessInviteLinkController {
   constructor(private service: AccesseInviteLinkService) {}

   async handle(request: FastifyRequest, reply: FastifyReply) {
      const { subscriberId } = request.params as AccessInviteLinkParams

      const { redirectUrl } = await this.service.execute({
         subscriberId,
      })

      return reply.redirect(redirectUrl.toString(), 302)
   }
}
