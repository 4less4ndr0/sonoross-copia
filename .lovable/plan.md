Spostare l’intero blocco header più in alto per far salire anche il carosello di card e rendere la pagina più compatta, mantenendo le proporzioni tra occhi, headline, form e griglia.

### Modifiche previste

1. **Ridurre il padding inferiore dell’hero**
   - Attuale: `pb-[18vh]` mobile / `pb-[20vh]` desktop.
   - Nuovo: ~`pb-[10vh]` mobile / ~`pb-[12vh]` desktop.
   - Lascia più spazio visibile sotto il form senza comprimere gli elementi.

2. **Ridurre il margine superiore del contenuto hero**
   - Attuale: `mt-[5vh]` mobile / `mt-[7vh]` desktop sul wrapper interno.
   - Nuovo: ~`mt-[2vh]` mobile / ~`mt-[4vh]` desktop.
   - Sposta occhi, headline e form verso l’alto mantenendo il centro visivo.

3. **Tirare su il carosello/card**
   - Attuale: `-mt-[12vh]` mobile / `-mt-[16vh]` desktop.
   - Nuovo: ~`-mt-[18vh]` mobile / ~`-mt-[22vh]` desktop.
   - Le card salgono di conseguenza, coprendo meglio la parte bassa dello schermo.

4. **Mantenere le proporzioni**
   - Margine tra occhi e headline, tra headline e form, e tra form e card scalati in modo uniforme.
   - Nessuna modifica a dimensioni font, occhi, bordi, colori o logica di interazione.

5. **Verifica**
   - Controllare in preview desktop e mobile che non ci siano sovrapposizioni tra form e card.
   - Confermare che il carosello sia visibile senza scroll iniziale su viewport comuni.

### File coinvolto
- `src/routes/index.tsx` (hero section + cards section)