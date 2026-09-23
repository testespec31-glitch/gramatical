import { QUESTOES, type Questao, type TemaId } from '../data/questions'

export type ModoId = 'rapido' | 'maratona' | 'tema'

export interface Modo {
  id: ModoId
  nome: string
  chamada: string
  descricao: string
  segundos: number
  vidas: number | null
  quantidade: number | null
}

export const MODOS: Modo[] = [
  {
    id: 'rapido',
    nome: 'Revisão rápida',
    chamada: '10 questões',
    descricao: 'Dez questões sorteadas de todos os temas, 25 segundos cada. Nenhum erro elimina.',
    segundos: 25,
    vidas: null,
    quantidade: 10,
  },
  {
    id: 'maratona',
    nome: 'Maratona',
    chamada: '3 vidas',
    descricao: 'Questões sem fim e cada vez mais difíceis. Três erros encerram a partida.',
    segundos: 18,
    vidas: 3,
    quantidade: null,
  },
  {
    id: 'tema',
    nome: 'Treino por tema',
    chamada: '1 assunto',
    descricao: 'Escolha um assunto e treine só ele, com mais tempo para pensar em cada questão.',
    segundos: 30,
    vidas: null,
    quantidade: 8,
  },
]

export const MODO_POR_ID: Record<ModoId, Modo> = MODOS.reduce(
  (acc, modo) => ({ ...acc, [modo.id]: modo }),
  {} as Record<ModoId, Modo>,
)

export interface QuestaoEmbaralhada extends Questao {
  ordem: number[]
}

function embaralhar<T>(lista: T[]): T[] {
  const copia = [...lista]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

/** Sorteia a ordem das alternativas para que a resposta não fique sempre no mesmo lugar. */
function prepararQuestao(questao: Questao): QuestaoEmbaralhada {
  const ordem = embaralhar(questao.opcoes.map((_, i) => i))
  return { ...questao, ordem }
}

export function montarRodada(modo: ModoId, tema: TemaId | null): QuestaoEmbaralhada[] {
  const config = MODO_POR_ID[modo]
  const disponiveis = modo === 'tema' && tema ? QUESTOES.filter((q) => q.tema === tema) : QUESTOES

  if (modo === 'maratona') {
    // Na maratona a dificuldade cresce: primeiro os níveis fáceis, depois os difíceis.
    return [1, 2, 3].flatMap((nivel) =>
      embaralhar(disponiveis.filter((q) => q.nivel === nivel)).map(prepararQuestao),
    )
  }

  const sorteadas = embaralhar(disponiveis)
  const limite = config.quantidade ?? sorteadas.length
  return sorteadas.slice(0, limite).map(prepararQuestao)
}

export const PONTOS_BASE = 100
export const BONUS_TEMPO_MAXIMO = 60
export const BONUS_SEQUENCIA = 20
export const SEQUENCIA_MAXIMA_BONUS = 5

export function pontuar(opcoes: {
  nivel: 1 | 2 | 3
  segundosRestantes: number
  segundosTotais: number
  sequencia: number
}): number {
  const { nivel, segundosRestantes, segundosTotais, sequencia } = opcoes
  const base = PONTOS_BASE + (nivel - 1) * 25
  const tempo = Math.round((Math.max(segundosRestantes, 0) / segundosTotais) * BONUS_TEMPO_MAXIMO)
  const emenda = Math.min(Math.max(sequencia - 1, 0), SEQUENCIA_MAXIMA_BONUS) * BONUS_SEQUENCIA
  return base + tempo + emenda
}

export interface Resposta {
  questao: QuestaoEmbaralhada
  escolha: number | null
  acertou: boolean
  pontos: number
  segundosGastos: number
}

export function resumoPorTema(respostas: Resposta[]) {
  const mapa = new Map<TemaId, { acertos: number; total: number }>()
  for (const resposta of respostas) {
    const atual = mapa.get(resposta.questao.tema) ?? { acertos: 0, total: 0 }
    mapa.set(resposta.questao.tema, {
      acertos: atual.acertos + (resposta.acertou ? 1 : 0),
      total: atual.total + 1,
    })
  }
  return [...mapa.entries()].map(([tema, dados]) => ({ tema, ...dados }))
}

export function classificacao(aproveitamento: number): { titulo: string; recado: string } {
  if (aproveitamento >= 0.95) return { titulo: 'Revisor-chefe', recado: 'Praticamente nada passou por você.' }
  if (aproveitamento >= 0.8) return { titulo: 'Olho de lince', recado: 'Poucos deslizes escaparam da sua leitura.' }
  if (aproveitamento >= 0.6) return { titulo: 'Bom de vírgula', recado: 'A base está firme; faltou afinar os casos difíceis.' }
  if (aproveitamento >= 0.4) return { titulo: 'Em revisão', recado: 'Dá para subir rápido treinando um tema por vez.' }
  return { titulo: 'Rascunho', recado: 'Comece pelo treino por tema e volte para a maratona depois.' }
}
