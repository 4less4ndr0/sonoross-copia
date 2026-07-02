Il problema: le nuvole sono un render 3D fotorealistico con drop-shadow marcato, mentre il resto della pagina è flat, minimal e serif — il testo galleggia sopra la nuvola come un adesivo. Sostituisco l'asset PNG con una nuvola SVG flat, disegnata in-code, in cui il testo vive dentro la forma anziché sopra.

## Modifiche a `src/routes/index.tsx`

- Rimuovo l'import di `cloudAsset` e il tag `<img>`.
- Creo un componente `CloudSVG` inline: forma nuvola composta da 5–6 cerchi sovrapposti uniti in un unico `<path>` SVG (viewBox 200x110), riempimento bianco caldo `#fdfbf6` (leggermente più chiaro del background `#faf7f2`), bordo sottile `stroke="#ede7db"` da 1.5px, nessun drop-shadow — solo un `filter: drop-shadow(0 2px 0 rgba(0,0,0,0.02))` appena percepibile per non staccarsi dal fondo.
- Il testo (Instrument Serif, `text-neutral-700`) va sovrapposto con `absolute inset-0 flex items-center justify-center px-[14%]`, ma dato che la forma flat ha una zona interna più regolare, il testo entra pulito senza rotazione compensativa.
- Aggiungo una leggerissima variazione di forma tra le nuvole: 2–3 varianti di path per non renderle identiche (piccoli tweak sulle "gobbe").
- Mantengo posizioni, `float-*` animation, `widthClass` e `rotate` attuali. Il `rotate` viene applicato all'intero blocco (SVG + testo insieme) così il testo segue la nuvola invece di essere contro-ruotato.
- Tipografia testo: `leading-[1.15]`, `text-[color:#4a4438]` (marrone caldo desaturato, coerente con il tono cream del bg), size `clamp(0.72rem, 1.55vw, 1rem)`.

Risultato: nuvole flat, di tono avorio come il background, con contorno appena visibile e testo che sembra scritto dentro — stesso linguaggio visivo della headline serif e del form minimal.

Nessuna modifica a orizzonte, occhi, headline, form o `styles.css`.
