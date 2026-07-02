## Obiettivo
Mantenere l'asset 3D attuale della nuvola ma far sì che il testo sembri davvero "dentro" la nuvola, non appoggiato sopra ai rilievi.

## Modifiche in `src/routes/index.tsx`

1. **Area testo interna definita**
   - Il testo non occuperà più tutta la bounding box della nuvola: verrà racchiuso in un contenitore centrato con ~55% larghezza e ~40% altezza della nuvola, posizionato leggermente sopra il centro geometrico (top ~44%) dove l'asset ha la superficie più piatta.
   - `max-width` in `ch` per forzare 2-3 righe corte invece di una riga lunga che sfora sui bump laterali.

2. **Tipografia**
   - Font size ridotto (`clamp(0.7rem, 0.95vw, 1rem)`) e `line-height: 1.15`.
   - `letter-spacing: -0.01em`, `text-wrap: balance` per righe visivamente equilibrate.
   - Mantengo Instrument Serif, colore `#1a1a1a`.

3. **Leggibilità sui rilievi 3D**
   - Aggiungo un `text-shadow` morbido bianco (`0 1px 0 rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.6)`) per staccare le lettere dalle ombre grigie dell'asset senza creare un badge visibile.
   - Nessun background/box dietro al testo: resta l'effetto "scritto sulla nuvola".

4. **Spezzatura frasi**
   - Le 5 frasi verranno pre-spezzate con `\n` (renderizzato via `white-space: pre-line`) nei punti naturali, così ogni nuvola mostra 2 righe bilanciate invece che affidarsi al wrap automatico.

5. **Dimensioni nuvole**
   - Leggero aumento della width su desktop (da `sm:w-[13vw]` a `sm:w-[16vw]`) per dare al testo più spazio interno senza toccare le posizioni già approvate.

## Verifica
- Screenshot Playwright a desktop (1280) e mobile (390) per confermare che il testo sia centrato sul "cuore" della nuvola e leggibile.
- Build check.

Nessun cambiamento a headline, form email, orizzonte, occhi o animazioni floating.