import z from 'zod'

export const accessInviteLinkSchema = {
   params: z.object({
      subscriberId: z.string(),
   }),
}

export type AccessInviteLinkParams = z.infer<
   typeof accessInviteLinkSchema.params
>
