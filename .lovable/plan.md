## Obiettivo

Trasformare le 4 card laterali (chi / cosa / come / perché) nel formato "cordially": immagine di sfondo full-bleed, titolo bianco in basso a sinistra, bottone `+` circolare in basso a destra. Al click si apre un pannello/modale al centro con il contenuto della sezione. Niente sottotitolo per ora, solo il titolo.

## Cambi al comportamento

- Rimuovere lo swap corrente (card centrale ↔ manifesto in slot laterale). Il manifesto torna sempre visibile al centro nella sua posizione attuale.
- Le 4 card restano ancorate lungo i bordi del manifesto come oggi (sporgenza + halo terracotta + hover peek).
- Click su una card (o sul `+`) apre un **modale overlay** centrato sopra tutta la pagina, con backdrop scuro sfocato, chiudibile con `×`, `Esc` o click sul backdrop.
- Contenuto del modale = i 4 paragrafi già presenti in `MANIFESTO_PARAGRAPHS` (chi/cosa/come/perché), stessa palette e tipografia della glass card del manifesto.

## Cambi visivi alle card

- Sfondo: immagine full-bleed con overlay scuro gradient dal basso (per leggibilità del titolo bianco).
- Titolo `chi/cosa/come/perché` in basso-sinistra, Instrument Serif bianco, dimensione attuale, letter-spacing invariato.
- Bottone `+` in basso a destra: cerchio semi-trasparente bianco con `+` bianco, ~44px, glass/backdrop-blur.
- Nessun sottotitolo.
- Mantenere: border-radius 18-20px, halo terracotta esterno, hover peek (lift + z-index 50), floating animation, posizionamento sui bordi del manifesto.

## Immagini

Generare 4 immagini coerenti con la palette ROSS (cream / terracotta / sage), tema anzianità/relazione/quotidianità caldo-editoriale, formato verticale ~800×1000. Salvate in `src/assets/cloud-{chi,cosa,come,perche}.jpg` e importate nel componente.

## File toccati

- `src/routes/index.tsx`:
  - Rimuovere lo stato/animazione di swap tra manifesto e card attive; il manifesto resta fisso nella posizione attuale.
  - Aggiornare `CloudShape` a layout image-card (immagine, overlay, titolo, `+`).
  - Aggiungere componente `CloudModal` con backdrop + card centrale che mostra `MANIFESTO_PARAGRAPHS[activeCloud]`.
  - Sostituire lo stato `activeCloud` in modo che serva solo ad aprire il modale (non più a spostare il manifesto).
- 4 nuovi asset immagine in `src/assets/`.

## Vincoli invariati

Font (Georgia / DM Sans / Instrument Serif), palette cream/terracotta/sage/ink, header attuale, hero + email form + occhi + orizzonte, glass card manifesto, halo terracotta delle card, hover peek e floating.
