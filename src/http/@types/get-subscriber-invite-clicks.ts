import z from 'zod'

export const getSubscribersInviteClicksSchema = {
   params: z.object({
      subscriberId: z.string(),
   }),
   response: z.object({
      200: z.object({
         count: z.number(),
      }),
   }),
}

export type getSubscribersInviteClicksParams = z.infer<
   typeof getSubscribersInviteClicksSchema.params
>
