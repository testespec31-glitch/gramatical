export type TemaId =
  | 'crase'
  | 'concordancia'
  | 'regencia'
  | 'pontuacao'
  | 'ortografia'
  | 'acentuacao'
  | 'pronomes'
  | 'verbos'

export interface Tema {
  id: TemaId
  nome: string
  resumo: string
  sigla: string
}

export interface Questao {
  id: string
  tema: TemaId
  nivel: 1 | 2 | 3
  pergunta: string
  opcoes: string[]
  correta: number
  explicacao: string
}

export const TEMAS: Tema[] = [
  { id: 'crase', nome: 'Crase', sigla: 'CR', resumo: 'O acento que separa o "a" artigo do "a" preposição' },
  { id: 'concordancia', nome: 'Concordância', sigla: 'CO', resumo: 'Verbos e adjetivos combinando com quem manda na frase' },
  { id: 'regencia', nome: 'Regência', sigla: 'RG', resumo: 'A preposição que cada verbo exige' },
  { id: 'pontuacao', nome: 'Pontuação', sigla: 'PT', resumo: 'Vírgulas, ponto e vírgula e o sentido que eles mudam' },
  { id: 'ortografia', nome: 'Ortografia', sigla: 'OR', resumo: 'Por que, porque, mas, mais, mal, mau, há, a' },
  { id: 'acentuacao', nome: 'Acentuação', sigla: 'AC', resumo: 'Onde o acento fica e onde ele caiu no acordo' },
  { id: 'pronomes', nome: 'Pronomes', sigla: 'PR', resumo: 'Mim, eu, lhe, o, e o lugar de cada um' },
  { id: 'verbos', nome: 'Verbos', sigla: 'VB', resumo: 'Subjuntivo, formas irregulares e tempos que traem' },
]

export const TEMA_POR_ID: Record<TemaId, Tema> = TEMAS.reduce(
  (acc, tema) => ({ ...acc, [tema.id]: tema }),
  {} as Record<TemaId, Tema>,
)

