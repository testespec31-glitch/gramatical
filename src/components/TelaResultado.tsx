import { Check, Loader2, RotateCcw, Trophy } from 'lucide-react'
import {
  classificacao,
  resumoPorTema,
  type Modo,
  type Resposta,
} from '../game/engine'
import { TEMA_POR_ID, type TemaId } from '../data/questions'
import type { LinhaRanking } from '../server/ranking.functions'
import { ListaRanking } from './ListaRanking'

export type EstadoSalvamento = 'inicial' | 'enviando' | 'salvo' | 'erro'

interface Props {
  modo: Modo
  tema: TemaId | null
  respostas: Resposta[]
  pontos: number
  melhorSequencia: number
  apelido: string
  estadoSalvamento: EstadoSalvamento
  erroSalvamento: string | null
  ranking: LinhaRanking[]
  destaqueId: number | null
  onApelido: (apelido: string) => void
  onSalvar: () => void
  onJogarNovamente: () => void
  onVoltarMenu: () => void
}

export function TelaResultado({
  modo,
  tema,
  respostas,
  pontos,
  melhorSequencia,
  apelido,
  estadoSalvamento,
  erroSalvamento,
  ranking,
  destaqueId,
  onApelido,
  onSalvar,
  onJogarNovamente,
  onVoltarMenu,
}: Props) {
  const total = respostas.length
  const acertos = respostas.filter((resposta) => resposta.acertou).length
  const aproveitamento = total > 0 ? acertos / total : 0
  const { titulo, recado } = classificacao(aproveitamento)
  const porTema = resumoPorTema(respostas).sort(
    (a, b) => a.acertos / a.total - b.acertos / b.total,
  )
  const erros = respostas.filter((resposta) => !resposta.acertou).slice(0, 4)
  const tempoMedio =
    total > 0
      ? respostas.reduce((soma, resposta) => soma + resposta.segundosGastos, 0) / total
      : 0

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 pb-20 pt-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
      <section className="surgir">
        <p className="fonte-mono text-[0.7rem] uppercase tracking-[0.28em] text-vermelho">
          Prova corrigida · {tema ? TEMA_POR_ID[tema].nome : modo.nome}
        </p>
        <h1 className="fonte-display mt-3 text-5xl font-semibold leading-none sm:text-6xl">
          {pontos.toLocaleString('pt-BR')}
          <span className="fonte-mono ml-3 align-middle text-base uppercase tracking-[0.16em] text-tinta-fraca">
            pontos
          </span>
        </h1>
        <p className="fonte-display mt-4 text-2xl italic">{titulo}</p>
        <p className="mt-1 max-w-md text-tinta-media">{recado}</p>

        <dl className="mt-8 grid max-w-lg grid-cols-3 gap-px border-y border-tinta/15 bg-tinta/10">
          {[
            { valor: `${acertos}/${total}`, rotulo: 'acertos' },
            { valor: `${Math.round(aproveitamento * 100)}%`, rotulo: 'aproveitamento' },
            { valor: `${tempoMedio.toFixed(1)}s`, rotulo: 'tempo médio' },
          ].map((item) => (
            <div key={item.rotulo} className="bg-papel px-3 py-4">
              <dt className="fonte-display text-2xl leading-none">{item.valor}</dt>
              <dd className="fonte-mono mt-2 text-[0.62rem] uppercase tracking-[0.14em] text-tinta-fraca">
                {item.rotulo}
              </dd>
            </div>
          ))}
        </dl>
        <p className="fonte-mono mt-3 text-[0.68rem] uppercase tracking-[0.16em] text-tinta-fraca">
          Melhor sequência: {melhorSequencia} acerto{melhorSequencia === 1 ? '' : 's'} seguido
          {melhorSequencia === 1 ? '' : 's'}
        </p>

        <div className="mt-10">
          <h2 className="fonte-mono text-[0.7rem] uppercase tracking-[0.24em] text-tinta-fraca">
            Desempenho por tema
          </h2>
          <ul className="mt-4 flex flex-col gap-3">
            {porTema.map((linha) => {
              const proporcao = linha.acertos / linha.total
              return (
                <li key={linha.tema} className="grid grid-cols-[8.5rem_1fr_3rem] items-center gap-3">
                  <span className="truncate text-sm">{TEMA_POR_ID[linha.tema].nome}</span>
                  <span className="h-2.5 w-full bg-tinta/10">
                    <span
                      className={`block h-full origin-left ${
                        proporcao >= 0.6 ? 'bg-verde' : 'bg-vermelho'
                      }`}
                      style={{ transform: `scaleX(${Math.max(proporcao, 0.02)})` }}
                    />
                  </span>
                  <span className="fonte-mono text-right text-xs tabular-nums text-tinta-media">
                    {linha.acertos}/{linha.total}
                  </span>
                </li>
              )
            })}
          </ul>
        </div>

        {erros.length > 0 && (
          <div className="mt-10">
            <h2 className="fonte-mono text-[0.7rem] uppercase tracking-[0.24em] text-tinta-fraca">
              Para revisar
            </h2>
            <ul className="mt-4 flex flex-col gap-5">
              {erros.map((resposta) => (
                <li key={resposta.questao.id} className="border-l-2 border-vermelho pl-4">
                  <p className="fonte-display text-lg leading-snug">{resposta.questao.pergunta}</p>
                  <p className="mt-1 text-sm">
                    <span className="fonte-mono text-[0.62rem] uppercase tracking-[0.16em] text-tinta-fraca">
                      resposta
                    </span>{' '}
                    <span className="text-verde">
                      {resposta.questao.opcoes[resposta.questao.correta]}
                    </span>
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-tinta-media">
                    {resposta.questao.explicacao}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <section
        className="folha folha-margem relative surgir h-fit p-6 pl-14 sm:p-9 sm:pl-20"
        style={{ animationDelay: '0.1s' }}
      >
        {estadoSalvamento === 'salvo' ? (
          <div>
            <p className="fonte-display flex items-center gap-2 text-2xl text-verde">
              <Check className="size-6" aria-hidden="true" />
              Resultado assinado
            </p>
            <p className="mt-2 text-tinta-media">
              A partida de <strong className="font-semibold">{apelido}</strong> entrou no ranking.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="fonte-display text-2xl">Assine o resultado</h2>
            <p className="mt-2 text-tinta-media">
              Guarde esta pontuação no ranking para comparar com as próximas partidas.
            </p>
            <label
              htmlFor="apelido-final"
              className="fonte-mono mt-6 block text-[0.68rem] uppercase tracking-[0.2em] text-tinta-fraca"
            >
              Apelido
            </label>
            <input
              id="apelido-final"
              value={apelido}
              onChange={(evento) => onApelido(evento.target.value.slice(0, 24))}
              placeholder="seu apelido"
              autoComplete="off"
              className="fonte-display mt-2 w-full border-b border-tinta/30 bg-transparent pb-2 text-2xl outline-none transition-colors placeholder:text-tinta-fraca/60 focus:border-vermelho"
            />
            {erroSalvamento && (
              <p className="mt-3 text-sm text-vermelho">{erroSalvamento}</p>
            )}
            <button
              type="button"
              onClick={onSalvar}
              disabled={estadoSalvamento === 'enviando' || apelido.trim().length < 2}
              className="mt-6 flex w-full items-center justify-center gap-2 bg-vermelho px-5 py-3.5 text-papel-claro transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-tinta/25"
            >
              {estadoSalvamento === 'enviando' ? (
                <Loader2 className="size-5 animate-spin" aria-hidden="true" />
              ) : (
                <Trophy className="size-5" aria-hidden="true" />
              )}
              <span className="fonte-display text-lg">
                {estadoSalvamento === 'enviando' ? 'Registrando…' : 'Entrar no ranking'}
              </span>
            </button>
          </div>
        )}

        <div className="mt-8 border-t border-tinta/15 pt-6">
          <h3 className="fonte-mono text-[0.7rem] uppercase tracking-[0.24em] text-tinta-fraca">
            Melhores partidas
          </h3>
          <div className="mt-3">
            <ListaRanking linhas={ranking.slice(0, 8)} destaqueId={destaqueId} compacta />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onJogarNovamente}
            className="flex flex-1 items-center justify-center gap-2 bg-tinta px-5 py-3.5 text-papel-claro transition-transform duration-200 hover:-translate-y-0.5"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            <span className="fonte-display text-lg">Jogar de novo</span>
          </button>
          <button
            type="button"
            onClick={onVoltarMenu}
            className="flex flex-1 items-center justify-center border border-tinta/30 px-5 py-3.5 transition-colors hover:border-tinta"
          >
            <span className="fonte-display text-lg">Trocar o modo</span>
          </button>
        </div>
      </section>
    </div>
  )
}
