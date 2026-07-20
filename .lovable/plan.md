## Problema

Quando una card viene aperta (click → si sposta al centro sostituendo il manifesto), le altre 3 card laterali vengono attenuate: `opacity: 0.55` e `z-index: 1`, con anche l'alone terracotta dietro portato a 0.35. Risultato: solo la card attiva e la manifesto rimpicciolita risultano ben leggibili, le altre 3 quasi spariscono.

L'utente vuole che, con una card aperta, **anche le altre 3 restino ben visibili** nei loro slot laterali.

## Modifica a `src/routes/index.tsx` → `CloudShape`

Rimuovere il "dimming" delle card inattive quando `anyActive`:

- Card non attiva, non in hover: `opacity: 1` (invece di `anyActive ? 0.55 : 1`).
- Card non attiva, non in hover: `zIndex: 5` (invece di `anyActive ? 1 : 5`). Resta comunque sotto la card attiva (z=30) e sotto la card in hover (z=50).
- Alone terracotta dietro (`background rgba(239,159,39,0.45)`): riportare l'opacità della card non-attiva a 0.8 (invece di `anyActive ? 0.35 : 0.8`), lasciando 1 per attiva/hover.

Nessun altro cambiamento: click/swap, hover-pop (z=50), posizioni, font, manifesto card e layout responsive restano invariati.
