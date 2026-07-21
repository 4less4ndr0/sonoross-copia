## Fix: interazione click su desktop → swap, non modale

### Problema
Su desktop il click su una cloud (chi/cosa/come/perché) apre `CardModal` in overlay. L'interazione richiesta è quella di prima: **swap** tra la card cliccata e la card manifesto centrale.

### Comportamento target (solo desktop, ≥ 640px)
- Stato iniziale: manifesto glass card al centro con `MANIFESTO_PARAGRAPHS` inline, 4 cloud image-card ai bordi (come ora).
- Hover su una cloud: peek (scale + rotate 0 + z-index 50), invariato.
- **Click su una cloud**: la cloud si sposta al centro assumendo lo slot/dimensioni del manifesto, mostra al suo interno il testo dei suoi `bodyIndexes` (stessa tipografia della manifesto card). Contemporaneamente la manifesto card si rimpicciolisce e prende lo slot laterale liberato dalla cloud, mostrando solo il titolo "manifesto" come le altre cloud.
- Click sulla manifesto (ora laterale) o sulla stessa cloud centrale → ritorno allo stato iniziale.
- Click su un'altra cloud laterale mentre una è già centrata → l'attiva torna al suo slot, la nuova va al centro (manifesto resta laterale se serve tornare / oppure: solo una card centrale per volta; la manifesto rientra al centro solo quando nessuna cloud è attiva).
- Nessun overlay/modale su desktop.

### Comportamento mobile (< 640px)
Invariato: stack di 5 `StackCard`, click apre `CardModal`.

### Implementazione
- In `src/routes/index.tsx` introdurre stato `activeCloudIndex: number | null` (indice in `CLOUDS`) usato solo dal ramo desktop.
- Ramo desktop:
  - Manifesto wrapper: se `activeCloudIndex === null` → posizione/size attuali (centro, glass card grande con testo). Se `!== null` → assume lo `slot` della cloud attiva (top/left/right/width/rotate come cloud), diventa image-card compatto con titolo "manifesto" (riuso stilistico di `CloudShape`, immagine `cloudManifesto`), cliccabile per resettare.
  - Ogni `CloudShape`: se è quella attiva → assume lo slot centrale del manifesto (stesso wrapper glass, testo dei suoi `bodyIndexes` renderizzato inline con stessa tipografia della manifesto card). Se non attiva → slot laterale invariato. Click su cloud non attiva: `setActiveCloudIndex(i)`. Click su cloud attiva: `setActiveCloudIndex(null)`.
  - Transizioni: mantenere `HOVER_TRANSITION` (transform 480ms + easing esistente) così lo swap è animato.
  - Rimuovere la chiamata a `setActiveCard(c.cardIndex)` dal path desktop: `CloudShape.onOpen` diventa un toggle interno al desktop.
- Ramo mobile: `StackCard` continua a chiamare `setActiveCard`, `CardModal` renderizzato solo se aperto da mobile (gate: usare comunque lo stesso stato ma non aprirlo da desktop).

### Refactor minimo
- Estrarre il rendering "manifesto glass card centrale" e "cloud image-card slot" in modo che manifesto e cloud possano scambiarsi lo slot/forma in base allo stato attivo. Nessun nuovo asset. Nessuna modifica a hero, form, occhi, orizzonte, sezione finale, palette, font, animazioni float, `MANIFESTO_PARAGRAPHS`.

### File toccato
- `src/routes/index.tsx` (unico).
