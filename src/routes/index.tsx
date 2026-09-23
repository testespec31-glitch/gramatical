import { createFileRoute } from '@tanstack/react-router'
import { Cabecalho } from '../components/Cabecalho'
import { Jogo } from '../components/Jogo'
import { buscarRanking } from '../server/ranking.functions'

export const Route = createFileRoute('/')({
  loader: async () => ({ ranking: await buscarRanking({ data: { limite: 10 } }) }),
  component: Pagina,
})

function Pagina() {
  const { ranking } = Route.useLoaderData()
  return (
    <main className="min-h-screen">
      <Cabecalho pagina="jogo" />
      <Jogo rankingInicial={ranking} />
    </main>
  )
}
