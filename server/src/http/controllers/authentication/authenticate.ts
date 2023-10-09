import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeAuthenticateService } from '@/services/factories/make-authenticate-service'
import { InvalidCredentialsError } from '@/services/errors/invalid-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // console.log(request.body)

  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(50),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateService = makeAuthenticateService(email)

    await (
      await authenticateService
    ).handle({
      email,
      password,
    })
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: error.message })
    }

    return reply.status(500).send()
  }

  // TODO: JWT token generation

  return reply.status(200).send()
}
