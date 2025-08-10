import z from 'zod'

export const getSubscribersInviteClicksSchema = {
   params: z.object({
      subscriberId: z.string(),
   }),
   response: {
      200: z.object({
         count: z.number().nullable(),
      }),
   },
}

export type getSubscribersInviteClicksParams = z.infer<
   typeof getSubscribersInviteClicksSchema.params
>
