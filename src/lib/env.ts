import 'dotenv/config'
import { z } from 'zod'

export const env = z.object({
  OPENAI_API_KEY: z.string(),  
  CORS_ORIGIN: z.string().url(),
}).parse(process.env)