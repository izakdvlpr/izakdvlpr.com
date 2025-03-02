import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const environment = createEnv({
  server: {
    DISCORD_ID: z.string(),
    RECIPIENT_EMAIL: z.string().email(),
    SMTP_HOST: z.string(),
    SMTP_PORT: z.coerce.number().int().positive(),
    SMTP_USERNAME: z.string(),
    SMTP_PASSWORD: z.string(),
    SMTP_SECURE: z.coerce.boolean().optional().default(false),
    REDIS_URL: z.string(),
  },
  runtimeEnv: {
    DISCORD_ID: process.env.DISCORD_ID,
    RECIPIENT_EMAIL: process.env.RECIPIENT_EMAIL,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USERNAME: process.env.SMTP_USERNAME,
    SMTP_PASSWORD: process.env.SMTP_PASSWORD,
    SMTP_SECURE: process.env.SMTP_SECURE,
    REDIS_URL: process.env.REDIS_URL,
  },
})
