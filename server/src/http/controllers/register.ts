import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { PrismaCustomersRepository } from '@/repositories/prisma/prisma-customers-repository'
import { RegisterService } from '@/services/customer/register'

import { CustomerEmailAlreadyRegisteredError } from '@/services/errors/customer-email-already-registered-error'
import { CustomerCpfAlreadyRegisteredError } from '@/services/errors/customer-cpf-already-registered-error'

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
    /*
      Como o RegisterService depende de uma instância de um repositório, 
      neste caso o PrismaCustomersRepository, precisamos criar uma instância de 
      PrismaCustomersRepository e passar ela como parâmetro para o 
      RegisterService.

      O RegisterService não precisa saber como o PrismaCustomersRepository funciona,
      ele só precisa saber que o PrismaCustomersRepository tem um método chamado
      create que recebe um objeto com os dados do cliente e salva no banco de dados.
    */

    const prismaCustomersRepository = new PrismaCustomersRepository()
    const registerService = new RegisterService(prismaCustomersRepository)

    await registerService.handle({
      name,
      cpf,
      date_of_birth,
      email,
      password,
      phone,
    })
  } catch (error) {
    if (error instanceof CustomerEmailAlreadyRegisteredError) {
      return reply.status(409).send({ message: error.message })
    }

    if (error instanceof CustomerCpfAlreadyRegisteredError) {
      return reply.status(409).send({ message: error.message })
    }

    // TODO: to be improved
    return reply.status(500).send()
  }
  return reply.status(201).send()
}
