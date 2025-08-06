import type { Config } from 'drizzle-kit'
import { env } from './env/env'

export default {
   schema: './src/drizzle/schemas/*',
   out: './src/drizzle/migrations/',
   dialect: 'postgresql',
   dbCredentials: {
      url: env.DATABASE_URL,
   },
} satisfies Config
