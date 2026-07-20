## Problema

L'alone sage light dietro la card non è visibile perché ha `-z-10`: viene spinto dietro allo sfondo cream della sezione (che è opaco), quindi risulta completamente coperto.

## Fix

In `src/routes/index.tsx` (sezione narrative, ~riga 429):

1. Rimuovere `-z-10` dal div dell'alone e togliere `z-10` dalla card. L'ordine DOM è già corretto (alone prima, card dopo), quindi la card resta sopra naturalmente senza bisogno di z-index negativi che finiscono sotto lo sfondo cream.
2. Rendere l'alone più percepibile su cream: aumentare leggermente l'opacità (da 0.35 a ~0.7) e ampliare l'area (`-inset-16` invece di `-inset-8`), mantenendo blur 60px e colore #e8f5d3.

Nessuna altra modifica: font, highlighter, griglia, nuvole, occhi, CTA, sfondo cream restano identici.