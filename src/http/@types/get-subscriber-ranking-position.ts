import z from 'zod'

export const getSubscribersRankingPosition = {
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
   typeof getSubscribersRankingPosition.params
>
