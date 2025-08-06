import z from 'zod'

const envSchema = z.object({
   PORT: z.coerce.number().default(3333),
   DATABASE_URL: z.url(),
   REDIS_URL: z.url(),
   WEB_URL: z.url(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
   throw new Error('Invalid varibles')
}

export const env = _env.data
