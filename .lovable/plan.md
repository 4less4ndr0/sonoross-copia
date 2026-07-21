## Obiettivo
Spostare la coppia di occhi pixel-art dal logo in alto a sinistra al centro dell’hero, sopra la frase "Perché nessuno dovrebbe invecchiare solo.", ingrandendoli in modo proporzionato all’area del titolo e mantenendo l’animazione di blink sincrona.

## Modifiche previste

### 1. Posizionamento
- Spostare i due `FlatEye` dentro il contenitore hero, sopra l’`<h1>`.
- Centrarli orizzontalmente con `flex justify-center`.
- Lasciarli `pointer-events-none` per non interferire con form/email.

### 2. Dimensione
- Sostituire il `pixelSize={3}` fisso con una dimensione responsiva.
- Usare un valore scalato in base alla viewport (es. `clamp`-like tramite `usePixelSize` o una nuova hook dedicata) in modo che:
  - Desktop: gli occhi siano visibili ma non dominanti, proporzionati alla larghezza del titolo.
  - Mobile: rimangano centrati e leggibili, ridotti rispetto al desktop.
- Target indicativo: larghezza occhio ~180–260 px desktop, ~110–140 px mobile.

### 3. Stile e contrasto
- Mantenere colore bianco, stroke sottile ink e drop-shadow esistenti.
- Eventualmente rafforzare leggermente stroke/ombra se a dimensione maggiore servisse più definizione.

### 4. Blink
- Mantenere `useBlink(1200, 2800)` e passare lo stesso stato `closed` a entrambi gli occhi per il blink sincrono.
- Non modificare la logica di chiusura.

### 5. Layout e spaziature
- Aggiungere margine inferiore tra occhi e titolo (`mb-4`/`mb-6`) e verificare che non tocchino il form né le card sotto.
- Verificare che il layout desktop e mobile non rompa il centratura del titolo e del form email.

## File coinvolti
- `src/routes/index.tsx`

## Verifica
- Anteprima desktop e mobile per confermare che:
  - Gli occhi sono centrati sopra il headline.
  - Il blink avviene regolarmente e in modo visibile.
  - Non si sovrappongono al testo o al form.
  - Il typecheck/build passa senza errori.
