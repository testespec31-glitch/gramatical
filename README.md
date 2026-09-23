# Vírgula — jogo gramatical

Jogo de gramática da língua portuguesa. O jogador responde questões cronometradas de crase,
concordância, regência, pontuação, ortografia, acentuação, pronomes e verbos; cada resposta vem
acompanhada da explicação da regra, e as pontuações ficam registradas em um ranking.

## O que já está no ar

- **Menu inicial** com três modos de jogo, escolha de tema e apelido do jogador.
- **Partida** com cronômetro por questão, sequência de acertos que multiplica pontos, vidas no modo
  maratona, atalhos de teclado (1, 2, 3) e explicação da regra depois de cada resposta.
- **Resultado** com pontuação, aproveitamento, tempo médio, desempenho por tema, lista do que
  revisar e assinatura da partida no ranking.
- **Ranking** (`/ranking`) com as trinta melhores pontuações registradas.

### Modos de jogo

| Modo | Como funciona |
|------|----------------|
| Revisão rápida | 10 questões sorteadas de todos os temas, 25 s cada |
| Maratona | Questões em dificuldade crescente até somar três erros, 18 s cada |
| Treino por tema | 8 questões de um único assunto, 30 s cada |

Pontuação: 100 pontos de base (mais 25 por nível de dificuldade), até 60 pontos de bônus pelo tempo
restante e 20 pontos por acerto seguido, limitados a cinco acertos de bônus.

## Tecnologias

- **TanStack Start** (React 19 + TanStack Router) com renderização no servidor
- **Tailwind CSS 4** com tema próprio declarado em `src/styles.css`
- **Netlify Database** (Postgres gerenciado) com **Drizzle ORM** para o ranking
- **Netlify** para build, deploy e execução das server functions

## Rodando localmente

```bash
npm install
npm run dev        # ou: netlify dev
```

O banco é provisionado automaticamente pela Netlify no primeiro acesso; as migrações de
`netlify/database/migrations/` são aplicadas pela plataforma durante o deploy.

## Como crescer o banco de questões

As questões ficam em `src/data/questions.ts`. Cada item declara tema, nível (1 a 3), enunciado,
alternativas, índice da resposta correta e a explicação exibida após a resposta. Basta acrescentar
objetos ao array `QUESTOES` — os modos de jogo e o desempenho por tema passam a considerá-los
automaticamente.
