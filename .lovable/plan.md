## Obiettivo

Quando l'utente passa il mouse su una delle 4 card laterali ("chi/cosa/come/perché"), la card in hover deve venire portata **davanti** a tutto il resto — inclusa la card del manifesto e la card eventualmente "aperta" (attiva dopo il click) — così da essere completamente leggibile senza doverci cliccare.

## Comportamento attuale

- Stato di riposo: card dietro alla manifesto (`z-index: 5`), solo un lembo sporge.
- Hover a riposo: `hover:scale-[1.04] hover:z-20` — sale a z=20, ma la manifesto card è `z-10`, quindi già ora dovrebbe stare sopra la manifesto… tranne che quando c'è una card attiva (`anyActive`) l'hover viene disabilitato e lo z-index scende a `1` con opacità 0.55.
- Card attiva (click): `z-index: 30`.

Problemi:
1. Quando una card è già aperta, le altre 3 non rispondono più all'hover (classe hover rimossa) e restano sotto → l'utente non può "sbirciare" un'altra card senza prima chiudere quella attiva.
2. L'hover z=20 non basta a coprire la card attiva (z=30).

## Modifiche a `src/routes/index.tsx` → `CloudShape`

1. Aggiungere stato locale `isHover` nella card (`onMouseEnter`/`onMouseLeave`, più `onFocus`/`onBlur` per accessibilità tastiera).
2. Rimuovere l'hover via classe Tailwind e gestirlo nello style oggetto, così funziona anche quando `anyActive` è true:
   - Se `isHover && !isActive`: `zIndex: 50` (sopra a tutto, incluse le card attive a 30), `opacity: 1` (annulla il dimming da `anyActive`), `transform: rotate(0deg) scale(1.06)` per un leggero "pop", alone terracotta a piena intensità.
   - Mantenere posizione del slot (top/left/right/width) invariata: la card resta ancorata al bordo, non salta al centro. Sporgerà semplicemente sopra la manifesto card e sopra la card attiva.
3. La card **attiva** (post-click) mantiene il comportamento attuale (va al centro, z=30). Se si passa in hover su un'altra card mentre una è attiva, quella in hover appare sopra (z=50) come "peek", senza chiudere l'attiva.
4. La transizione già presente (`TRANSITION` + 500ms interna) copre `transform`/`opacity`, quindi il pop è animato senza altre modifiche.

## Fuori scopo

- Nessun cambio al click/swap con la card manifesto.
- Nessun cambio a posizioni, font, contenuti, glow della manifesto, layout responsive.
- Nessun cambio al resto della pagina.
