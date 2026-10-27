import { useCallback, useEffect, useState } from 'react'
import {
  MODO_POR_ID,
  montarRodada,
  pontuar,
  type ModoId,
  type QuestaoEmbaralhada,
  type Resposta,
} from '../game/engine'
import type { TemaId } from '../data/questions'
import { montarQuadro, type Quadro } from '../game/cacaPalavras'
import {
  buscarRanking,
  registrarPartida,
  type LinhaRanking,
} from '../server/ranking.functions'
import { TelaCacaPalavras, type ResultadoCaca } from './TelaCacaPalavras'
import { TelaInicial } from './TelaInicial'
import { TelaJogo } from './TelaJogo'
import { TelaResultado, type EstadoSalvamento } from './TelaResultado'

const CHAVE_APELIDO = 'virgula:apelido'

type Fase = 'inicio' | 'jogando' | 'fim'

export function Jogo({ rankingInicial }: { rankingInicial: LinhaRanking[] }) {
  const [fase, setFase] = useState<Fase>('inicio')
  const [modo, setModo] = useState<ModoId>('rapido')
  const [tema, setTema] = useState<TemaId>('crase')
  const [apelido, setApelido] = useState('')

  const [rodada, setRodada] = useState<QuestaoEmbaralhada[]>([])
  const [indice, setIndice] = useState(0)
  const [respostas, setRespostas] = useState<Resposta[]>([])
  const [pontos, setPontos] = useState(0)
  const [sequencia, setSequencia] = useState(0)
  const [melhorSequencia, setMelhorSequencia] = useState(0)
  const [vidas, setVidas] = useState<number | null>(null)
  const [quadro, setQuadro] = useState<Quadro | null>(null)
  const [resultadoCaca, setResultadoCaca] = useState<ResultadoCaca | null>(null)

  const [ranking, setRanking] = useState<LinhaRanking[]>(rankingInicial)
  const [destaqueId, setDestaqueId] = useState<number | null>(null)
  const [estadoSalvamento, setEstadoSalvamento] = useState<EstadoSalvamento>('inicial')
  const [erroSalvamento, setErroSalvamento] = useState<string | null>(null)

  // O apelido só é lido depois da hidratação para não divergir do HTML do servidor.
  useEffect(() => {
    const guardado = window.localStorage.getItem(CHAVE_APELIDO)
    if (guardado) setApelido(guardado)
  }, [])

  const guardarApelido = useCallback((valor: string) => {
    setApelido(valor)
    window.localStorage.setItem(CHAVE_APELIDO, valor)
  }, [])

  const config = MODO_POR_ID[modo]

  const comecar = useCallback(() => {
    setDestaqueId(null)
    setEstadoSalvamento('inicial')
    setErroSalvamento(null)
    if (modo === 'caca') {
      setQuadro(montarQuadro())
      setResultadoCaca(null)
      setRespostas([])
      setFase('jogando')
      return
    }
    setQuadro(null)
    setResultadoCaca(null)
    const novaRodada = montarRodada(modo, modo === 'tema' ? tema : null)
    if (novaRodada.length === 0) return
    setRodada(novaRodada)
    setIndice(0)
    setRespostas([])
    setPontos(0)
    setSequencia(0)
    setMelhorSequencia(0)
    setVidas(MODO_POR_ID[modo].vidas)
    setFase('jogando')
  }, [modo, tema])

  const responder = useCallback(
    (escolha: number | null, segundosRestantes: number) => {
      const questao = rodada[indice]
      if (!questao) return 0
      const acertou = escolha === questao.correta
      const novaSequencia = acertou ? sequencia + 1 : 0
      const ganho = acertou
        ? pontuar({
            nivel: questao.nivel,
            segundosRestantes,
            segundosTotais: config.segundos,
            sequencia: novaSequencia,
          })
        : 0

      setPontos((atual) => atual + ganho)
      setSequencia(novaSequencia)
      setMelhorSequencia((atual) => Math.max(atual, novaSequencia))
      if (!acertou && config.vidas !== null) {
        setVidas((atual) => (atual === null ? null : Math.max(0, atual - 1)))
      }
      setRespostas((atuais) => [
        ...atuais,
        {
          questao,
          escolha,
          acertou,
          pontos: ganho,
          segundosGastos: Math.min(config.segundos, config.segundos - segundosRestantes),
        },
      ])
      return ganho
    },
    [config.segundos, config.vidas, indice, rodada, sequencia],
  )

  const avancar = useCallback(() => {
    const semVidas = vidas !== null && vidas <= 0
    if (semVidas || indice + 1 >= rodada.length) {
      setFase('fim')
      return
    }
    setIndice((atual) => atual + 1)
  }, [indice, rodada.length, vidas])

  const salvar = useCallback(async () => {
    const nome = apelido.trim()
    if (nome.length < 2) {
      setEstadoSalvamento('erro')
      setErroSalvamento('Escolha um apelido com pelo menos duas letras.')
      return
    }
    setEstadoSalvamento('enviando')
    setErroSalvamento(null)
    try {
      const resultado = await registrarPartida({
        data: resultadoCaca
          ? {
              apelido: nome,
              modo: 'caca',
              tema: null,
              pontos: resultadoCaca.pontos,
              acertos: resultadoCaca.encontradas.length,
              total: resultadoCaca.quadro.palavras.length,
              melhorSequencia: resultadoCaca.melhorSequencia,
            }
          : {
              apelido: nome,
              modo,
              tema: modo === 'tema' ? tema : null,
              pontos,
              acertos: respostas.filter((resposta) => resposta.acertou).length,
              total: respostas.length,
              melhorSequencia,
            },
      })
      const atualizado = await buscarRanking({ data: { limite: 20 } })
      setRanking(atualizado)
      setDestaqueId(resultado.id)
      setEstadoSalvamento('salvo')
    } catch (erro) {
      console.error(erro)
      setEstadoSalvamento('erro')
      setErroSalvamento('Não foi possível registrar a partida agora. Tente novamente.')
    }
  }, [apelido, melhorSequencia, modo, pontos, respostas, resultadoCaca, tema])

  if (fase === 'jogando' && quadro) {
    return (
      <TelaCacaPalavras
        quadro={quadro}
        modo={config}
        onTerminar={(resultado) => {
          setResultadoCaca(resultado)
          setFase('fim')
        }}
        onSair={() => setFase('inicio')}
      />
    )
  }

  if (fase === 'jogando' && rodada[indice]) {
    const questao = rodada[indice]
    const semVidas = vidas !== null && vidas <= 0
    return (
      <TelaJogo
        key={questao.id}
        questao={questao}
        numero={indice + 1}
        total={config.quantidade}
        modo={config}
        pontos={pontos}
        sequencia={sequencia}
        vidas={vidas}
        ultima={semVidas || indice + 1 >= rodada.length}
        onResponder={responder}
        onAvancar={avancar}
        onDesistir={() => setFase(respostas.length > 0 ? 'fim' : 'inicio')}
      />
    )
  }

  if (fase === 'fim') {
    return (
      <TelaResultado
        modo={config}
        tema={modo === 'tema' ? tema : null}
        respostas={respostas}
        caca={resultadoCaca}
        pontos={resultadoCaca?.pontos ?? pontos}
        melhorSequencia={resultadoCaca?.melhorSequencia ?? melhorSequencia}
        apelido={apelido}
        estadoSalvamento={estadoSalvamento}
        erroSalvamento={erroSalvamento}
        ranking={ranking}
        destaqueId={destaqueId}
        onApelido={guardarApelido}
        onSalvar={salvar}
        onJogarNovamente={comecar}
        onVoltarMenu={() => setFase('inicio')}
      />
    )
  }

  return (
    <TelaInicial
      modo={modo}
      tema={tema}
      apelido={apelido}
      ranking={ranking}
      onModo={setModo}
      onTema={setTema}
      onApelido={guardarApelido}
      onComecar={comecar}
    />
  )
}
