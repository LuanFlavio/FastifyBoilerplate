import { configDotenv } from 'dotenv'

configDotenv()

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  DATABASE_URL: process.env.DATABASE_URL || 'your-database-url',
  JWT_SECRET: process.env.JWT_SECRET || 'your-jwt-secret',
  NODE_ENV: process.env.NODE_ENV || 'development',
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  FASTIFY_SESSION_SECRET: process.env.FASTIFY_SESSION_SECRET || '',
}
