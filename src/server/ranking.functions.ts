import { createServerFn } from '@tanstack/react-start'

export interface LinhaRanking {
  id: number
  apelido: string
  modo: string
  tema: string | null
  pontos: number
  acertos: number
  total: number
  melhorSequencia: number
  createdAt: string | null
}

/** O ranking é opcional para o jogo: se o banco ainda não respondeu, a tela mostra o estado vazio. */
export const buscarRanking = createServerFn({ method: 'GET' })
  .inputValidator((data: { limite?: number } | undefined) => ({
    limite: Math.min(Math.max(data?.limite ?? 10, 1), 50),
  }))
  .handler(async ({ data }): Promise<LinhaRanking[]> => {
    try {
      const { lerRanking } = await import('./ranking.server')
      const linhas = await lerRanking(data.limite)
      return linhas.map((linha) => ({
        ...linha,
        createdAt: linha.createdAt ? new Date(linha.createdAt).toISOString() : null,
      }))
    } catch (erro) {
      console.error('Não foi possível ler o ranking:', erro)
      return []
    }
  })

export const registrarPartida = createServerFn({ method: 'POST' })
  .inputValidator(
    (data: {
      apelido: string
      modo: string
      tema: string | null
      pontos: number
      acertos: number
      total: number
      melhorSequencia: number
    }) => {
      const apelido = String(data.apelido ?? '').trim().slice(0, 24)
      if (apelido.length < 2) throw new Error('Escolha um apelido com pelo menos duas letras.')
      return {
        apelido,
        modo: String(data.modo).slice(0, 24),
        tema: data.tema ? String(data.tema).slice(0, 24) : null,
        pontos: Math.max(0, Math.round(Number(data.pontos) || 0)),
        acertos: Math.max(0, Math.round(Number(data.acertos) || 0)),
        total: Math.max(0, Math.round(Number(data.total) || 0)),
        melhorSequencia: Math.max(0, Math.round(Number(data.melhorSequencia) || 0)),
      }
    },
  )
  .handler(async ({ data }) => {
    const { gravarPartida } = await import('./ranking.server')
    const registro = await gravarPartida(data)
    return { id: registro?.id ?? null }
  })
