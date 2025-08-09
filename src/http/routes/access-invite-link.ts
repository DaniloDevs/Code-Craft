import { RedisRepository } from '@src/repositories/redis-repository'
import { AccesseInviteLink } from '@src/services/access-invite-link'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const AccessInviteLink: FastifyPluginAsyncZod = async (server) => {
   server.get(
      '/invites/:subscriberId',
      {
         schema: {
            summary: 'Access invite link and redirects user',
            tags: ['Referral'],
            params: z.object({
               subscriberId: z.string(),
            }),
            response: {
               302: z.null(),
            },
         },
      },
      async (request, reply) => {
         const { subscriberId } = request.params

         const repository = new RedisRepository()
         const accessInviteLink = new AccesseInviteLink(repository)

         const { redirectUrl } = await accessInviteLink.execute({
            subscriberId,
         })

         return reply.redirect(redirectUrl.toString(), 302)
      },
   )
}
