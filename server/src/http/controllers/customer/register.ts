import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeRegisterService } from '@/services/factories/make-register-service'

import { EmailAlreadyRegisteredError } from '@/services/errors/email-already-registered-error'
import { CpfAlreadyRegisteredError } from '@/services/errors/cpf-already-registered-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  // console.log(request.body)

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
    const registerService = makeRegisterService()

    await registerService.handle({
      name,
      cpf,
      date_of_birth,
      email,
      password,
      phone,
    })
  } catch (error) {
    if (error instanceof EmailAlreadyRegisteredError) {
      return reply.status(409).send({ message: error.message })
    }

    if (error instanceof CpfAlreadyRegisteredError) {
      return reply.status(409).send({ message: error.message })
    }

    // TODO: to be improved
    return reply.status(500).send()
  }
  return reply.status(201).send()
}
