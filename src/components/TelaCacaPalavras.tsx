import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react'
import { ArrowRight, Check, Flame, Timer } from 'lucide-react'
import type { Modo } from '../game/engine'
import {
  BONUS_TEMPO_CACA,
  palavraSelecionada,
  pontuarPalavra,
  tracarSelecao,
  type Celula,
  type PalavraNoQuadro,
  type Quadro,
} from '../game/cacaPalavras'

export interface ResultadoCaca {
  quadro: Quadro
  encontradas: string[]
  pontos: number
  melhorSequencia: number
  segundosGastos: number
}

interface Props {
  quadro: Quadro
  modo: Modo
  onTerminar: (resultado: ResultadoCaca) => void
  onSair: () => void
}

const chave = (celula: Celula) => `${celula.linha}-${celula.coluna}`

function celulaDoPonto(x: number, y: number): Celula | null {
  const alvo = document.elementFromPoint(x, y)?.closest<HTMLElement>('[data-linha]')
  if (!alvo) return null
  return { linha: Number(alvo.dataset.linha), coluna: Number(alvo.dataset.coluna) }
}

export function TelaCacaPalavras({ quadro, modo, onTerminar, onSair }: Props) {
  const [restante, setRestante] = useState(modo.segundos)
  const restanteRef = useRef(modo.segundos)
  const [encontradas, setEncontradas] = useState<string[]>([])
  const [pontos, setPontos] = useState(0)
  const [sequencia, setSequencia] = useState(0)
  const [melhorSequencia, setMelhorSequencia] = useState(0)
  const [ultima, setUltima] = useState<{ palavra: PalavraNoQuadro; ganho: number } | null>(null)
  const [erros, setErros] = useState(0)
  const [encerrado, setEncerrado] = useState<null | 'completo' | 'tempo'>(null)
  const [bonusTempo, setBonusTempo] = useState(0)

  const [inicio, setInicio] = useState<Celula | null>(null)
  const [atual, setAtual] = useState<Celula | null>(null)
  const arrastandoRef = useRef(false)

  useEffect(() => {
    if (encerrado) return
    const prazo = Date.now() + restanteRef.current * 1000
    const intervalo = setInterval(() => {
      const falta = Math.max(0, (prazo - Date.now()) / 1000)
      restanteRef.current = falta
      setRestante(falta)
      if (falta <= 0) {
        clearInterval(intervalo)
        setEncerrado('tempo')
      }
    }, 100)
    return () => clearInterval(intervalo)
  }, [encerrado])

  const validar = useCallback(
    (selecao: Celula[]) => {
      if (encerrado || selecao.length < 2) return
      const palavra = palavraSelecionada(quadro.palavras, selecao)
      if (palavra && encontradas.includes(palavra.letras)) return
      if (!palavra) {
        setSequencia(0)
        setErros((atual) => atual + 1)
        return
      }

      const novaSequencia = sequencia + 1
      const ganho = pontuarPalavra(palavra.letras, novaSequencia)
      const novasEncontradas = [...encontradas, palavra.letras]
      setEncontradas(novasEncontradas)
      setSequencia(novaSequencia)
      setMelhorSequencia((atual) => Math.max(atual, novaSequencia))
      setUltima({ palavra, ganho })

      // Quadro completo: o tempo que sobrou vira bônus.
      const completo = novasEncontradas.length === quadro.palavras.length
      const bonus = completo ? Math.round(restanteRef.current * BONUS_TEMPO_CACA) : 0
      setPontos((atual) => atual + ganho + bonus)
      if (completo) {
        setBonusTempo(bonus)
        setEncerrado('completo')
      }
    },
    [encerrado, encontradas, quadro.palavras, sequencia],
  )

  // Funciona arrastando sobre as letras ou tocando na primeira e depois na última.
  const tocar = useCallback(
    (celula: Celula) => {
      if (inicio) {
        validar(tracarSelecao(inicio, celula))
        setInicio(null)
        setAtual(null)
        return
      }
      setInicio(celula)
      setAtual(celula)
    },
    [inicio, validar],
  )

  function aoPressionar(evento: PointerEvent) {
    if (encerrado) return
    const celula = celulaDoPonto(evento.clientX, evento.clientY)
    if (!celula) return
    evento.preventDefault()
    if (inicio) {
      tocar(celula)
      return
    }
    arrastandoRef.current = true
    setInicio(celula)
    setAtual(celula)
  }

  function aoMover(evento: PointerEvent) {
    if (!arrastandoRef.current) return
    const celula = celulaDoPonto(evento.clientX, evento.clientY)
    if (celula && (celula.linha !== atual?.linha || celula.coluna !== atual?.coluna)) setAtual(celula)
  }

  function aoSoltar() {
    if (!arrastandoRef.current) return
    arrastandoRef.current = false
    if (inicio && atual && chave(inicio) !== chave(atual)) {
      validar(tracarSelecao(inicio, atual))
      setInicio(null)
      setAtual(null)
    }
    // Se soltou na mesma letra, ela fica marcada como início da seleção por toque.
  }

  const selecao = new Set(
    inicio && atual ? tracarSelecao(inicio, atual).map(chave) : inicio ? [chave(inicio)] : [],
  )
  const achadas = new Set(
    quadro.palavras
      .filter((palavra) => encontradas.includes(palavra.letras))
      .flatMap((palavra) => palavra.celulas.map(chave)),
  )
  const perdidas = new Set(
    encerrado
      ? quadro.palavras
          .filter((palavra) => !encontradas.includes(palavra.letras))
          .flatMap((palavra) => palavra.celulas.map(chave))
      : [],
  )

  const fracaoTempo = Math.max(0, Math.min(1, restante / modo.segundos))
  const minutos = Math.floor(Math.ceil(restante) / 60)
  const segundos = String(Math.ceil(restante) % 60).padStart(2, '0')

  function terminar() {
    onTerminar({
      quadro,
      encontradas,
      pontos,
      melhorSequencia,
      segundosGastos: Math.round(modo.segundos - restanteRef.current),
    })
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-4 sm:px-8">
      <div className="fonte-mono flex flex-wrap items-center justify-between gap-3 text-[0.68rem] uppercase tracking-[0.16em] text-tinta-media">
        <span>
          {modo.nome} · {quadro.conjunto.nome}
        </span>
        <span className="flex items-center gap-4">
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
              fracaoTempo < 0.2 ? 'bg-vermelho' : 'bg-azul/70'
            }`}
            style={{ transform: `scaleX(${fracaoTempo})` }}
          />
        </div>

        <div className="grid gap-8 p-5 sm:p-9 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <div>
            <div className="flex items-center justify-between gap-4">
              <h2 className="fonte-display text-2xl leading-tight">Ache os termos no quadro</h2>
              <span
                className={`fonte-mono flex items-center gap-1.5 text-sm tabular-nums ${
                  fracaoTempo < 0.2 && !encerrado ? 'tempo-critico text-vermelho' : 'text-tinta-media'
                }`}
              >
                <Timer className="size-4" aria-hidden="true" />
                {encerrado ? '—' : `${minutos}:${segundos}`}
              </span>
            </div>
            <p className="mt-1 text-sm text-tinta-media">
              Arraste da primeira à última letra — ou toque nas duas. As palavras correm na
              horizontal, na vertical e na diagonal, sem acentos.
            </p>

            <div
              key={erros}
              role="grid"
              aria-label="Quadro de letras"
              onPointerDown={aoPressionar}
              onPointerMove={aoMover}
              onPointerUp={aoSoltar}
              onPointerCancel={aoSoltar}
              onPointerLeave={aoSoltar}
              className={`mt-5 grid aspect-square w-full max-w-[34rem] touch-none select-none border border-tinta/25 bg-papel-claro ${
                erros > 0 ? 'tremer' : ''
              }`}
              style={{ gridTemplateColumns: `repeat(${quadro.letras.length}, minmax(0, 1fr))` }}
            >
              {quadro.letras.map((linha, l) =>
                linha.map((letra, c) => {
                  const id = `${l}-${c}`
                  let visual = 'text-tinta hover:bg-tinta/5'
                  if (selecao.has(id)) visual = 'bg-vermelho text-papel-claro'
                  else if (achadas.has(id)) visual = 'bg-verde-fundo text-verde'
                  else if (perdidas.has(id)) visual = 'bg-vermelho-fundo text-vermelho'
                  return (
                    <button
                      key={id}
                      type="button"
                      role="gridcell"
                      data-linha={l}
                      data-coluna={c}
                      disabled={encerrado !== null}
                      aria-label={`${letra}, linha ${l + 1}, coluna ${c + 1}`}
                      onKeyDown={(evento) => {
                        if (evento.key === 'Enter' || evento.key === ' ') {
                          evento.preventDefault()
                          tocar({ linha: l, coluna: c })
                        }
                      }}
                      className={`fonte-mono flex items-center justify-center border-r border-b border-tinta/8 text-sm font-medium transition-colors duration-150 disabled:cursor-default sm:text-lg ${visual}`}
                    >
                      {letra}
                    </button>
                  )
                }),
              )}
            </div>
          </div>

          <aside>
            <h3 className="fonte-mono text-[0.68rem] uppercase tracking-[0.2em] text-tinta-fraca">
              {encontradas.length} de {quadro.palavras.length} encontradas
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 lg:grid-cols-1">
              {quadro.palavras.map((palavra) => {
                const achou = encontradas.includes(palavra.letras)
                return (
                  <li
                    key={palavra.letras}
                    className={`fonte-display flex items-center gap-2 text-lg leading-tight ${
                      achou ? 'text-verde' : encerrado ? 'text-vermelho' : ''
                    }`}
                  >
                    {achou ? (
                      <Check className="size-4 shrink-0" aria-hidden="true" />
                    ) : (
                      <span aria-hidden="true" className="w-4 shrink-0 text-center text-tinta-fraca">
                        ·
                      </span>
                    )}
                    <span className={achou ? 'line-through decoration-verde/50' : ''}>
                      {palavra.palavra}
                    </span>
                  </li>
                )
              })}
            </ul>

            {ultima && (
              <div key={ultima.palavra.letras} className="surgir mt-6" aria-live="polite">
                <div className="flex items-start justify-between gap-3">
                  <p className="fonte-display text-xl text-verde">{ultima.palavra.palavra}</p>
                  <span className="carimbo fonte-mono shrink-0 border-2 border-verde px-2 py-1 text-sm text-verde">
                    +{ultima.ganho}
                  </span>
                </div>
                <div className="mt-2 border-l-2 border-vermelho bg-papel/70 py-2 pl-4">
                  <p className="fonte-mono text-[0.65rem] uppercase tracking-[0.2em] text-vermelho">
                    A definição
                  </p>
                  <p className="mt-1.5 leading-relaxed text-tinta-media">{ultima.palavra.definicao}</p>
                </div>
              </div>
            )}

            {encerrado && (
              <div className="surgir mt-6" aria-live="polite">
                <p
                  className={`fonte-display text-xl ${
                    encerrado === 'completo' ? 'text-verde' : 'text-vermelho'
                  }`}
                >
                  {encerrado === 'completo' ? 'Quadro completo.' : 'O tempo acabou.'}
                </p>
                {bonusTempo > 0 && (
                  <p className="mt-1 text-sm text-tinta-media">
                    +{bonusTempo} pontos pelo tempo que sobrou.
                  </p>
                )}
                <button
                  type="button"
                  onClick={terminar}
                  autoFocus
                  className="mt-4 flex w-full items-center justify-between gap-3 bg-tinta px-5 py-3.5 text-papel-claro transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <span className="fonte-display text-lg">Ver o resultado</span>
                  <ArrowRight className="size-5" aria-hidden="true" />
                </button>
              </div>
            )}
          </aside>
        </div>
      </article>

      <button
        type="button"
        onClick={() => (encontradas.length > 0 ? terminar() : onSair())}
        className="fonte-mono mx-auto mt-5 block text-[0.65rem] uppercase tracking-[0.18em] text-tinta-fraca underline decoration-dotted underline-offset-4 transition-colors hover:text-vermelho"
      >
        Encerrar a partida
      </button>
    </div>
  )
}
