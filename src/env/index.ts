import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3000), // coerce tentará converter o valor para o tipo especificado
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
})

const _env = envSchema.safeParse(process.env)

// Caso as variáveis de ambiente sejam inválidas, o programa será encerrado antes mesmo de iniciar o servidor
if (!_env.success) {
  console.log('Variáveis de ambiente inválidas ⚠️', _env.error.format())
  throw new Error('Variáveis de ambiente inválidas ⚠️')
}

export const env = _env.data
