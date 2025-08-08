import { accessInviteLink } from '@src/services/access-invite-link'
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

         const { redirectUrl } = await accessInviteLink({ subscriberId })

         return reply.redirect(redirectUrl.toString(), 302)
      },
   )
}
