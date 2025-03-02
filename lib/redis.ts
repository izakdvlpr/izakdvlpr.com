import { Redis } from 'ioredis'

import { environment } from './environment'

export const redis = new Redis(environment.REDIS_URL)
