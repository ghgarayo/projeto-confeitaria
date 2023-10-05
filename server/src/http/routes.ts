import { FastifyInstance } from 'fastify'

import { register } from './controllers/customer/register'
import { authenticate } from './controllers/authentication/authenticate'

export async function appRoutes(app: FastifyInstance) {
  app.post('/customers', register)
  app.post('/sessions', authenticate)
}
