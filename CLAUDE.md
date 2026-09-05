# Convenzioni di questo repo

## Branch

`main` è protetto: niente push diretti, si entra solo via pull request. Vale per
tutti, proprietario compreso.

Ci lavorano due persone, ognuna sul proprio branch:

| Persona | Branch |
| --- | --- |
| Alessandro | `Alessandro/lavoro` |
| Federico | `Federico/lavoro` |

**Regola per le sessioni Claude:** ogni modifica va committata sul branch della
persona che sta usando la sessione — mai su `main`, nemmeno quando la sessione
parte da `main`. Il branch si ricava dall'account GitHub autenticato
(`gh api user --jq .login`): `4less4ndr0` → `Alessandro/lavoro`,
`federicosassu-ship-it` → `Federico/lavoro`. Se l'account non è nessuno dei due,
chiedere su quale branch lavorare invece di indovinare.

Il merge su `main` lo fanno le persone a mano, tramite PR. Claude non lo fa.

## Deploy

GitHub Pages pubblica <https://4less4ndr0.github.io/sonoross-copia/> tramite
`.github/workflows/pages.yml`, che gira **solo su `main`**. Il sito quindi
cambia solo dopo un merge: le modifiche sui branch di lavoro non sono online.

## Build

Nessun Node/bun sulle macchine di sviluppo: le build si verificano in CI, non in
locale. Vedi il README per gli entry point (`src/main.tsx` per la SPA statica,
`src/routes/` per l'app TanStack Start).
