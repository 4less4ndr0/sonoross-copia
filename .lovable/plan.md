## Modifica sottotitoli card

Aggiornare i sottotitoli (campo `subtitle`) delle card `CARDS` in `src/routes/index.tsx`:

- **cosa**: da `"Un compagno, non un sensore."` → `"il cuore di R.O.S.S."`
- **perché**: da `"Rimettere al centro."` → `"perché lo stiamo facendo"`

La card `chi` resta invariata (`"Le persone al centro."`).

### Dettagli tecnici
- Il testo viene già renderizzato automaticamente dai componenti `SwapCard` (desktop) e `StackCard` (mobile) attraverso il campo `subtitle` dell'oggetto `Card`.
- Non sono necessarie modifiche a stili, animazioni, font o logica di swap/modal.
- Verifica: controllare che in desktop e mobile i sottotitoli delle card "cosa" e "perché" appaiano con il nuovo testo, sia in stato chiuso che aperto.