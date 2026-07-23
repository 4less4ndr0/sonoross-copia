## Problema

L'hero è `min-h-screen` con contenuto `justify-center`: il form finisce a metà viewport, quindi tra il form e l'inizio del carosello resta ~40vh di vuoto. In più il carosello aggiunge `pt-8 sm:pt-12 lg:pt-16`. Risultato: gap troppo grande, soprattutto desktop.

## Fix

**File:** `src/routes/index.tsx`

1. **Hero (riga 881)** — ridurre l'altezza minima così il form non è più spinto a metà viewport:
   - `min-h-screen` → `min-h-[70vh] sm:min-h-[75vh] lg:min-h-[80vh]`

2. **Hero inner (riga 882)** — mantenere `justify-center` ma ridurre il padding verticale inferiore per accorciare la parte sotto il form:
   - `py-16 sm:py-20 lg:py-24` → `pt-16 pb-8 sm:pt-20 sm:pb-10 lg:pt-24 lg:pb-12`

3. **Carosello (riga 913)** — dimezzare il padding-top:
   - `pt-8 sm:pt-12 lg:pt-16` → `pt-4 sm:pt-6 lg:pt-8`

## Risultato

La distanza form ↔ carosello si riduce di circa metà su tutti i breakpoint mantenendo il layout deterministico in `rem`/`vh` (nessun margine negativo, nessun overlap possibile).

## Verifica

Screenshot Playwright a 1440×900 e 390×844 per confermare che il gap sia dimezzato e non ci sia overlap.