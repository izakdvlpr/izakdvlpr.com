import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const environment = createEnv({
  server: {
    RECIPIENT_EMAIL: z.string().email().optional(),
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.coerce.number().int().positive().optional(),
    SMTP_USERNAME: z.string().optional(),
    SMTP_PASSWORD: z.string().optional(),
    SMTP_SECURE: z.coerce.boolean().optional().default(false),
    REDIS_URL: z.string().optional(),
  },
  runtimeEnv: {
    RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_SECURE: process.env.SMTP_SECURE,
    REDIS_URL: process.env.REDIS_URL,
  },
})
