## Problema
Al primo hover su una card del carosello desktop c'è uno scatto orizzontale che sposta la card sotto il mouse e a volte fa cliccare la card sbagliata. La causa è che `animation-play-state: paused` in combinazione con `hover:-translate-y-1` sulla card e `group-hover:scale-105` sull'immagine produce un piccolo salto di layout / arrotondamento subpixel al momento della pausa dell'animazione CSS.

## Soluzione
Sostituire l'animazione CSS `marquee` con uno scroll pilotato in JS (`requestAnimationFrame`) sulla track del carosello. In questo modo la pausa è esattamente il frame corrente, senza salti.

### Modifiche in `src/routes/index.tsx`
- Estrarre il carosello desktop in un piccolo componente `Carousel` interno con:
  - `useRef` sulla track.
  - `useRef` per la posizione X corrente e per lo stato "paused".
  - `useEffect` che lancia un loop `requestAnimationFrame`: incrementa X di `speed * dt` (velocità coerente con gli attuali ~40s per giro), applica `transform: translate3d(-X, 0, 0)` alla track, e quando `X >= trackWidth / 2` sottrae `trackWidth / 2` per loop seamless.
  - `onMouseEnter` / `onMouseLeave` sul contenitore che flippano il flag paused (nessun cambio di transform → nessuno scatto).
- Rimuovere `animation: marquee ...` inline e la classe `carousel-track` che aggancia `animation-play-state`.
- Rispettare `prefers-reduced-motion`: se attivo, non far partire il loop.

### Modifiche in `src/styles.css`
- Rimuovere le regole `@keyframes marquee` e `.carousel-wrapper:hover .carousel-track { animation-play-state: paused }` ora non più usate.

## Fuori scope
- Layout mobile, StackCard, halo, hero, modale, form email.
- Design/spaziatura del carosello (restano invariati).

## Verifica
- Preview desktop: entrando col mouse su una card, il carosello si ferma esattamente sotto al cursore, senza scatti orizzontali; il click apre la card corretta; uscendo, riparte fluido nello stesso punto.
- Preview mobile: layout invariato.
- Build TS ok.
