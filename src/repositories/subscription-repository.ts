import type { Prisma, Subscription } from '@prisma/client'

export interface ISubscriptionRepository {
   findByEmail(email: string): Promise<Subscription | null>
   create(data: Prisma.SubscriptionCreateInput): Promise<Subscription>
}
