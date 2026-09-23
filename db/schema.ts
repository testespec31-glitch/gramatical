import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const partidas = pgTable('partidas', {
  id: serial().primaryKey(),
  apelido: text().notNull(),
  modo: text().notNull(),
  tema: text(),
  pontos: integer().notNull(),
  acertos: integer().notNull(),
  total: integer().notNull(),
  melhorSequencia: integer('melhor_sequencia').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
})
