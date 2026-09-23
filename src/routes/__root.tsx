import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import '../styles.css'

const nomeDoJogo = 'Vírgula — jogo gramatical'
const descricao =
  'Jogo de gramática da língua portuguesa: crase, concordância, regência, pontuação e mais, em partidas cronometradas com explicação a cada resposta.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: nomeDoJogo },
      { name: 'description', content: descricao },
      { name: 'theme-color', content: '#efe7d6' },
      { property: 'og:title', content: nomeDoJogo },
      { property: 'og:description', content: descricao },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'pt_BR' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,300..900,0..100,0..1;1,9..144,300..900,0..100,0..1&family=Karla:ital,wght@0,300..800;1,300..700&family=IBM+Plex+Mono:wght@400;500;600&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <div className="grao" aria-hidden="true" />
        <Scripts />
      </body>
    </html>
  )
}
