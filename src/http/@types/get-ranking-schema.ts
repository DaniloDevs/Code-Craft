import z from 'zod'

export const getRankingSchema = {
   response: {
      200: z.object({
         ranking: z.array(
            z.object({
               id: z.string(),
               name: z.string(),
               score: z.number(),
            }),
         ),
      }),
   },
}
