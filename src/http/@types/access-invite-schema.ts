import z from 'zod'

export const accessInviteLinkSchema = {
   params: z.object({
      subscriberId: z.string(),
   }),
   response: z.object({
      302: z.null(),
   }),
}

export type AccessInviteLinkParams = z.infer<
   typeof accessInviteLinkSchema.params
>
export type AccessInviteLinkResponse = z.infer<
   typeof accessInviteLinkSchema.response
>
