## Obiettivo
Il bottone di chiusura (×) in alto a destra delle card aperte in mobile è troppo chiaro e poco leggibile su sfondo cream. Aumentarne il contrasto senza toccare altro.

## Modifica
In `src/routes/index.tsx`, nel bottone di chiusura del `CardModal`:
- Sfondo: da bianco/glass semi-trasparente → ink (#1C1A14) pieno
- Icona ×: cream (#F6F3ED), stroke leggermente più spesso
- Bordo: rimosso (o ink stesso colore)
- Ombra: leggera drop-shadow ink 20% per staccarlo dallo sfondo card
- Dimensione e posizione invariate

Nessun'altra modifica: font, layout, animazioni, contenuti e comportamento restano identici.