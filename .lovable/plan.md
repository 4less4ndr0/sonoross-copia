## Obiettivo

Quando una card viene aperta (desktop swap = card centrale, mobile = modal), l'immagine di copertina (`card.image`) — oggi visibile solo sulla copertina che scompare all'apertura — deve essere inserita anche dentro il contenuto, ingrandita, come "immagine allegata" al testo. Comportamento identico per manifesto, chi, cosa, come, perché.

## Cosa cambia

### 1) Desktop — `SwapCard`, glass layer (src/routes/index.tsx, ~riga 312-338)

Dentro il contenitore glass, sopra i paragrafi, aggiungere un blocco immagine:

- `<img src={card.image}>` con `alt` = `card.title`
- larghezza piena della card, altezza fissa proporzionale (es. `aspect-[16/9]` oppure `height: clamp(180px, 22vh, 320px)`)
- `object-fit: cover`, `border-radius: 14px`, margine sotto per staccarla dal testo
- `loading="lazy"`
- Nessuna modifica alla copertina esistente (image layer che sfuma out quando `isActive`).

### 2) Mobile — `CardModal` (src/routes/index.tsx, ~riga 506-547)

Dentro il pannello, subito sotto il titolo e prima del blocco paragrafi, aggiungere lo stesso `<img>`:

- larghezza piena, altezza `clamp(200px, 40vw, 360px)`, `object-cover`, `border-radius: 16px`
- `alt` = `card.title`, `loading="lazy"`

### 3) Nessuna altra modifica

- Non tocco layout copertina, halo, animazione di swap, transizioni del modal.
- Non tocco font, testi, `MANIFESTO_PARAGRAPHS`, posizionamento cloud.
- L'immagine del manifesto (`cloudManifesto`) apparirà anch'essa nella sua card aperta — coerente con la richiesta "lo stesso comportamento a tutte le card".

## Dettagli tecnici

File toccato: solo `src/routes/index.tsx`. Due inserimenti JSX (`<img>`), nessun cambio a stati/props. `card.image` è già disponibile in entrambi i componenti tramite la prop `card`.
