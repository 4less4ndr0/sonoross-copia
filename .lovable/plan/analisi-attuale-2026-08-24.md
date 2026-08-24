## Analisi attuale

La sezione card in `src/routes/index.tsx` ha due modalità:

- **Mobile**: 4 card impilate verticalmente (`StackCard` in colonna).
- **Desktop**: carosello orizzontale auto-scrollante (`DesktopCarousel`) che duplica le card per il loop infinito.

Entrambe aprono lo stesso `CardModal` al click/tap.

## Obiettivo

Rimuovere il carosello orizzontale e mostrare **4 card statiche in griglia 2×2**.

## Piano di modifica

**File:** `src/routes/index.tsx`

1. **Rimuovere `DesktopCarousel`**
   - Eliminare la funzione componente `DesktopCarousel`.
   - Rimuovere il blocco `{/* DESKTOP: horizontal auto-scrolling carousel */}` dalla sezione card.

2. **Sostituire con griglia 2×2 responsive**
   - Mantenere lo stack verticale su mobile (`sm:hidden`).
   - Aggiungere un wrapper griglia visibile da `sm` in su:
     ```
     grid grid-cols-2 gap-5 lg:gap-6 max-w-5xl mx-auto
     ```
   - Renderizzare le 4 `CARDS` come elementi della griglia.

3. **Mantenere interattività**
   - Ogni card della griglia continuerà a usare `StackCard` con `onOpen={() => setActiveCard(i)}`.
   - Il `CardModal` esistente rimane invariato.

4. **Ridurre gap superfluo**
   - Rimuovere eventuali spaziature legate al carosello (padding verticale eccessivo) per bilanciare la nuova griglia compatta.

## Verifica

- Screenshot desktop: 4 card visibili in griglia 2×2, nessun auto-scroll.
- Screenshot mobile: stack verticale invariato.
- Click su una card apre il modal corretto.
