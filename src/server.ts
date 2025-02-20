import fastifyCors from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from '../env'
import { AccessInviteLink } from './routes/access-invite-link'
import { GetRanking } from './routes/get-ranking'
import { GetSubscriberInviteClicks } from './routes/get-subscriber-invite-clicks'
import { GetSubscriberInvitesCount } from './routes/get-subscriber-invites-count'
import { GetSubscriberRankingPosition } from './routes/get-subscriber-ranking-position'
import { SubscribeToEvent } from './routes/subscribe-to-event'

const app = fastify().withTypeProvider<ZodTypeProvider>()

// Validadores e Compiladores
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

// Plugins
app.register(fastifyCors)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'NLW Connect',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs', 
})



// Register Routes
app.register(SubscribeToEvent)
app.register(AccessInviteLink)
app.register(GetSubscriberInviteClicks)
app.register(GetSubscriberInvitesCount)
app.register(GetSubscriberRankingPosition)
app.register(GetRanking)


// Turning On The Server
app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server Running in Port: ${env.PORT}`)
  })

export { app }
