import { registerService } from '@/services/register'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().min(2).max(50),
    cpf: z.string().length(11),
    date_of_birth: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).max(50).optional(),
    phone: z.string().length(11),
  })

  const { name, cpf, date_of_birth, email, password, phone } =
    registerBodySchema.parse(request.body)

  try {
    await registerService({
      name,
      cpf,
      date_of_birth,
      email,
      password,
      phone,
    })
  } catch (error) {
    reply.status(409).send()
  }

  return reply.status(201).send()
}
