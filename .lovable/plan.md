## Problema
Al momento layout, bubble, headline, orizzonte e occhi hanno dimensioni/posizioni fisse pensate per desktop. Su mobile (390px) le bubble finiscono sopra la headline, il titolo va a capo male, e le proporzioni si rompono.

## Fix responsive in `src/routes/index.tsx` (solo presentazione, nessuna logica cambiata)

### 1. Headline
- Scala fluida con `clamp()`: `fontSize: clamp(2rem, 7vw, 4.5rem)` invece di `text-4xl md:text-6xl`.
- `leading-[1.05]`, padding orizzontale più stretto su mobile.

### 2. Form email
- `max-w-md` resta, ma su mobile `w-full` con margine laterale (`px-6` sul container già presente).
- Ridurre `mt-8` a `mt-6 sm:mt-8`.

### 3. Bubbles — riposizionate per fascia viewport
Attualmente sono in `%` ma con `width` in px fissi → su mobile occupano metà schermo.
- Rendere `width`/`height` proporzionali al viewport: `width: clamp(110px, 22vw, 200px)`, altezza proporzionale.
- Riposizionare le 5 bubble in modo che nessuna si sovrapponga alla zona centrale headline+form. Nuove posizioni approssimative:
  - top 4% left 2%
  - top 6% right 4%
  - top 20% left 4%
  - top 18% right 2%
  - top 32% left 40% (piccola, sopra headline)
- Su mobile la zona centrale (y 35%–65%) resta libera. Le bubble stanno solo nella fascia alta (0–34%).

### 4. Contenuto centrale
- Cambiare `pb-[38vh]` (fisso) in `pb-[32vh] sm:pb-[36vh]` per lasciare più aria all'orizzonte su mobile.

### 5. Orizzonte
- Altezza fluida: `height: clamp(220px, 34vh, 380px)`.
- Larghezza `min(160vw, 1400px)` per non esplodere su desktop ultrawide.

### 6. Occhi pixel
- `PIXEL` fisso a 7px non scala. Passare a size fluida: calcolare `pixelSize = clamp(4, vmin*0.9%, 8)` via `useEffect` + resize listener, oppure — più semplice — usare `transform: scale(var(--eye-scale))` sull'intero grid dove `--eye-scale = clamp(0.7, 1vw + 0.4, 1.2)` via CSS.
- Distanza occhi: mantenere 42%/58% ma su mobile stringere leggermente a 44%/56% con media query inline.
- Verticale: `top: 82%` su mobile, `78%` da `sm:` in su, così restano nella zona colorata dell'orizzonte.

## Verifica
Dopo l'implementazione, aprire Playwright a 390×800, 768×1024 e 1440×900, screenshot di ognuno, e confermare che:
- headline non è coperta da bubble
- form è centrato e leggibile
- occhi sono dentro l'orizzonte, non tagliati
- nessuno scroll

Nessuna modifica a logica, animazioni, o dipendenze.