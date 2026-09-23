import { Trophy } from 'lucide-react'
import type { LinhaRanking } from '../server/ranking.functions'
import { MODO_POR_ID, type ModoId } from '../game/engine'
import { TEMA_POR_ID, type TemaId } from '../data/questions'

function rotuloModo(linha: LinhaRanking) {
  const modo = MODO_POR_ID[linha.modo as ModoId]
  const tema = linha.tema ? TEMA_POR_ID[linha.tema as TemaId] : undefined
  if (tema) return `Tema · ${tema.nome}`
  return modo ? modo.nome : linha.modo
}

export function ListaRanking({
  linhas,
  destaqueId,
  compacta = false,
}: {
  linhas: LinhaRanking[]
  destaqueId?: number | null
  compacta?: boolean
}) {
  if (linhas.length === 0) {
    return (
      <div className="flex flex-col items-start gap-2 border border-dashed border-tinta-fraca/50 px-5 py-6">
        <Trophy className="size-5 text-tinta-fraca" aria-hidden="true" />
        <p className="fonte-display text-lg">Nenhuma partida registrada ainda.</p>
        <p className="max-w-sm text-sm text-tinta-media">
          Termine uma rodada e assine o resultado com seu apelido para abrir a lista.
        </p>
      </div>
    )
  }

  return (
    <ol className="divide-y divide-tinta/10">
      {linhas.map((linha, indice) => {
        const destacada = destaqueId === linha.id
        return (
          <li
            key={linha.id}
            className={`grid grid-cols-[2.2rem_1fr_auto] items-center gap-3 py-3 ${
              destacada ? 'bg-vermelho-fundo/70 px-2' : ''
            }`}
          >
            <span
              className={`fonte-mono text-sm ${indice === 0 ? 'text-vermelho' : 'text-tinta-fraca'}`}
            >
              {String(indice + 1).padStart(2, '0')}
            </span>
            <span className="min-w-0">
              <span className="block truncate fonte-display text-lg leading-tight">
                {linha.apelido}
              </span>
              {!compacta && (
                <span className="fonte-mono text-[0.68rem] uppercase tracking-[0.14em] text-tinta-fraca">
                  {rotuloModo(linha)} · {linha.acertos}/{linha.total} acertos · sequência{' '}
                  {linha.melhorSequencia}
                </span>
              )}
            </span>
            <span className="fonte-mono text-right text-base tabular-nums">
              {linha.pontos.toLocaleString('pt-BR')}
            </span>
          </li>
        )
      })}
    </ol>
  )
}
