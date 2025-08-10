import z from 'zod'

export const subscribeToEventSchema = {
   body: z.object({
      name: z.string(),
      email: z.string().email(),
      referrer: z.string().nullish(),
   }),
   response: {
      201: z.object({
         subscriberId: z.string(),
      }),
   },
}

export type subscribeToEventBody = z.infer<typeof subscribeToEventSchema.body>

