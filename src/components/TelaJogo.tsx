import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight, Check, Flame, Timer, X } from 'lucide-react'
import type { Modo, QuestaoEmbaralhada } from '../game/engine'
import { TEMA_POR_ID } from '../data/questions'

interface Props {
  questao: QuestaoEmbaralhada
  numero: number
  total: number | null
  modo: Modo
  pontos: number
  sequencia: number
  vidas: number | null
  ultima: boolean
  onResponder: (escolha: number | null, segundosRestantes: number) => number
  onAvancar: () => void
  onDesistir: () => void
}

export function TelaJogo({
  questao,
  numero,
  total,
  modo,
  pontos,
  sequencia,
  vidas,
  ultima,
  onResponder,
  onAvancar,
  onDesistir,
}: Props) {
  const [restante, setRestante] = useState(modo.segundos)
  const [escolha, setEscolha] = useState<number | null>(null)
  const [respondido, setRespondido] = useState(false)
  const [ganho, setGanho] = useState(0)
  const restanteRef = useRef(modo.segundos)
  const tema = TEMA_POR_ID[questao.tema]

  const respondidoRef = useRef(false)

  const responder = useCallback(
    (valor: number | null) => {
      if (respondidoRef.current) return
      respondidoRef.current = true
      setEscolha(valor)
      setRespondido(true)
      setGanho(onResponder(valor, restanteRef.current))
    },
    [onResponder],
  )

  const responderRef = useRef(responder)
  responderRef.current = responder

  useEffect(() => {
    if (respondido) return
    const prazo = Date.now() + modo.segundos * 1000
    const intervalo = setInterval(() => {
      const falta = Math.max(0, (prazo - Date.now()) / 1000)
      restanteRef.current = falta
      setRestante(falta)
      if (falta <= 0) {
        clearInterval(intervalo)
        responderRef.current(null)
      }
    }, 100)
    return () => clearInterval(intervalo)
  }, [respondido, modo.segundos])

  useEffect(() => {
    function aoTeclar(evento: KeyboardEvent) {
      if (respondido) return
      const posicao = Number(evento.key) - 1
      if (Number.isInteger(posicao) && posicao >= 0 && posicao < questao.ordem.length) {
        responder(questao.ordem[posicao])
      }
    }
    window.addEventListener('keydown', aoTeclar)
    return () => window.removeEventListener('keydown', aoTeclar)
  }, [respondido, questao, responder])

  const acertou = respondido && escolha === questao.correta
  const estourouTempo = respondido && escolha === null
  const fracaoTempo = Math.max(0, Math.min(1, restante / modo.segundos))
  const segundosVisiveis = Math.ceil(restante)
  const vidasRestantes: number | null = vidas

  return (
    <div className="mx-auto w-full max-w-3xl px-5 pb-20 pt-4 sm:px-8">
      <div className="fonte-mono flex flex-wrap items-center justify-between gap-3 text-[0.68rem] uppercase tracking-[0.16em] text-tinta-media">
        <span>
          {modo.nome} · questão {String(numero).padStart(2, '0')}
          {total ? ` / ${String(total).padStart(2, '0')}` : ''}
        </span>
        <span className="flex items-center gap-4">
          {vidasRestantes !== null && (
            <span className="flex items-center gap-1" title={`${vidasRestantes} vidas restantes`}>
              {Array.from({ length: modo.vidas ?? 0 }).map((_, indice) => (
                <span
                  key={indice}
                  aria-hidden="true"
                  className={`fonte-display text-xl leading-none ${
                    indice < vidasRestantes ? 'text-vermelho' : 'text-tinta-fraca/40 line-through'
                  }`}
                >
                  ,
                </span>
              ))}
              <span className="sr-only">{vidasRestantes} vidas restantes</span>
            </span>
          )}
          {sequencia > 1 && (
            <span className="flex items-center gap-1 text-ocre">
              <Flame className="size-3.5" aria-hidden="true" />
              {sequencia} seguidas
            </span>
          )}
          <span className="tabular-nums text-tinta">{pontos.toLocaleString('pt-BR')} pts</span>
        </span>
      </div>

      <article className="folha relative mt-3 overflow-hidden">
        <div className="h-1.5 w-full bg-tinta/10">
          <div
            className={`h-full origin-left transition-transform duration-100 ease-linear ${
              fracaoTempo < 0.3 ? 'bg-vermelho' : 'bg-azul/70'
            }`}
            style={{ transform: `scaleX(${fracaoTempo})` }}
          />
        </div>

        <div className="p-6 sm:p-9">
          <div className="flex items-center justify-between gap-4">
            <span className="fonte-mono flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-tinta-media">
              <span className="bg-tinta px-1.5 py-1 text-papel-claro">{tema.sigla}</span>
              {tema.nome}
              <span className="text-tinta-fraca" aria-label={`nível ${questao.nivel} de 3`}>
                {'•'.repeat(questao.nivel)}
              </span>
            </span>
            <span
              className={`fonte-mono flex items-center gap-1.5 text-sm tabular-nums ${
                fracaoTempo < 0.3 && !respondido ? 'tempo-critico text-vermelho' : 'text-tinta-media'
              }`}
            >
              <Timer className="size-4" aria-hidden="true" />
              {respondido ? '—' : `${segundosVisiveis}s`}
            </span>
          </div>

          <h2
            key={questao.id}
            className="fonte-display surgir mt-6 text-2xl leading-snug sm:text-[1.75rem]"
          >
            {questao.pergunta}
          </h2>

          <div className="mt-7 flex flex-col gap-2.5">
            {questao.ordem.map((indiceOriginal, posicao) => {
              const correta = indiceOriginal === questao.correta
              const escolhida = escolha === indiceOriginal
              let visual = 'border-tinta/20 hover:translate-x-1 hover:border-tinta hover:bg-papel'
              if (respondido && correta) visual = 'border-verde bg-verde-fundo'
              else if (respondido && escolhida) visual = 'border-vermelho bg-vermelho-fundo'
              else if (respondido) visual = 'border-tinta/10 opacity-45'

              return (
                <button
                  key={indiceOriginal}
                  type="button"
                  disabled={respondido}
                  onClick={() => responder(indiceOriginal)}
                  className={`flex items-center gap-4 border px-4 py-3.5 text-left transition-all duration-200 disabled:cursor-default ${visual} ${
                    respondido && escolhida && !correta ? 'tremer' : ''
                  }`}
                >
                  <span className="fonte-mono flex size-7 shrink-0 items-center justify-center rounded-full border border-current text-xs text-tinta-media">
                    {posicao + 1}
                  </span>
                  <span
                    className={`fonte-display text-lg ${
                      respondido && escolhida && !correta ? 'rabisco-vermelho' : ''
                    }`}
                  >
                    {questao.opcoes[indiceOriginal]}
                  </span>
                  {respondido && correta && (
                    <Check className="ml-auto size-5 shrink-0 text-verde" aria-hidden="true" />
                  )}
                  {respondido && escolhida && !correta && (
                    <X className="ml-auto size-5 shrink-0 text-vermelho" aria-hidden="true" />
                  )}
                </button>
              )
            })}
          </div>

          {respondido && (
            <div className="surgir mt-7" aria-live="polite">
              <div className="flex items-start justify-between gap-4">
                <p
                  className={`fonte-display text-xl ${acertou ? 'text-verde' : 'text-vermelho'}`}
                >
                  {acertou ? 'Certíssimo.' : estourouTempo ? 'O tempo acabou.' : 'Passou batido.'}
                </p>
                {acertou && (
                  <span className="carimbo fonte-mono shrink-0 border-2 border-verde px-2 py-1 text-sm text-verde">
                    +{ganho}
                  </span>
                )}
              </div>
              <div className="mt-3 border-l-2 border-vermelho bg-papel/70 py-2 pl-4">
                <p className="fonte-mono text-[0.65rem] uppercase tracking-[0.2em] text-vermelho">
                  A regra
                </p>
                <p className="mt-1.5 leading-relaxed text-tinta-media">{questao.explicacao}</p>
              </div>

              <button
                type="button"
                onClick={onAvancar}
                autoFocus
                className="mt-6 flex w-full items-center justify-between gap-3 bg-tinta px-5 py-3.5 text-papel-claro transition-transform duration-200 hover:-translate-y-0.5"
              >
                <span className="fonte-display text-lg">
                  {ultima ? 'Ver o resultado' : 'Próxima questão'}
                </span>
                <ArrowRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </article>

      <button
        type="button"
        onClick={onDesistir}
        className="fonte-mono mx-auto mt-5 block text-[0.65rem] uppercase tracking-[0.18em] text-tinta-fraca underline decoration-dotted underline-offset-4 transition-colors hover:text-vermelho"
      >
        Encerrar a partida
      </button>
    </div>
  )
}
