import z from 'zod'

export const getSubscribersInviteCountSchema = {
   params: z.object({
      subscriberId: z.string(),
   }),
   response: z.object({
      200: z.object({
         count: z.number().nullable(),
      }),
   }),
}

export type getSubscribersInviteClicksParams = z.infer<
   typeof getSubscribersInviteCountSchema.params
>
