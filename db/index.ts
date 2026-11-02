import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from './schema.js'

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('A variável DATABASE_URL não foi configurada.')
}

const sql = neon(databaseUrl)

export const db = drizzle({ client: sql, schema })
