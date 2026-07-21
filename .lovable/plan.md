## Nuovo layout card (stile Cordially)

Sostituire completamente l'attuale struttura "manifesto centrale + 4 card laterali" con **5 card impilate verticalmente**, tutte della stessa dimensione, in stile Cordially (immagine allegata).

### Struttura
- 5 card in una colonna centrata (max-width ~640px), una sotto l'altra con gap uniforme (~24px).
- Ogni card: stessa altezza (~280–320px desktop, ~220px mobile), border-radius 20px, immagine full-bleed di sfondo, overlay scuro in basso per leggibilità.
- Contenuto card: titolo bianco grande (`Instrument Serif`) in basso-sinistra, breve sottotitolo/eyebrow sotto il titolo, bottone circolare "+" glass in basso-destra.
- Le 5 card:
  1. **Manifesto** — nuova immagine di sfondo (generata)
  2. **Chi** — `cloud-chi.jpg`
  3. **Cosa** — `cloud-cosa.jpg`
  4. **Come** — `cloud-come.jpg`
  5. **Perché** — `cloud-perche.jpg`

### Interazione
- Click sulla card (o sul "+") → apre `CloudModal` esistente, centrato, con backdrop blur e testo completo della sezione.
- Manifesto usa gli stessi `MANIFESTO_PARAGRAPHS` attualmente mostrati nella glass card.
- Chiusura con ×, Esc, click sullo sfondo (già implementato).

### Rimozioni
- Rimuovere completamente: glass card manifesto fissa al centro, animazioni di swap/hover peek, halo terracotta di peek, offset/rotazioni di posizionamento assoluto delle cloud, floating animation.
- Rimuovere lo stato `activeCloud`-relativo alla swap; mantenere solo `openCloud` per il modale.

### Cosa resta invariato
- Hero (headline, form email, halo terracotta form).
- Occhi FlatEye + indicatore scroll.
- Sezione finale scura.
- Font (Georgia/DM Sans/Instrument Serif), palette (cream/terracotta/sage/ink), border-radius 18–20px.
- `CloudModal` e i testi `MANIFESTO_PARAGRAPHS`.

### Dettagli tecnici
- Nuovo asset `src/assets/cloud-manifesto.jpg` generato via `imagegen` (editoriale, tono caldo, coerente con le altre 4).
- `CLOUDS` array esteso a 5 elementi con `{ id, title, subtitle, image, bodyIndex }`; `manifesto` avrà `bodyIndex` che punta ai paragrafi manifesto (nuova sezione dedicata in `MANIFESTO_PARAGRAPHS` map, oppure campo `body` inline).
- `CloudShape` semplificata: nessun position absolute, nessuna rotazione, nessuna animazione floating; solo hover scale leggero (1.02) + transizione shadow.
- Layout: `<div className="mx-auto max-w-[640px] flex flex-col gap-6 px-4">`.
- Mantenere responsive: su mobile stesse card, altezza ridotta.
