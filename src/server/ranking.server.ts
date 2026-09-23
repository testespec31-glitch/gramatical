import { desc } from 'drizzle-orm'
import { db } from '../../db/index.js'
import { partidas } from '../../db/schema.js'

export interface NovaPartida {
  apelido: string
  modo: string
  tema: string | null
  pontos: number
  acertos: number
  total: number
  melhorSequencia: number
}

export async function lerRanking(limite: number) {
  return db
    .select({
      id: partidas.id,
      apelido: partidas.apelido,
      modo: partidas.modo,
      tema: partidas.tema,
      pontos: partidas.pontos,
      acertos: partidas.acertos,
      total: partidas.total,
      melhorSequencia: partidas.melhorSequencia,
      createdAt: partidas.createdAt,
    })
    .from(partidas)
    .orderBy(desc(partidas.pontos), desc(partidas.createdAt))
    .limit(limite)
}

export async function gravarPartida(dados: NovaPartida) {
  const [registro] = await db.insert(partidas).values(dados).returning({ id: partidas.id })
  return registro
}
