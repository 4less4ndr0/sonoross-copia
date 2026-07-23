## Obiettivo
Trasformare la griglia 2×2 desktop delle 4 card (Cosa, Chi, Manifesto, Perché) in un carosello orizzontale che scorre in autoplay a velocità moderata, si ferma quando il mouse va in hover sul carosello, e mantiene l'effetto attuale di hover sulla singola card (leggero scale + halo terracotta).

## Modifiche

### 1. `src/routes/index.tsx` — solo layout desktop
- Sostituire la griglia `grid-cols-2` desktop con un carosello orizzontale a larghezza piena viewport.
- Duplicare l'array delle card (`[...CARDS, ...CARDS]`) per ottenere uno scorrimento infinito seamless.
- Track interno che trasla con `animation: marquee linear infinite` (durata ~40s, regolabile).
- Ogni card mantiene larghezza fissa coerente (es. ~32vw, min 380px, max 520px) e altezza attuale, con gap tra le card.
- Su hover del contenitore carosello → `animation-play-state: paused` (pausa dolce, non scatto).
- La singola `StackCard` mantiene esattamente l'attuale hover (scale + halo terracotta soft) e il click apre la stessa `CardModal`.
- Mobile/tablet: nessuna modifica, resta lo stack verticale attuale.

### 2. `src/styles.css`
- Aggiungere keyframes `marquee` (`translateX(0)` → `translateX(-50%)`) e una utility `.carousel-track` con `animation-play-state: running`, che diventa `paused` quando il contenitore ha `:hover`.

## Fuori scope
- Testi, immagini, modale, form email, occhi, hero, header.
- Layout mobile/tablet.
- Frecce/dots di navigazione manuale (autoplay + pausa on hover, come richiesto).

## Verifica
- Build TS ok.
- Preview desktop: le 4 card scorrono orizzontalmente in loop continuo senza salti; hover sul carosello mette in pausa; hover sulla singola card mostra scale + halo terracotta; click apre la modale corretta.
- Preview mobile: layout invariato.
