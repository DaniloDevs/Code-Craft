import { RedisRepository } from '@src/repositories/redis-repository'
import { accessInviteLinkSchema } from '@src/http/@types/access-invite-schema'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { AccesseInviteLinkService } from '@src/services/access-invite-link'
import { AccessInviteLinkController } from '../controllers/access-invite-link'

export const AccessInviteLink: FastifyPluginAsyncZod = async (server) => {
   const repository = new RedisRepository()
   const service = new AccesseInviteLinkService(repository)
   const accessInviteController = new AccessInviteLinkController(service)

   server.get(
      '/invites/:subscriberId',
      {
         schema: {
            summary: 'Access invite link and redirects user',
            tags: ['Referral'],
            params: accessInviteLinkSchema.params,
            response: accessInviteLinkSchema.response,
         },
      },
      async (request, reply) => accessInviteController.handle(request, reply),
   )
}
