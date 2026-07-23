## Problema

Su desktop (`lg`) il gap tra form email e carosello è troppo grande perché:
- L'hero è `h-screen` (100vh) con contenuto ancorato in alto (`justify-start` + `pt-[10vh]`)
- Il contenuto (occhi + headline + form) occupa circa 55–60vh
- La sezione card ora ha `lg:mt-0`, quindi restano ~40vh di vuoto sotto al form prima delle card

Il fix precedente ha risolto l'overlap ma è andato all'estremo opposto.

## Fix definitivo

In `src/routes/index.tsx`, sezione card (riga 913): sostituire `lg:mt-0 … lg:pt-8` con un margine negativo moderato calibrato sull'altezza reale del contenuto hero.

- `lg:-mt-[28vh]` — tira su il carosello di ~28vh, lasciando ~8–10vh di respiro sotto il form
- `lg:pt-4` — padding top ridotto per non gonfiare di nuovo lo spazio

Nessun altra modifica: mobile (`-mt-[42vh]`), sm (`-mt-[34vh]`) e md (`-mt-[44vh]`) restano invariati perché già approvati nei turni precedenti.

## Verifica

Screenshot Playwright a 1440×900 per confermare che:
1. Il titolo/form non tocchi le card (no overlap)
2. Il gap sia visivamente equilibrato (~1 riga di respiro)
