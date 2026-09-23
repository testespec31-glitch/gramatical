import { Link } from '@tanstack/react-router'

export function Marca({ compacta = false }: { compacta?: boolean }) {
  return (
    <span className="flex items-baseline gap-2">
      <span
        aria-hidden="true"
        className={`fonte-display leading-none text-vermelho ${compacta ? 'text-4xl' : 'text-5xl'}`}
      >
        ,
      </span>
      <span
        className={`fonte-display font-semibold tracking-tight ${compacta ? 'text-xl' : 'text-2xl'}`}
      >
        Vírgula
      </span>
    </span>
  )
}

export function Cabecalho({ pagina }: { pagina: 'jogo' | 'ranking' }) {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-6 pb-2 sm:px-8">
      <Link to="/" className="transition-opacity hover:opacity-70">
        <Marca compacta />
      </Link>
      <nav className="fonte-mono flex items-center gap-1 text-[0.7rem] uppercase tracking-[0.18em]">
        <Link
          to="/"
          className={`rounded-full px-3 py-2 transition-colors ${
            pagina === 'jogo' ? 'bg-tinta text-papel-claro' : 'text-tinta-media hover:text-tinta'
          }`}
        >
          Jogar
        </Link>
        <Link
          to="/ranking"
          className={`rounded-full px-3 py-2 transition-colors ${
            pagina === 'ranking' ? 'bg-tinta text-papel-claro' : 'text-tinta-media hover:text-tinta'
          }`}
        >
          Ranking
        </Link>
      </nav>
    </header>
  )
}
