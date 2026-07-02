## Diagnosi
Ispezione DOM: il testo è spostato di ~50% a sinistra rispetto al centro della nuvola. Causa: Tailwind v4 implementa `-translate-x-1/2` tramite la proprietà CSS `translate:` invece di `transform:`, quindi non viene sovrascritta dallo `style={{ transform: 'translate(-50%,-50%) rotate(...)' }}` inline. Le due translate si sommano.

Inoltre l'asset PNG ha il corpo nuvola con centro verticale a ~53% (non 44%), quindi il testo va spostato leggermente più in basso.

## Fix in `src/routes/index.tsx` (solo `CloudShape`)

1. Rimuovere `left-1/2 -translate-x-1/2` dal plate (evita il doppio translate di Tailwind v4).
2. Posizionare il plate con `left: 50%; top: 53%` inline e centrarlo con `transform: translate(-50%, -50%) rotate(...)` inline (unica sorgente di transform).
3. Allineare `top` sul reale centro verticale del corpo nuvola (misurato: 0.53).
4. Ridurre leggermente la `width` interna a 58% e `height` a 40% per stare dentro la sagoma anche sulle nuvole ruotate.
5. Mantenere la contro-rotazione per il testo dritto.

## Verifica
- `code--execute_preview_javascript` per confermare che il centro del `<p>` coincida col centro del wrap (±5px) su tutte e 5 le nuvole.
- Screenshot Playwright desktop 1289 e mobile 390.

Nessuna altra modifica.