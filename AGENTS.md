# AGENTS.md

Contexto de arquitetura do **Vírgula — jogo gramatical** para quem (pessoa ou agente) for continuar
o projeto.

## Visão geral

Jogo de gramática do português em página única, com ranking persistido. Frontend e backend estão
completos: não há trabalho pendente de fundação.

| Camada | Tecnologia |
|--------|------------|
| Framework | TanStack Start (SSR) |
| UI | React 19, TanStack Router, Tailwind CSS 4 |
| Ícones | lucide-react |
| Banco | Netlify Database (Postgres) + Drizzle ORM |
| Deploy | Netlify |

## Diretórios

```
db/
  schema.ts               # tabela `partidas` (ranking) — fonte da verdade do schema
  index.ts                # cliente Drizzle com o adaptador netlify-db
netlify/database/migrations/
  <timestamp>_create_partidas/   # gerada por drizzle-kit; aplicada pela Netlify no deploy
src/
  data/questions.ts       # banco de questões + definição dos temas
  game/engine.ts          # modos, sorteio da rodada, pontuação, resumo e classificação
  server/
    ranking.server.ts     # acesso ao banco (só servidor)
    ranking.functions.ts  # server functions buscarRanking / registrarPartida
  components/
    Jogo.tsx              # máquina de estados: inicio -> jogando -> fim
    TelaInicial.tsx       # menu: modo, tema, apelido, prévia do ranking
    TelaJogo.tsx          # questão, cronômetro, feedback e explicação
    TelaResultado.tsx     # pontuação, desempenho por tema, assinatura no ranking
    ListaRanking.tsx      # lista de pontuações (usada na home e em /ranking)
    Cabecalho.tsx         # marca e navegação
  routes/
    __root.tsx            # shell HTML, metadados pt-BR, fontes
    index.tsx             # jogo (loader carrega o top 10)
    ranking.tsx           # ranking geral (loader carrega o top 30)
  styles.css              # tema Tailwind (@theme), textura de papel e animações
```

## Decisões que não são óbvias no código

- **Estado da partida vive em `Jogo.tsx`.** `TelaJogo` é montada com `key={questao.id}`, então o
  cronômetro e a seleção se reiniciam sozinhos a cada questão — não há reset manual.
- **`TelaJogo.onResponder` devolve os pontos ganhos** para que o carimbo "+N" apareça sem duplicar
  o cálculo de pontuação na tela.
- **Alternativas são embaralhadas** em `montarRodada`: `questao.ordem` guarda a ordem de exibição e
  os índices continuam sendo os originais, o que mantém `correta` válido.
- **A maratona ordena por nível** (1, 2, 3) em vez de sortear tudo, para a dificuldade crescer.
- **O banco é importado dinamicamente** dentro dos handlers em `ranking.functions.ts`
  (`await import('./ranking.server')`), garantindo que `@netlify/database` nunca entre no bundle do
  cliente.
- **`buscarRanking` nunca quebra a tela**: em caso de erro devolve lista vazia e a UI mostra o
  estado vazio, porque o ranking é acessório ao jogo.
- **Apelido no `localStorage`** é lido em `useEffect` (não no estado inicial) para não divergir do
  HTML renderizado no servidor.

## Convenções

- Código, nomes de variáveis, tipos e textos da interface em português.
- Componentes em PascalCase; arquivos de tela com o prefixo `Tela`.
- Cores e fontes só via tokens do `@theme` (`bg-papel`, `text-vermelho`, classes `fonte-display`,
  `fonte-mono`) — nada de valores soltos.
- Identidade visual: papel pautado, tinta escura e caneta vermelha de revisor. Animações discretas
  (`surgir`, `tremer`, `carimbo`) e respeito a `prefers-reduced-motion`.

## Mexendo no schema

Alterou `db/schema.ts`? Gere a migração e nunca edite uma migração já aplicada:

```bash
npx drizzle-kit generate --name <verbo_descricao>
```

## Ideias de evolução

- Mais questões por tema (o arquivo de questões é o único ponto a tocar).
- Modo duelo entre dois jogadores no mesmo dispositivo.
- Filtro do ranking por modo ou por tema.
- Estatísticas pessoais por tema usando o apelido guardado.
