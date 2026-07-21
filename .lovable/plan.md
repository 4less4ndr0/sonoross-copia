Problema riscontrato: nelle card desktop in stato "piccolo" (SwapCard, image layer) viene mostrato solo il titolo (es. "chi"), non il sottotitolo. Per questo l'utente non vede la modifica richiesta.

Cosa fare:

1. Aggiornare il dato della card "chi" nel `CARDS` array: sottotitolo da "Le persone al centro." a "il team dietro a R.O.S.S.".
2. Nel componente `SwapCard`, all'interno dello strato immagine (stato non attivo / card piccola), aggiungere il rendering del `card.subtitle` sotto il titolo `h3`.
   - Font: DM Sans (coerente con il resto).
   - Colore: bianco/white-90 con text-shadow per leggibilità sulle immagini.
   - Dimensione: leggermente più piccola del titolo, in clamp, in modo che sia "in piccolo" come richiesto.
   - Posizione: sotto il titolo, sempre in basso a sinistra, rispettando lo spazio del bottone freccia a destra.
3. Mantenere invariato il rendering del sottotitolo nelle card mobile (`StackCard`), che già funziona.
4. Verificare che i vincoli esistenti restino rispettati: nessuna modifica a font degli occhi, posizionamento nuvole/card, border-radius, glass effect, struttura verticale e copy principale.

File coinvolto: `src/routes/index.tsx`.