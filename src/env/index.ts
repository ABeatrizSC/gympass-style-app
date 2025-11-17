import 'dotenv/config'
import z from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  const formattedError = _env.error.format() // 👈 Forma recomendada

  console.error('🚨 Invalid environment variables:', formattedError)
  throw new Error('Invalid environment variables')
}

export const env = _env.data