export const QUESTOES: Questao[] = [
  // ---------------------------------------------------------------- crase
  {
    id: 'cr-01',
    tema: 'crase',
    nivel: 1,
    pergunta: 'Entreguei o relatório ___ diretora antes do prazo.',
    opcoes: ['à', 'a', 'há'],
    correta: 0,
    explicacao:
      'Quem entrega, entrega algo a alguém. A preposição "a" encontra o artigo "a" de "a diretora" — a + a = à.',
  },
  {
    id: 'cr-02',
    tema: 'crase',
    nivel: 1,
    pergunta: 'Voltamos para casa ___ pé, porque o ônibus quebrou.',
    opcoes: ['a', 'à', 'há'],
    correta: 0,
    explicacao:
      '"Pé" é palavra masculina, e não existe artigo "a" antes dela. Sem artigo, não há crase: a pé, a cavalo, a lápis.',
  },
  {
    id: 'cr-03',
    tema: 'crase',
    nivel: 2,
    pergunta: 'A sessão de cinema começa ___ uma hora da tarde.',
    opcoes: ['à', 'a', 'há'],
    correta: 0,
    explicacao:
      'Em indicação de hora determinada há crase: "à uma hora", "às três". O teste do masculino confirma: "ao meio-dia".',
  },
  {
    id: 'cr-04',
    tema: 'crase',
    nivel: 2,
    pergunta: 'No feriado, viajamos ___ Bahia com a família toda.',
    opcoes: ['à', 'a', 'há'],
    correta: 0,
    explicacao:
      'Topônimos que pedem artigo levam crase: "vou à Bahia" (porque se diz "volto da Bahia"). Já em "vou a São Paulo" não há artigo.',
  },
  {
    id: 'cr-05',
    tema: 'crase',
    nivel: 2,
    pergunta: 'Refiro-me ___ pessoas que chegaram depois do intervalo.',
    opcoes: ['às', 'as', 'a'],
    correta: 0,
    explicacao:
      'Referir-se exige a preposição "a", e "pessoas" vem com artigo no plural: a + as = às.',
  },
  {
    id: 'cr-06',
    tema: 'crase',
    nivel: 3,
    pergunta: 'Depois de horas de reunião, ficamos frente ___ frente com o problema real.',
    opcoes: ['a', 'à', 'há'],
    correta: 0,
    explicacao:
      'Em locuções com a mesma palavra repetida não há crase: frente a frente, cara a cara, gota a gota.',
  },
  {
    id: 'cr-07',
    tema: 'crase',
    nivel: 2,
    pergunta: 'Cheguei ___ conclusão de que o texto ainda precisa de revisão.',
    opcoes: ['à', 'a', 'ha'],
    correta: 0,
    explicacao:
      'Chegar a algum lugar + "a conclusão" (feminino com artigo) = à conclusão. Compare com "cheguei ao resultado".',
  },
  {
    id: 'cr-08',
    tema: 'crase',
    nivel: 3,
    pergunta: 'Não assisti ___ nenhuma das apresentações da manhã.',
    opcoes: ['a', 'à', 'às'],
    correta: 0,
    explicacao:
      'Antes de pronome indefinido como "nenhuma" não cabe artigo, então a preposição fica sozinha: assisti a nenhuma.',
  },
  {
    id: 'cr-09',
    tema: 'crase',
    nivel: 3,
    pergunta: 'O ofício foi enviado ___ Vossa Senhoria na sexta-feira.',
    opcoes: ['a', 'à', 'ás'],
    correta: 0,
    explicacao:
      'Pronomes de tratamento com "Vossa" não admitem artigo. Por isso: a Vossa Senhoria, a Vossa Excelência.',
  },

  // -------------------------------------------------------- concordância
  {
    id: 'co-01',
    tema: 'concordancia',
    nivel: 1,
    pergunta: '___ dez anos que ele saiu da cidade e nunca mais voltou.',
    opcoes: ['Faz', 'Fazem', 'Fazeram'],
    correta: 0,
    explicacao:
      'O verbo "fazer" indicando tempo decorrido é impessoal: fica sempre no singular. Faz dez anos, faz séculos.',
  },
  {
    id: 'co-02',
    tema: 'concordancia',
    nivel: 1,
    pergunta: '___ muitas pessoas esperando na calçada quando a porta abriu.',
    opcoes: ['Havia', 'Haviam', 'Háviam'],
    correta: 0,
    explicacao:
      'No sentido de "existir", o verbo haver é impessoal e não vai para o plural: havia muitas pessoas.',
  },
  {
    id: 'co-03',
    tema: 'concordancia',
    nivel: 2,
    pergunta: 'Os documentos foram devolvidos e seguem ___ ao processo.',
    opcoes: ['anexos', 'anexo', 'anexado'],
    correta: 0,
    explicacao:
      '"Anexo" é adjetivo e concorda com o substantivo: documentos anexos, carta anexa. A forma invariável é "em anexo".',
  },
  {
    id: 'co-04',
    tema: 'concordancia',
    nivel: 1,
    pergunta: 'Hoje compareceram ___ pessoas do que na estreia.',
    opcoes: ['menos', 'menas', 'menores'],
    correta: 0,
    explicacao:
      '"Menos" é invariável em qualquer contexto. A forma "menas" não existe na norma-padrão.',
  },
  {
    id: 'co-05',
    tema: 'concordancia',
    nivel: 2,
    pergunta: '___ salas comerciais no centro da cidade.',
    opcoes: ['Alugam-se', 'Aluga-se', 'Alugam-nas'],
    correta: 0,
    explicacao:
      'O "se" aqui é partícula apassivadora: "salas são alugadas". O sujeito é "salas", então o verbo vai ao plural.',
  },
  {
    id: 'co-06',
    tema: 'concordancia',
    nivel: 2,
    pergunta: 'Havia ___ motivos para comemorar o resultado.',
    opcoes: ['bastantes', 'bastante', 'bastantemente'],
    correta: 0,
    explicacao:
      'Ao lado de substantivo, "bastante" equivale a "muitos" e varia: bastantes motivos. Junto de adjetivo, fica invariável.',
  },
  {
    id: 'co-07',
    tema: 'concordancia',
    nivel: 2,
    pergunta: 'Depois da viagem, ela ainda estava ___ cansada.',
    opcoes: ['meio', 'meia', 'meias'],
    correta: 0,
    explicacao:
      'Aqui "meio" é advérbio (equivale a "um pouco") e não varia. "Meia" só varia quando é numeral: meia dúzia.',
  },
  {
    id: 'co-08',
    tema: 'concordancia',
    nivel: 3,
    pergunta: 'Na placa do laboratório: "___ a entrada de pessoas não autorizadas".',
    opcoes: ['É proibida', 'É proibido', 'São proibidas'],
    correta: 0,
    explicacao:
      'Com o substantivo determinado por artigo ("a entrada"), o predicativo concorda: é proibida a entrada. Sem artigo, ficaria "é proibido entrada".',
  },
  {
    id: 'co-09',
    tema: 'concordancia',
    nivel: 3,
    pergunta: 'Vossa Excelência ___ o parecer antes do prazo final.',
    opcoes: ['assinou', 'assinastes', 'assinaste'],
    correta: 0,
    explicacao:
      'Pronomes de tratamento levam o verbo à terceira pessoa, mesmo quando falamos diretamente com a pessoa.',
  },

  // ------------------------------------------------------------ regência
  {
    id: 'rg-01',
    tema: 'regencia',
    nivel: 1,
    pergunta: 'Ontem assisti ___ filme que você recomendou.',
    opcoes: ['ao', 'o', 'no'],
    correta: 0,
    explicacao:
      'No sentido de "ver", assistir pede a preposição "a": assisti ao filme, à peça, ao jogo.',
  },
  {
    id: 'rg-02',
    tema: 'regencia',
    nivel: 2,
    pergunta: 'Prefiro cinema ___ teatro nas noites de semana.',
    opcoes: ['a', 'do que', 'que'],
    correta: 0,
    explicacao:
      'Preferir algo a algo. Na norma-padrão não se usa "prefiro mais isso do que aquilo".',
  },
  {
    id: 'rg-03',
    tema: 'regencia',
    nivel: 3,
    pergunta: 'O relatório ___ me referi ganhou uma nova versão.',
    opcoes: ['a que', 'que', 'ao qual que'],
    correta: 0,
    explicacao:
      'Referir-se a algo: a preposição acompanha o pronome relativo — o relatório a que me referi.',
  },
  {
    id: 'rg-04',
    tema: 'regencia',
    nivel: 2,
    pergunta: 'Obedeça ___ regras combinadas antes da partida.',
    opcoes: ['às', 'as', 'nas'],
    correta: 0,
    explicacao:
      'Obedecer e desobedecer são transitivos indiretos: obedecer a algo. Com o artigo feminino plural, a + as = às.',
  },
  {
    id: 'rg-05',
    tema: 'regencia',
    nivel: 3,
    pergunta: 'Ele estuda à noite porque visa ___ uma promoção no próximo ano.',
    opcoes: ['a', '(sem preposição)', 'por'],
    correta: 0,
    explicacao:
      'No sentido de "ter como objetivo", visar pede "a": visa a uma promoção. Sem preposição, visar é mirar ou pôr visto.',
  },
  {
    id: 'rg-06',
    tema: 'regencia',
    nivel: 2,
    pergunta: 'Esqueci-me ___ senha do banco outra vez.',
    opcoes: ['da', 'a', 'na'],
    correta: 0,
    explicacao:
      'Com pronome, o verbo pede preposição: esquecer-se de algo. Sem o pronome, é direto: esqueci a senha.',
  },
  {
    id: 'rg-07',
    tema: 'regencia',
    nivel: 3,
    pergunta: 'A pressa implicou ___ vários erros de digitação.',
    opcoes: ['(sem preposição)', 'em', 'com'],
    correta: 0,
    explicacao:
      'No sentido de "acarretar", implicar é transitivo direto: a pressa implicou erros. "Implicar com" é mexer com alguém.',
  },
  {
    id: 'rg-08',
    tema: 'regencia',
    nivel: 2,
    pergunta: 'Ela namora ___ Rui desde o segundo ano da faculdade.',
    opcoes: ['o', 'com o', 'ao'],
    correta: 0,
    explicacao:
      'Namorar é transitivo direto na norma-padrão: namora o Rui. O "com" é aceito na fala, mas não na escrita formal.',
  },

  // ----------------------------------------------------------- pontuação
  {
    id: 'pt-01',
    tema: 'pontuacao',
    nivel: 1,
    pergunta: 'Qual frase está pontuada corretamente?',
    opcoes: [
      'Bom dia, professora, o texto já está revisado.',
      'Bom dia professora o texto já está revisado.',
      'Bom dia, professora o texto, já está revisado.',
    ],
    correta: 0,
    explicacao:
      'O vocativo — a pessoa a quem chamamos — fica isolado por vírgulas, e a segunda oração também se separa.',
  },
  {
    id: 'pt-02',
    tema: 'pontuacao',
    nivel: 3,
    pergunta: 'Em "Os alunos, que treinaram muito, venceram", as vírgulas indicam que:',
    opcoes: [
      'todos os alunos treinaram e todos venceram',
      'apenas os alunos que treinaram venceram',
      'nenhum aluno treinou o suficiente',
    ],
    correta: 0,
    explicacao:
      'Entre vírgulas, a oração é explicativa: vale para todo o grupo. Sem vírgulas, ela restringe e separa só uma parte dos alunos.',
  },
  {
    id: 'pt-03',
    tema: 'pontuacao',
    nivel: 2,
    pergunta: 'Qual frase está pontuada corretamente?',
    opcoes: [
      'Os candidatos aprovados no concurso receberão o resultado por e-mail.',
      'Os candidatos aprovados no concurso, receberão o resultado por e-mail.',
      'Os candidatos, aprovados no concurso receberão, o resultado por e-mail.',
    ],
    correta: 0,
    explicacao:
      'Não se separa o sujeito do verbo por vírgula, por comprido que o sujeito seja.',
  },
  {
    id: 'pt-04',
    tema: 'pontuacao',
    nivel: 2,
    pergunta: 'Qual é a pontuação adequada para a frase abaixo?',
    opcoes: [
      'Em 1987, a cidade recebeu a primeira biblioteca pública.',
      'Em 1987 a cidade, recebeu a primeira biblioteca pública.',
      'Em, 1987 a cidade recebeu a primeira biblioteca pública.',
    ],
    correta: 0,
    explicacao:
      'Adjunto adverbial deslocado para o começo da frase pede vírgula depois dele.',
  },
  {
    id: 'pt-05',
    tema: 'pontuacao',
    nivel: 1,
    pergunta: 'Qual enumeração está correta?',
    opcoes: [
      'Levei pão, queijo, azeitona e vinho para o piquenique.',
      'Levei pão, queijo, azeitona, e vinho para o piquenique.',
      'Levei pão queijo, azeitona e, vinho para o piquenique.',
    ],
    correta: 0,
    explicacao:
      'Na enumeração, as vírgulas separam os itens e o "e" substitui a última vírgula.',
  },
  {
    id: 'pt-06',
    tema: 'pontuacao',
    nivel: 2,
    pergunta: 'Qual frase usa a vírgula corretamente com a conjunção adversativa?',
    opcoes: [
      'Ele tentou explicar o cálculo, mas ninguém prestou atenção.',
      'Ele tentou explicar o cálculo mas, ninguém prestou atenção.',
      'Ele tentou, explicar o cálculo mas ninguém prestou atenção.',
    ],
    correta: 0,
    explicacao:
      'A vírgula vem antes da conjunção adversativa ("mas", "porém", "contudo"), nunca depois dela.',
  },
  {
    id: 'pt-07',
    tema: 'pontuacao',
    nivel: 3,
    pergunta: 'Qual frase está pontuada corretamente?',
    opcoes: [
      'Marina, a advogada do caso, pediu mais dez dias de prazo.',
      'Marina a advogada do caso, pediu mais dez dias de prazo.',
      'Marina, a advogada do caso pediu mais dez dias de prazo.',
    ],
    correta: 0,
    explicacao:
      'O aposto explicativo fica cercado por vírgulas nos dois lados — abrir sem fechar deixa a frase quebrada.',
  },

  // ---------------------------------------------------------- ortografia
  {
    id: 'or-01',
    tema: 'ortografia',
    nivel: 1,
    pergunta: 'Ainda não sei ___ ela saiu tão cedo da festa.',
    opcoes: ['por que', 'porque', 'porquê'],
    correta: 0,
    explicacao:
      'Em pergunta, direta ou indireta, usa-se "por que" separado — equivale a "por qual motivo".',
  },
  {
    id: 'or-02',
    tema: 'ortografia',
    nivel: 1,
    pergunta: 'Ele faltou ao treino ___ estava com febre.',
    opcoes: ['porque', 'por que', 'por quê'],
    correta: 0,
    explicacao:
      '"Porque" junto e sem acento introduz a explicação: equivale a "pois", "já que".',
  },
  {
    id: 'or-03',
    tema: 'ortografia',
    nivel: 2,
    pergunta: 'Quero entender o ___ de tanta pressa.',
    opcoes: ['porquê', 'porque', 'por que'],
    correta: 0,
    explicacao:
      'Depois de artigo, "porquê" é substantivo (o motivo) e leva acento circunflexo.',
  },
  {
    id: 'or-04',
    tema: 'ortografia',
    nivel: 3,
    pergunta: 'Esta é a ponte ___ passamos todos os dias.',
    opcoes: ['por que', 'porque', 'porquê'],
    correta: 0,
    explicacao:
      'Aqui "por que" é preposição + pronome relativo: a ponte pela qual passamos.',
  },
  {
    id: 'or-05',
    tema: 'ortografia',
    nivel: 1,
    pergunta: 'Estudou o mês inteiro, ___ não conseguiu a vaga.',
    opcoes: ['mas', 'mais', 'más'],
    correta: 0,
    explicacao:
      '"Mas" indica oposição; "mais" é quantidade; "más" é o plural de "má".',
  },
  {
    id: 'or-06',
    tema: 'ortografia',
    nivel: 1,
    pergunta: 'Ele se sentiu ___ depois de ler a notícia.',
    opcoes: ['mal', 'mau', 'mais'],
    correta: 0,
    explicacao:
      '"Mal" é advérbio e se opõe a "bem"; "mau" é adjetivo e se opõe a "bom".',
  },
  {
    id: 'or-07',
    tema: 'ortografia',
    nivel: 2,
    pergunta: 'Voltei da viagem ___ duas semanas.',
    opcoes: ['há', 'a', 'à'],
    correta: 0,
    explicacao:
      'Tempo já decorrido pede "há" (do verbo haver). O "a" marca tempo futuro: daqui a duas semanas.',
  },
  {
    id: 'or-08',
    tema: 'ortografia',
    nivel: 2,
    pergunta: '___ você vai com essa mala toda?',
    opcoes: ['Aonde', 'Onde', 'Donde'],
    correta: 0,
    explicacao:
      '"Aonde" acompanha verbos de movimento (ir, chegar); "onde" indica lugar fixo: onde você mora.',
  },
  {
    id: 'or-09',
    tema: 'ortografia',
    nivel: 2,
    pergunta: 'Corra, ___ vai perder o último ônibus.',
    opcoes: ['senão', 'se não', 'sennão'],
    correta: 0,
    explicacao:
      '"Senão" junto equivale a "caso contrário". Separado, "se não" introduz condição: se não correr, perderá.',
  },
  {
    id: 'or-10',
    tema: 'ortografia',
    nivel: 1,
    pergunta: 'Qual grafia está correta?',
    opcoes: ['de repente', 'derrepente', 'de-repente'],
    correta: 0,
    explicacao:
      'A locução se escreve em duas palavras separadas: de repente. Mesmo caso de "a gente" e "à toa".',
  },

  // --------------------------------------------------------- acentuação
  {
    id: 'ac-01',
    tema: 'acentuacao',
    nivel: 1,
    pergunta: 'Qual palavra está escrita corretamente?',
    opcoes: ['juiz', 'juíz', 'juís'],
    correta: 0,
    explicacao:
      'O "i" tônico do hiato só recebe acento quando forma sílaba sozinho: ju-iz não leva acento, mas ju-í-zes leva.',
  },
  {
    id: 'ac-02',
    tema: 'acentuacao',
    nivel: 1,
    pergunta: 'Qual palavra está escrita corretamente?',
    opcoes: ['ideia', 'idéia', 'ideía'],
    correta: 0,
    explicacao:
      'O acordo ortográfico tirou o acento dos ditongos abertos "ei" e "oi" em palavras paroxítonas: ideia, assembleia, jiboia.',
  },
  {
    id: 'ac-03',
    tema: 'acentuacao',
    nivel: 2,
    pergunta: 'Qual palavra está escrita corretamente?',
    opcoes: ['heroico', 'heróico', 'herôico'],
    correta: 0,
    explicacao:
      'Mesma regra de "ideia": o ditongo aberto "oi" em paroxítona perdeu o acento. Já "herói", oxítona, mantém.',
  },
  {
    id: 'ac-04',
    tema: 'acentuacao',
    nivel: 2,
    pergunta: 'Ontem ele não ___ comparecer à reunião.',
    opcoes: ['pôde', 'pode', 'pôdi'],
    correta: 0,
    explicacao:
      'O acento circunflexo distingue o pretérito "pôde" (ontem) do presente "pode" (agora).',
  },
  {
    id: 'ac-05',
    tema: 'acentuacao',
    nivel: 1,
    pergunta: 'Eles ___ toda a razão nessa discussão.',
    opcoes: ['têm', 'tem', 'teem'],
    correta: 0,
    explicacao:
      'No plural, "têm" recebe circunflexo para se distinguir do singular "tem". O mesmo vale para vem / vêm.',
  },
  {
    id: 'ac-06',
    tema: 'acentuacao',
    nivel: 2,
    pergunta: 'Os primos ___ de Recife todo mês de julho.',
    opcoes: ['vêm', 'vem', 'veem'],
    correta: 0,
    explicacao:
      '"Vêm" é o plural de "vem" (verbo vir). "Veem" é o plural de "vê" (verbo ver), sem acento desde o acordo.',
  },
  {
    id: 'ac-07',
    tema: 'acentuacao',
    nivel: 3,
    pergunta: 'Qual palavra está escrita corretamente?',
    opcoes: ['rubrica', 'rúbrica', 'rubríca'],
    correta: 0,
    explicacao:
      '"Rubrica" é paroxítona terminada em "a" e não leva acento — a pronúncia correta é ru-bri-ca.',
  },

  // ----------------------------------------------------------- pronomes
  {
    id: 'pr-01',
    tema: 'pronomes',
    nivel: 2,
    pergunta: 'Ela não ___ contou nada sobre a mudança.',
    opcoes: ['me', 'mim', 'eu'],
    correta: 0,
    explicacao:
      'Palavra negativa atrai o pronome para antes do verbo (próclise): não me contou.',
  },
  {
    id: 'pr-02',
    tema: 'pronomes',
    nivel: 1,
    pergunta: 'Esse acordo fica entre ___ e você.',
    opcoes: ['mim', 'eu', 'me'],
    correta: 0,
    explicacao:
      'Depois de preposição usa-se pronome oblíquo: entre mim e você, para mim, com ela.',
  },
  {
    id: 'pr-03',
    tema: 'pronomes',
    nivel: 3,
    pergunta: 'Trouxe o contrato para ___ assinar hoje.',
    opcoes: ['eu', 'mim', 'me'],
    correta: 0,
    explicacao:
      'Quando o pronome é sujeito do verbo seguinte, usa-se a forma reta: para eu assinar, para eu ver.',
  },
  {
    id: 'pr-04',
    tema: 'pronomes',
    nivel: 2,
    pergunta: 'Em um e-mail formal, qual forma é adequada?',
    opcoes: [
      'Envie-me o comprovante até amanhã.',
      'Me envie o comprovante até amanhã.',
      'Envie eu o comprovante até amanhã.',
    ],
    correta: 0,
    explicacao:
      'Na norma-padrão, não se começa frase com pronome oblíquo átono; a ênclise resolve: envie-me.',
  },
  {
    id: 'pr-05',
    tema: 'pronomes',
    nivel: 3,
    pergunta: 'Sempre ___ obedeci, mesmo quando discordava.',
    opcoes: ['lhe', 'o', 'ele'],
    correta: 0,
    explicacao:
      'Obedecer pede preposição "a", e o pronome correspondente é "lhe" — não o objeto direto "o".',
  },
  {
    id: 'pr-06',
    tema: 'pronomes',
    nivel: 2,
    pergunta: 'Os livros estavam na estante; foi de lá que eu ___ tirei.',
    opcoes: ['os', 'lhes', 'eles'],
    correta: 0,
    explicacao:
      'Tirar é transitivo direto, então o objeto pede "os" (e não "lhes", que é objeto indireto).',
  },

  // ------------------------------------------------------------- verbos
  {
    id: 'vb-01',
    tema: 'verbos',
    nivel: 1,
    pergunta: 'Se eu ___ tempo, iria com vocês ao festival.',
    opcoes: ['tivesse', 'teria', 'tinha'],
    correta: 0,
    explicacao:
      'Hipótese pede imperfeito do subjuntivo na condição e futuro do pretérito no resultado: se tivesse, iria.',
  },
  {
    id: 'vb-02',
    tema: 'verbos',
    nivel: 3,
    pergunta: 'Quando você ___ o e-mail, responda na mesma hora.',
    opcoes: ['vir', 'ver', 'vier'],
    correta: 0,
    explicacao:
      'É o futuro do subjuntivo do verbo ver: quando eu vir, quando você vir. "Vier" pertence ao verbo vir.',
  },
  {
    id: 'vb-03',
    tema: 'verbos',
    nivel: 3,
    pergunta: 'Se ele ___ à reunião amanhã, o projeto será aprovado.',
    opcoes: ['vier', 'vir', 'virá'],
    correta: 0,
    explicacao:
      'Futuro do subjuntivo do verbo vir: se ele vier. Compare com o verbo ver: se ele vir.',
  },
  {
    id: 'vb-04',
    tema: 'verbos',
    nivel: 2,
    pergunta: 'Eu ___ os papéis sobre a mesa ainda de manhã.',
    opcoes: ['pus', 'pôs', 'ponhei'],
    correta: 0,
    explicacao:
      'O pretérito perfeito de "pôr" é irregular: eu pus, tu puseste, ele pôs, nós pusemos.',
  },
  {
    id: 'vb-05',
    tema: 'verbos',
    nivel: 2,
    pergunta: 'Espero que ___ vagas no curso da tarde.',
    opcoes: ['haja', 'haje', 'aja'],
    correta: 0,
    explicacao:
      '"Haja" é do verbo haver (existir); "aja" é do verbo agir. Depois de "espero que", vem o subjuntivo.',
  },
  {
    id: 'vb-06',
    tema: 'verbos',
    nivel: 3,
    pergunta: 'Caso o árbitro ___ na jogada, o lance será anulado.',
    opcoes: ['intervier', 'intervir', 'intervenha-se'],
    correta: 0,
    explicacao:
      '"Intervir" se conjuga como "vir": caso intervier, quando intervier, se intervier.',
  },
  {
    id: 'vb-07',
    tema: 'verbos',
    nivel: 2,
    pergunta: 'Ela ___ o texto e devolveu com as correções.',
    opcoes: ['reviu', 'revia', 'revê'],
    correta: 0,
    explicacao:
      'Ação concluída no passado pede pretérito perfeito: ela reviu o texto e devolveu.',
  },
  {
    id: 'vb-08',
    tema: 'verbos',
    nivel: 3,
    pergunta: 'Nós já ___ o valor pago em dobro no mês passado.',
    opcoes: ['reouvemos', 'reavemos', 'reouvimos'],
    correta: 0,
    explicacao:
      'O verbo "reaver" só existe nas formas em que "haver" tem o "v": reouvemos, reouve, reaveria.',
  },
]

export function questoesPorTema(tema: TemaId): Questao[] {
  return QUESTOES.filter((q) => q.tema === tema)
}
