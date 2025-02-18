import fastifyCors from '@fastify/cors'
import { fastify } from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { SubscribeToEvent } from './routes/subscribe-to-event'
import { env } from '../env'

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
  routePrefix: '/reference',
})

app.register(require('@scalar/fastify-api-reference'), {
  routePrefix: '/docs',
  configuration: {
    title: 'NLW Connect',
  },
})

// Register Routes
app.register(SubscribeToEvent)

// Turning On The Server
app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server Running in Port: ${env.PORT}`)
  })

export { app }
