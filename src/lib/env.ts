import 'dotenv/config'
import { z } from 'zod'

export const envSchema = z.object({}).parse(process.env)