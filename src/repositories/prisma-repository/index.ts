import type { Prisma } from '@prisma/client'
import type { ISubscriptionRepository } from '../subscription-repository'
import { prisma } from '@src/connection/prisma'

export class PrismaSubscriptionpRepository implements ISubscriptionRepository {
   async create(data: Prisma.SubscriptionCreateInput) {
      const subscription = await prisma.subscription.create({ data })

      return subscription
   }

   async findByEmail(email: string) {
      const subscriber = await prisma.subscription.findUnique({
         where: { email },
      })

      return subscriber
   }
}
