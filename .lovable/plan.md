Ho capito: solo in **desktop**, sostituiamo l'attuale sistema swap (card centrale + laterali floating) con una **griglia mosaico 2×2**, card grandi e statiche. Mobile resta identico.

## Layout desktop

```text
+-------------------+-------------------+
|                   |                   |
|       chi         |     manifesto     |
|                   |                   |
+-------------------+-------------------+
|                   |                   |
|      cosa         |      perché       |
|                   |                   |
+-------------------+-------------------+
```

- Rimuovo la card **come** dall'array `CARDS` (solo su desktop rimane visibile la selezione a 4; su mobile valuto se rimuoverla anche lì — di default la tolgo ovunque, dimmi se invece la vuoi tenere in mobile).
- Ordine fisso: `chi`, `manifesto` (riga 1), `cosa`, `perché` (riga 2).
- Card di uguale dimensione, gap coerente col resto, radius 18–20px come ora.

## Interazioni

- **Niente più floating / animazioni idle**: le card sono ferme.
- **Niente più swap centrale**: al click la card si apre come modal/overlay al centro (stesso trattamento glass/scroll interno che c'è ora quando è "attiva"), sopra la griglia. Chiusura con X sticky, come già fatto per mobile — riuso lo stesso componente `CardModal` anche in desktop.
- **Halo terracotta**: sparisce dallo stato idle, appare **solo su `:hover**` della card (transizione morbida di opacità).
- Micro-feedback su hover: leggero `scale`/lift opzionale, coerente con il resto — se preferisci zero movimento anche in hover, lo tolgo.

## File coinvolti

- `src/routes/index.tsx`:
  - `CARDS`: rimuovo `come`.
  - Sezione desktop: sostituisco il blocco `SwapCard` + slot laterali con una `<div class="grid grid-cols-2 gap-...">` di 4 card.
  - Riuso `CardModal` per l'apertura in desktop (stesso comportamento del mobile).
  - Rimuovo stato `activeId`/logica swap desktop e classi `float-*` sulle card.
  - Halo: da sempre-visibile a `opacity-0 group-hover:opacity-100 transition`.

## Da confermare

1. La card **come** va rimossa anche da mobile, o solo da desktop? SI
2. In desktop, apertura come **modal overlay centrale** (come mobile) va bene? O preferisci che la card cliccata si espanda "in place" dentro la griglia? Va bene come modal overlay centrale