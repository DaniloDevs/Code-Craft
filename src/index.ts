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
import { SetupRoutes } from './http/routes/setup-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

// Plugins
app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors)

app.register(fastifySwagger, {
   openapi: {
      info: {
         title: 'Sistema de indicação e rank',
         version: '0.0.1',
      },
   },
   transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
   routePrefix: '/docs',
})

// Register Routes
app.register(SetupRoutes)

export { app }
