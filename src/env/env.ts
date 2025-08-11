import z from 'zod'
import 'dotenv/config'

const envSchema = z.object({
   PORT: z.coerce.number().default(3333),
   DATABASE_URL: z.string(),
   REDIS_URL: z.string(),
   WEB_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
   throw new Error('Invalid varibles')
}

export const env = _env.data
