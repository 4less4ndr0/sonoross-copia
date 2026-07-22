## Obiettivo
Modificare il colore della griglia a sfondo (GridBackdrop) che si trova dietro la sezione hero/header, passando dal verde sage attuale a una tonalità light terracotta coerente con il design system R.O.S.S.

## File coinvolto
- `src/routes/index.tsx` — componente `GridBackdrop`
- `src/styles.css` — opzionale, per aggiungere un token `--ross-terra-light` se si vuole centralizzare il colore

## Modifica
1. Nel componente `GridBackdrop` (righe ~749-768), sostituire il colore delle linee della griglia:
   - Da: `rgba(151, 196, 89, 0.22)` (sage)
   - A: un light terracotta derivato da `#EF9F27`, ad esempio `rgba(239, 159, 39, 0.22)` oppure un tint chiaro tipo `#F2C98A`/`rgba(242, 201, 138, 0.28)`
2. Mantenere invariati: dimensione cella (44px), maschera radiale di fade, z-index e posizionamento assoluto.
3. Verificare visivamente che il contrasto sulla crema `#F6F3ED` sia sufficiente ma non invasivo.

## Nota
Nessun altro elemento della pagina viene toccato: font, occhi, posizionamento nuvole/card, contact lead e struttura verticale restano identici.