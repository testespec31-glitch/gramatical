import { ArrowRight } from 'lucide-react'
import { MODOS, type ModoId } from '../game/engine'
import { QUESTOES, TEMAS, type TemaId } from '../data/questions'
import type { LinhaRanking } from '../server/ranking.functions'
import { ListaRanking } from './ListaRanking'

interface Props {
  modo: ModoId
  tema: TemaId
  apelido: string
  ranking: LinhaRanking[]
  onModo: (modo: ModoId) => void
  onTema: (tema: TemaId) => void
  onApelido: (apelido: string) => void
  onComecar: () => void
}

export function TelaInicial({
  modo,
  tema,
  apelido,
  ranking,
  onModo,
  onTema,
  onApelido,
  onComecar,
}: Props) {
  const totalTemas = TEMAS.length

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 pb-20 pt-6 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14 lg:pt-14">
      <section className="relative surgir">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -left-6 -top-24 select-none fonte-display text-[16rem] leading-none text-vermelho/12 sm:-top-28 sm:text-[20rem]"
        >
          ,
        </span>
        <p className="fonte-mono relative text-[0.7rem] uppercase tracking-[0.3em] text-vermelho">
          Jogo gramatical
        </p>
        <h1 className="fonte-display relative mt-4 text-5xl font-semibold leading-[0.95] sm:text-6xl lg:text-[4.4rem]">
          A gramática
          <br />
          <span className="italic">vira</span> partida.
        </h1>
        <p className="relative mt-6 max-w-md text-lg leading-relaxed text-tinta-media">
          Crase, concordância, regência, pontuação, acentuação. Cada questão tem cronômetro, cada
          resposta vem com a explicação da regra — e cada acerto seguido vale mais pontos.
        </p>

        <dl className="relative mt-10 grid max-w-md grid-cols-3 gap-px border-y border-tinta/15 bg-tinta/10">
          {[
            { valor: String(QUESTOES.length), rotulo: 'questões' },
            { valor: String(totalTemas), rotulo: 'temas' },
            { valor: '3', rotulo: 'modos de jogo' },
          ].map((item) => (
            <div key={item.rotulo} className="bg-papel px-3 py-4">
              <dt className="fonte-display text-3xl leading-none">{item.valor}</dt>
              <dd className="fonte-mono mt-2 text-[0.65rem] uppercase tracking-[0.16em] text-tinta-fraca">
                {item.rotulo}
              </dd>
            </div>
          ))}
        </dl>

        <div className="relative mt-12 max-w-md">
          <h2 className="fonte-mono text-[0.7rem] uppercase tracking-[0.24em] text-tinta-fraca">
            Melhores partidas
          </h2>
          <div className="mt-3">
            <ListaRanking linhas={ranking.slice(0, 5)} compacta />
          </div>
        </div>
      </section>

      <section
        className="folha folha-margem relative surgir p-6 pl-14 sm:p-9 sm:pl-20"
        style={{ animationDelay: '0.12s' }}
      >
        <h2 className="fonte-display text-2xl">Escolha o formato da rodada</h2>

        <div className="mt-5 flex flex-col gap-3">
          {MODOS.map((item) => {
            const ativo = item.id === modo
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onModo(item.id)}
                aria-pressed={ativo}
                className={`group flex items-start gap-4 border px-4 py-4 text-left transition-all duration-200 ${
                  ativo
                    ? 'border-vermelho bg-vermelho-fundo/60 shadow-[3px_3px_0_0_var(--color-vermelho)]'
                    : 'border-tinta/20 hover:-translate-y-0.5 hover:border-tinta/50'
                }`}
              >
                <span
                  className={`fonte-mono mt-0.5 shrink-0 rounded-full px-2 py-1 text-[0.6rem] uppercase tracking-[0.12em] ${
                    ativo ? 'bg-vermelho text-papel-claro' : 'bg-tinta/8 text-tinta-media'
                  }`}
                >
                  {item.chamada}
                </span>
                <span>
                  <span className="fonte-display block text-lg leading-tight">{item.nome}</span>
                  <span className="mt-1 block text-sm leading-snug text-tinta-media">
                    {item.descricao}
                  </span>
                </span>
              </button>
            )
          })}
        </div>

        {modo === 'tema' && (
          <fieldset className="mt-6 surgir">
            <legend className="fonte-mono text-[0.68rem] uppercase tracking-[0.2em] text-tinta-fraca">
              Assunto do treino
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {TEMAS.map((item) => {
                const ativo = item.id === tema
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onTema(item.id)}
                    aria-pressed={ativo}
                    className={`border px-3 py-2 text-sm transition-colors ${
                      ativo
                        ? 'border-tinta bg-tinta text-papel-claro'
                        : 'border-tinta/20 text-tinta-media hover:border-tinta/60 hover:text-tinta'
                    }`}
                  >
                    {item.nome}
                  </button>
                )
              })}
            </div>
            <p className="mt-3 text-sm italic text-tinta-media">
              {TEMAS.find((item) => item.id === tema)?.resumo}
            </p>
          </fieldset>
        )}

        <div className="mt-8 border-t border-tinta/15 pt-6">
          <label
            htmlFor="apelido"
            className="fonte-mono block text-[0.68rem] uppercase tracking-[0.2em] text-tinta-fraca"
          >
            Como assinar no ranking
          </label>
          <input
            id="apelido"
            value={apelido}
            onChange={(evento) => onApelido(evento.target.value.slice(0, 24))}
            placeholder="seu apelido"
            autoComplete="off"
            className="fonte-display mt-2 w-full border-b border-tinta/30 bg-transparent pb-2 text-2xl outline-none transition-colors placeholder:text-tinta-fraca/60 focus:border-vermelho"
          />
        </div>

        <button
          type="button"
          onClick={onComecar}
          className="mt-8 flex w-full items-center justify-between gap-3 bg-tinta px-6 py-4 text-papel-claro transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
        >
          <span className="fonte-display text-xl">Começar a partida</span>
          <ArrowRight className="size-5" aria-hidden="true" />
        </button>
        <p className="fonte-mono mt-3 text-center text-[0.65rem] uppercase tracking-[0.14em] text-tinta-fraca">
          Responda pelo teclado: 1, 2, 3 · Enter avança
        </p>
      </section>
    </div>
  )
}
