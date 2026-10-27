import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Cabecalho } from '../components/Cabecalho'
import { ListaRanking } from '../components/ListaRanking'
import { buscarRanking } from '../server/ranking.functions'

export const Route = createFileRoute('/ranking')({
  loader: async () => ({ ranking: await buscarRanking({ data: { limite: 30 } }) }),
  component: Pagina,
})

function Pagina() {
  const { ranking } = Route.useLoaderData()

  return (
    <main className="min-h-screen">
      <Cabecalho pagina="ranking" />
      <div className="mx-auto w-full max-w-3xl px-5 pb-20 pt-6 sm:px-8 lg:pt-12">
        <p className="fonte-mono text-[0.7rem] uppercase tracking-[0.28em] text-vermelho">
          Ranking geral
        </p>
        <h1 className="fonte-display mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
          Quem revisa melhor
        </h1>
        <p className="mt-4 max-w-lg text-tinta-media">
          As trinta maiores pontuações registradas até agora, somando revisão rápida, maratona,
          treinos por tema e caça-palavras.
        </p>

        <div className="folha folha-margem relative mt-8 p-6 pl-14 sm:p-9 sm:pl-20">
          <ListaRanking linhas={ranking} />
        </div>

        <Link
          to="/"
          className="mt-8 flex items-center justify-between gap-3 bg-tinta px-6 py-4 text-papel-claro transition-transform duration-200 hover:-translate-y-0.5"
        >
          <span className="fonte-display text-xl">Jogar uma partida</span>
          <ArrowRight className="size-5" aria-hidden="true" />
        </Link>
      </div>
    </main>
  )
}
