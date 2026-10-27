import { CONJUNTOS_CACA, type ConjuntoCaca, type PalavraOculta } from '../data/cacaPalavras'

export const TAMANHO_QUADRO = 12
export const PALAVRAS_POR_QUADRO = 8

export interface Celula {
  linha: number
  coluna: number
}

export interface PalavraNoQuadro extends PalavraOculta {
  /** Letras sem acento, como aparecem no quadro. */
  letras: string
  celulas: Celula[]
}

export interface Quadro {
  conjunto: ConjuntoCaca
  letras: string[][]
  palavras: PalavraNoQuadro[]
}

// Direita, baixo, diagonal descendo e diagonal subindo: sempre legíveis da esquerda para a direita.
const DIRECOES: [number, number][] = [
  [0, 1],
  [1, 0],
  [1, 1],
  [-1, 1],
]

// Letras de preenchimento com frequência parecida com a do português, para o quadro não "entregar" as palavras.
const PREENCHIMENTO = 'AAAAEEEEOOOIIIUURRRSSSNNNMMTTTDDCCLLPPGBVFHQZJX'

export function semAcento(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Za-z]/g, '')
    .toUpperCase()
}

function embaralhar<T>(lista: T[]): T[] {
  const copia = [...lista]
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copia[i], copia[j]] = [copia[j], copia[i]]
  }
  return copia
}

function tentarPosicionar(grade: (string | null)[][], letras: string): Celula[] | null {
  const tentativas = embaralhar(
    DIRECOES.flatMap(([dl, dc]) =>
      Array.from({ length: TAMANHO_QUADRO * TAMANHO_QUADRO }, (_, i) => ({
        dl,
        dc,
        linha: Math.floor(i / TAMANHO_QUADRO),
        coluna: i % TAMANHO_QUADRO,
      })),
    ),
  )

  for (const { dl, dc, linha, coluna } of tentativas) {
    const fimLinha = linha + dl * (letras.length - 1)
    const fimColuna = coluna + dc * (letras.length - 1)
    if (fimLinha < 0 || fimLinha >= TAMANHO_QUADRO || fimColuna >= TAMANHO_QUADRO) continue

    const celulas = Array.from(letras, (_, i) => ({ linha: linha + dl * i, coluna: coluna + dc * i }))
    const cabe = celulas.every(({ linha: l, coluna: c }, i) => {
      const atual = grade[l][c]
      return atual === null || atual === letras[i]
    })
    if (!cabe) continue

    celulas.forEach(({ linha: l, coluna: c }, i) => {
      grade[l][c] = letras[i]
    })
    return celulas
  }
  return null
}

export function montarQuadro(): Quadro {
  const conjunto = CONJUNTOS_CACA[Math.floor(Math.random() * CONJUNTOS_CACA.length)]

  for (let tentativa = 0; tentativa < 30; tentativa++) {
    // Palavras longas primeiro: são as mais difíceis de encaixar.
    const escolhidas = embaralhar(conjunto.palavras)
      .slice(0, PALAVRAS_POR_QUADRO)
      .map((item) => ({ ...item, letras: semAcento(item.palavra) }))
      .sort((a, b) => b.letras.length - a.letras.length)

    const grade: (string | null)[][] = Array.from({ length: TAMANHO_QUADRO }, () =>
      Array.from({ length: TAMANHO_QUADRO }, () => null),
    )
    const palavras: PalavraNoQuadro[] = []
    for (const item of escolhidas) {
      const celulas = tentarPosicionar(grade, item.letras)
      if (!celulas) break
      palavras.push({ ...item, celulas })
    }
    if (palavras.length < escolhidas.length) continue

    const letras = grade.map((linha) =>
      linha.map((letra) => letra ?? PREENCHIMENTO[Math.floor(Math.random() * PREENCHIMENTO.length)]),
    )
    // A lista ao lado do quadro segue a ordem alfabética, não a de posicionamento.
    palavras.sort((a, b) => a.palavra.localeCompare(b.palavra, 'pt-BR'))
    return { conjunto, letras, palavras }
  }
  throw new Error('Não foi possível montar o caça-palavras.')
}

/** Células entre o início e o fim da seleção, ou só o início se o traço não for reto nem diagonal. */
export function tracarSelecao(inicio: Celula, fim: Celula): Celula[] {
  const dl = fim.linha - inicio.linha
  const dc = fim.coluna - inicio.coluna
  const alinhado = dl === 0 || dc === 0 || Math.abs(dl) === Math.abs(dc)
  if (!alinhado) return [inicio]
  const passos = Math.max(Math.abs(dl), Math.abs(dc))
  return Array.from({ length: passos + 1 }, (_, i) => ({
    linha: inicio.linha + Math.sign(dl) * i,
    coluna: inicio.coluna + Math.sign(dc) * i,
  }))
}

function mesmasCelulas(a: Celula[], b: Celula[]) {
  return a.length === b.length && a.every((c, i) => c.linha === b[i].linha && c.coluna === b[i].coluna)
}

/** Aceita a seleção nos dois sentidos: do começo ao fim da palavra ou ao contrário. */
export function palavraSelecionada(palavras: PalavraNoQuadro[], selecao: Celula[]) {
  const invertida = [...selecao].reverse()
  return palavras.find(
    (palavra) => mesmasCelulas(palavra.celulas, selecao) || mesmasCelulas(palavra.celulas, invertida),
  )
}

export const BONUS_TEMPO_CACA = 2

export function pontuarPalavra(letras: string, sequencia: number): number {
  const emenda = Math.min(Math.max(sequencia - 1, 0), 5) * 20
  return 100 + letras.length * 10 + emenda
}
