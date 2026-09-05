# sonoross-copia

Copia pubblica della landing page di **R.O.S.S.** — un compagno conversazionale
pensato per chi vive solo in età avanzata: non un sensore che sorveglia, ma una
relazione che tiene viva la voglia di raccontarsi.

**Landing online:** https://4less4ndr0.github.io/sonoross-copia/

## Come si lavora qui

`main` è protetto: niente push diretti, si entra solo via pull request, e vale
per tutti — proprietario compreso. Ognuno lavora sul proprio branch:

| Persona | Branch |
| --- | --- |
| Alessandro | `Alessandro/lavoro` |
| Federico | `Federico/lavoro` |

Il giro è sempre lo stesso: si committa sul proprio branch, la pull request
verso `main` la apre Claude a fine lavoro, il merge lo fa una persona a mano.
Il merge è anche il momento in cui il sito va online, perché Pages pubblica
solo da `main`.

Le convenzioni per le sessioni Claude stanno in [`CLAUDE.md`](CLAUDE.md).

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

Nota: sulle macchine del team non c'è Node installato, quindi in pratica le
build si verificano in CI.

## Deploy

Ogni push su `main` fa partire [`.github/workflows/pages.yml`](.github/workflows/pages.yml):
builda la SPA e la pubblica su GitHub Pages. Il path base è `/sonoross-copia/`
e si cambia con la variabile d'ambiente `PAGES_BASE`.

Le modifiche sui branch di lavoro **non** sono online: si vedono solo dopo il
merge su `main`.

## In cosa differisce dal progetto originale

Questa è una copia autonoma, non un fork, e ha alcune differenze volute rispetto
al progetto da cui nasce:

- **Il form email è solo grafico.** Non è compilabile e non invia nulla: non ci
  sono né `<input>` né `<button>`. GitHub Pages serve file statici, quindi non
  può eseguire la server function che raccoglieva le iscrizioni.
- **Le immagini sono file veri nel repo.** Nell'originale erano puntatori a un
  CDN esterno, risolvibili solo dentro quell'ambiente. Qui stanno in
  `src/assets`, ricompresse da 6,2 MB a 1,4 MB complessivi.
- **Niente cursore personalizzato.** La freccia disegnata che sostituiva il
  puntatore è stata rimossa: si usa il cursore nativo del browser.
- **La cronologia è stata riscritta** per togliere identificativi e URL di
  servizio che non avevano motivo di stare in un repo pubblico. Per questo la
  copia non è riallineabile con l'originale con un semplice push: servirebbe un
  nuovo intervento sulla storia.
