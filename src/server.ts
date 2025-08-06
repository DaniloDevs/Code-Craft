import { app } from '.'
import { env } from '../env/env'

app.listen({
   port: env.PORT,
}).then(() => {
   console.log(`Server Running in Port: ${env.PORT}`)
})
