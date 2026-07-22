## Problema
Il codice del bottone è già aggiornato (sfondo `rgba(239,159,39,0.30)`, bordo terracotta, inner glow, backdrop-blur), ma il preview mostra ancora la versione precedente. È un problema di HMR/cache, non di codice.

## Piano
1. Flush del gate HMR della dev sandbox (`POST /__hmr_flush`) per forzare il re-transform del modulo `src/routes/index.tsx`.
2. Verificare via preview che il tondo della freccia mostri ora il terracotta chiaro glass.
3. Se dopo il flush l'aspetto è ancora troppo neutro sul cream, alzare leggermente opacità sfondo (0.30 → 0.38) e bordo (0.45 → 0.55) per garantire che la tinta terracotta sia visibile.

Nessuna modifica ad altri elementi (halo, form, card).