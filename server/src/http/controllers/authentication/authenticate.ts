import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { AuthenticateService } from '@/services/authentication/authenticate'

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
    /*
      Como o AuthenticateService depende de uma instância de um repositório, 
      neste caso o PrismaCustomersRepository, precisamos criar uma instância de 
      PrismaCustomersRepository e passar ela como parâmetro para o 
      AuthenticateService.

      O AuthenticateService não precisa saber como o PrismaCustomersRepository funciona,
      ele só precisa saber que o PrismaCustomersRepository tem um método que buscara
      um cliente no banco de dados para validações.
    */

    const prismaCustomersRepository = new PrismaCustomersRepository()
    const authenticateService = new AuthenticateService(
      prismaCustomersRepository,
    )

    await authenticateService.handle({
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
