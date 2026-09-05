# sonoross-copia

Copia pubblica della landing page di **R.O.S.S.** — un compagno conversazionale
pensato per chi vive solo in età avanzata: non un sensore che sorveglia, ma una
relazione che tiene viva la voglia di raccontarsi.

**Landing online:** https://4less4ndr0.github.io/sonoross-copia/

## Stack

React 19 + TypeScript, Tailwind CSS v4, componenti shadcn/ui, animazioni con `motion`.

Il contenuto della pagina sta tutto in [`src/pages/landing.tsx`](src/pages/landing.tsx)
e viene montato in due modi:

| Entry | Cosa produce | Comando |
| --- | --- | --- |
| `src/routes/index.tsx` | app TanStack Start completa, con SSR | `bun run build` |
| `src/main.tsx` | SPA statica client-only, quella pubblicata su Pages | `bun run build:pages` |

## Sviluppo locale

```sh
bun install
bun run dev
```

Per provare la build statica come la vede GitHub Pages:

```sh
PAGES_BASE=/ bun run build:pages
bunx vite preview --outDir dist-pages
```

## Deploy

Ogni push su `main` fa partire [`.github/workflows/pages.yml`](.github/workflows/pages.yml):
builda la SPA e la pubblica su GitHub Pages. Il path base è `/sonoross-copia/`
e si cambia con la variabile d'ambiente `PAGES_BASE`.

## Nota sul form email

Il campo email nella hero è **solo grafico**: non è compilabile e non invia
nulla. GitHub Pages serve file statici, quindi non può eseguire la server
function che raccoglieva le iscrizioni.
