export interface PalavraOculta {
  /** Grafia correta, exibida na lista e na explicação. */
  palavra: string
  definicao: string
}

export interface ConjuntoCaca {
  id: string
  nome: string
  palavras: PalavraOculta[]
}

/**
 * Cada rodada do caça-palavras sorteia um conjunto e esconde parte das palavras dele no quadro.
 * As palavras precisam caber em 12 letras (sem contar acentos).
 */
export const CONJUNTOS_CACA: ConjuntoCaca[] = [
  {
    id: 'classes',
    nome: 'Classes gramaticais',
    palavras: [
      { palavra: 'Substantivo', definicao: 'Dá nome a seres, objetos, lugares e sentimentos.' },
      { palavra: 'Adjetivo', definicao: 'Atribui qualidade ou característica ao substantivo.' },
      { palavra: 'Verbo', definicao: 'Indica ação, estado ou fenômeno e varia em tempo e pessoa.' },
      { palavra: 'Advérbio', definicao: 'Modifica verbo, adjetivo ou outro advérbio: modo, lugar, tempo.' },
      { palavra: 'Pronome', definicao: 'Substitui ou acompanha o substantivo: eu, este, lhe, cujo.' },
      { palavra: 'Artigo', definicao: 'Antecede o substantivo, definindo-o (o, a) ou não (um, uma).' },
      { palavra: 'Numeral', definicao: 'Indica quantidade, ordem, multiplicação ou fração.' },
      { palavra: 'Preposição', definicao: 'Liga dois termos criando relação entre eles: de, para, com.' },
      { palavra: 'Conjunção', definicao: 'Liga orações ou termos de mesma função: e, mas, porque.' },
      { palavra: 'Interjeição', definicao: 'Exprime emoção de forma súbita: ufa!, oba!, ai!' },
    ],
  },
  {
    id: 'oracao',
    nome: 'Termos da oração',
    palavras: [
      { palavra: 'Sujeito', definicao: 'O termo com quem o verbo concorda.' },
      { palavra: 'Predicado', definicao: 'Tudo o que se declara sobre o sujeito.' },
      { palavra: 'Objeto', definicao: 'Completa o sentido de um verbo transitivo.' },
      { palavra: 'Vocativo', definicao: 'Chama o interlocutor e vem isolado por vírgula.' },
      { palavra: 'Aposto', definicao: 'Explica ou especifica outro termo da oração.' },
      { palavra: 'Adjunto', definicao: 'Termo acessório: adnominal (do nome) ou adverbial (do verbo).' },
      { palavra: 'Agente', definicao: 'Na voz passiva, quem de fato pratica a ação.' },
      { palavra: 'Complemento', definicao: 'Termo que integra o sentido de verbo ou nome.' },
      { palavra: 'Núcleo', definicao: 'A palavra central de um termo da oração.' },
      { palavra: 'Oração', definicao: 'Enunciado organizado em torno de um verbo.' },
    ],
  },
  {
    id: 'pontuacao',
    nome: 'Sinais de pontuação',
    palavras: [
      { palavra: 'Vírgula', definicao: 'Marca pausa breve; nunca separa sujeito do verbo.' },
      { palavra: 'Ponto', definicao: 'Encerra a frase declarativa.' },
      { palavra: 'Travessão', definicao: 'Introduz falas ou isola comentários com ênfase.' },
      { palavra: 'Aspas', definicao: 'Destacam citações, ironias e estrangeirismos.' },
      { palavra: 'Parênteses', definicao: 'Isolam informações acessórias, como explicações.' },
      { palavra: 'Reticências', definicao: 'Indicam interrupção ou suspensão do pensamento.' },
      { palavra: 'Exclamação', definicao: 'Expressa surpresa, ordem ou emoção intensa.' },
      { palavra: 'Hífen', definicao: 'Une elementos de palavras compostas e pronomes ao verbo.' },
      { palavra: 'Apóstrofo', definicao: 'Indica a supressão de letra: gota-d’água.' },
      { palavra: 'Interrogação', definicao: 'Fecha a pergunta direta.' },
    ],
  },
  {
    id: 'figuras',
    nome: 'Figuras de linguagem',
    palavras: [
      { palavra: 'Metáfora', definicao: 'Comparação implícita: "seus olhos são faróis".' },
      { palavra: 'Metonímia', definicao: 'Troca de um termo por outro próximo: "li Machado".' },
      { palavra: 'Ironia', definicao: 'Diz o contrário do que se pensa, com intenção crítica.' },
      { palavra: 'Hipérbole', definicao: 'Exagero intencional: "já falei mil vezes".' },
      { palavra: 'Antítese', definicao: 'Aproxima ideias opostas: "riso e choro".' },
      { palavra: 'Paradoxo', definicao: 'Une ideias contraditórias numa só: "dor que desatina sem doer".' },
      { palavra: 'Eufemismo', definicao: 'Suaviza uma ideia desagradável: "partiu" por "morreu".' },
      { palavra: 'Elipse', definicao: 'Omissão de termo facilmente subentendido.' },
      { palavra: 'Pleonasmo', definicao: 'Repetição de ideia para dar ênfase — ou por vício: "subir para cima".' },
      { palavra: 'Onomatopeia', definicao: 'Palavra que imita um som: tique-taque, miau.' },
    ],
  },
  {
    id: 'silabas',
    nome: 'Sílabas e acentos',
    palavras: [
      { palavra: 'Sílaba', definicao: 'Som ou grupo de sons pronunciados numa só emissão de voz.' },
      { palavra: 'Tônica', definicao: 'A sílaba pronunciada com mais força.' },
      { palavra: 'Átona', definicao: 'Sílaba pronunciada sem destaque.' },
      { palavra: 'Oxítona', definicao: 'Palavra com a última sílaba tônica: café, jacaré.' },
      { palavra: 'Paroxítona', definicao: 'Tônica na penúltima sílaba — a maioria das palavras do português.' },
      { palavra: 'Ditongo', definicao: 'Vogal e semivogal na mesma sílaba: pai, céu.' },
      { palavra: 'Hiato', definicao: 'Vogais vizinhas em sílabas diferentes: sa-ú-de.' },
      { palavra: 'Tritongo', definicao: 'Semivogal, vogal e semivogal juntas: Pa-ra-guai.' },
      { palavra: 'Crase', definicao: 'Fusão da preposição "a" com o artigo "a", marcada pelo acento grave.' },
      { palavra: 'Trema', definicao: 'Sinal abolido pelo acordo ortográfico, salvo em nomes próprios.' },
    ],
  },
]
