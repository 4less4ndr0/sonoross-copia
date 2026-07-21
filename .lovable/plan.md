## Fix: transizione fluida sulla apertura/chiusura card in mobile

### Diagnosi
Il modale mobile (`CardModal`, riga 421) monta/smonta immediatamente al click su una `StackCard`. L'overlay usa `animate-fade-in` (0.3s solo entrata), il pannello interno non ha animazione, e alla chiusura sparisce di colpo perché il componente viene rimosso subito da `activeCardData && <CardModal ... />`.

### Modifiche (solo `src/routes/index.tsx`, mobile only)

1. **Stato transitorio nel modale**
   - `CardModal` gestisce internamente `isVisible` (default `false`, diventa `true` al primo mount con `requestAnimationFrame`).
   - Aggiungere prop `isOpen` esterno: quando diventa `false`, il modale parte in `isVisible=false` e chiama `onClose` solo dopo la durata dell'animazione (~300ms) via `setTimeout`.

2. **Handler di chiusura ritardato**
   - Nuovo stato locale `isClosing`. `handleClose` imposta `isClosing=true` → dopo 300ms chiama `onClose` del parent (che azzera `activeCard`). Click su overlay, tasto ×, tasto Escape passano tutti da `handleClose`.

3. **Transizioni CSS sui due layer del modale**
   - Overlay (`fixed inset-0`): `opacity` + `backdrop-filter` con `transition: opacity 280ms ease, backdrop-filter 280ms ease`. Rimuovere `animate-fade-in`. `opacity: isVisible && !isClosing ? 1 : 0`.
   - Pannello card: `transition: transform 320ms cubic-bezier(0.22,1,0.36,1), opacity 260ms ease`. Da `translateY(24px) scale(0.96)` + `opacity 0` a `translateY(0) scale(1)` + `opacity 1`. Alla chiusura torna sotto.

4. **Feedback al tocco sulla `StackCard`**
   - Aggiungere `active:scale-[0.98] transition-transform duration-200` alla `StackCard` per un tap responsivo prima dell'apertura del modale.

5. **Cleanup Escape / keydown**
   - L'`useEffect` in `Index` che chiude su Escape continua a chiamare `setActiveCard(null)` — passa comunque dal nuovo flusso perché il modale rileva il cambio `isOpen → false` e anima l'uscita. Quindi: cambio API di `CardModal` da "unmount immediato" a "controllo con `isOpen`", e in `Index` renderizzare sempre `<CardModal>` (montato) quando `activeCardData` è mai stato aperto? Alternativa più pulita:
     - `Index` mantiene `activeCard` + un nuovo `pendingCloseCard` (o mantiene il dato durante l'uscita). Concretamente: `activeCard` viene azzerato solo dopo il fade-out. Per farlo, `CardModal` accetta `card` + `isOpen` + `onClose`; `Index` mette `isOpen = activeCard !== null` e memorizza `lastCard` per continuare a mostrare la card durante l'uscita (`const displayed = activeCardData ?? lastCardRef.current`).

### Vincoli
- Nessun tocco a: desktop swap system, hero, occhi, form email, sezione finale, `MANIFESTO_PARAGRAPHS`, `CARDS`, immagini, `StackCard` layout (solo aggiunta `active:` per feedback tap).
- Nessuna libreria nuova: solo CSS transitions + timer.

### Risultato atteso
Su mobile: tap su una card → overlay sfuma in ~280ms e il pannello sale da sotto con leggero scale-up. Tap su ×, overlay o Escape → pannello scende e overlay sfuma, poi il modale viene smontato. Nessuno "scatto".
