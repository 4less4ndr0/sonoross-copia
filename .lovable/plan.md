## Problema

Su desktop l'hero usa `min-h-screen` e il carosello viene renderizzato subito sotto senza spaziatura. Quando l'utente zooma o cambia dimensioni, l'header (occhi + titolo + form) mantiene la sua altezza in `rem` mentre `min-h-screen` è in `vh`: cambiando lo zoom del browser il contenuto interno cresce ma il viewport resta uguale, quindi form e carosello si avvicinano fino a sovrapporsi. Su mobile/tablet lo stesso problema è mascherato dai margini negativi `-mt-[Xvh]` che sono comunque fragili.

Serve un fix strutturale che garantisca che il carosello stia **sempre** sotto l'hero, indipendentemente da zoom, aspect ratio o altezza del contenuto.

## Fix

**File:** `src/routes/index.tsx`

**1. Hero (riga 881)** — sostituire `min-h-screen lg:min-h-0` con solo `min-h-screen` su tutti i breakpoint. L'hero deve sempre occupare almeno il viewport, ma crescere se il contenuto lo richiede (evita che il form venga schiacciato allo zoom alto).

**2. Carosello (riga 913)** — rimuovere tutti i margini negativi che causano l'overlap:
- `-mt-[42vh] sm:-mt-[34vh] md:-mt-[44vh] lg:mt-0` → `mt-0` su tutti i breakpoint
- Aggiungere un padding-top coerente in `rem` (non `vh`): `pt-8 sm:pt-12 lg:pt-16`

**3. Hero inner (riga 882)** — usare `justify-center` invece di `justify-start` così il contenuto è verticalmente bilanciato dentro il `min-h-screen`, e semplificare il padding verticale in `rem`: `py-16 sm:py-20 lg:py-24` (rimuovere i valori `vh`).

## Risultato

- L'hero occupa sempre ≥ 100vh, il carosello inizia sempre sotto — zero overlap possibile a qualsiasi zoom o aspect ratio.
- Il layout diventa deterministico: dipende dal contenuto e dal viewport, non da margini negativi calibrati a occhio.
- Spacing verticale in `rem` = costante percepito dall'utente indipendentemente dallo zoom.

## Verifica

Screenshot Playwright a 1440×900, 1920×1080, 2560×1080 e con zoom browser al 75%, 100%, 125%, 150% per confermare che form e carosello non si sovrappongano mai.