import fastify from 'fastify'
import { z } from 'zod'
import { prisma } from './lib/prisma'

export const app = fastify()

app.post('/customers', async (request, reply) => {
  console.log(request.body)

  const registerBodySchema = z.object({
    name: z.string().min(2).max(50),
    cpf: z.string().length(11),
    date_of_birth: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6).max(50),
    phone: z.string().length(11),
  })

  const { name, cpf, date_of_birth, email, password, phone } =
    registerBodySchema.parse(request.body)

  const password_hash = password

  await prisma.customer.create({
    data: {
      name,
      cpf,
      date_of_birth,
      email,
      password_hash,
      phone,
    },
  })

  return reply.status(201).send()
})
