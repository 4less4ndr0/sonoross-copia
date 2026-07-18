## Font confermati

- **Heading / display** → **Georgia** (system serif, già disponibile ovunque, nessun import necessario).
- **Copy / UI** → **DM Sans** (già caricato da Google Fonts nel root route).

Sostituisco Instrument Serif con Georgia in tutti i punti dove ora è usato.

## Ruoli tipografici

- **H1 hero** ("Perché nessuno dovrebbe invecchiare solo.") → Georgia regular, size grande (clamp attuale).
- **Testo dentro le nuvole** → Georgia regular.
- **Frase evidenziata narrativa** ("E se lo strumento più potente…") → Georgia italic, size più grande del body.
- **"R.O.S.S." firma** → DM Sans, tracking largo.
- **Body narrativa (paragrafi, lista, ecc.)** → DM Sans regular.
- **Input email + placeholder** → DM Sans regular.
- **Micro-label "↓ scroll"** → DM Sans uppercase tracked.

## Colori per componente (invariati rispetto alla proposta precedente)

Sfondo: gradient continuo crema → arancio/rosa → magenta → plum scuro.

- **H1 hero** → `#1a1a1a` — massimo contrasto sul crema, near-black caldo (non nero puro tecnico).
- **Testo dentro le nuvole** → `#1a1a1a` con leggera text-shadow bianca (come ora) — coerente con H1, resta leggibile sull'asset chiaro.
- **Placeholder input** → `#9a8f86` — neutro caldo, distinto dal testo digitato.
- **Testo digitato input** → `#1a1a1a`.
- **Bottone submit** → bg `#1a1a1a`, freccia `#faf7f2` — nessun colore nuovo.
- **Micro-label "↓ scroll"** → `rgba(255,255,255,0.7)` — sta sopra la fascia arancio/rosa, il bianco semi-trasparente è l'unica scelta leggibile senza rompere il glow.
- **Body narrativa** → `#faf1e6` (cream caldo) — sul fondo plum/magenta scuro; un bianco puro sarebbe clinico, il cream dialoga con l'orizzonte arancio sopra.
- **Frase evidenziata narrativa** → `#ffd9a8` — richiama il giallo/arancio dell'orizzonte come eco cromatica interna, senza introdurre accent estranei.
- **Elenco puntato** → `#faf1e6` a `opacity 0.85` — stesso cream leggermente attenuato per gerarchia.
- **"R.O.S.S." firma** → `#faf1e6` con letter-spacing largo — nessun colore in più, il peso lo dà lo spacing.
- **Occhi LED** → `#FFFFFF` con glow (invariati) — unico elemento "vivo", devono bucare il gradient caldo.

## Cosa NON cambio

- Palette del gradient di sfondo.
- Asset nuvole (PNG), posizioni, animazioni float.
- Colore e comportamento degli occhi LED.
- Layout, scroll, spacing.

## Passi implementativi

1. In `src/styles.css` aggiungere due variabili in `@theme`: `--font-serif: Georgia, "Times New Roman", serif;` e `--font-sans: "DM Sans", system-ui, sans-serif;` per centralizzare le famiglie.
2. In `src/routes/index.tsx` sostituire tutte le occorrenze inline `fontFamily: '"Instrument Serif", serif'` con Georgia (via variabile CSS o stringa diretta).
3. Applicare i colori proposti per componente (inline style, coerente con lo stile attuale del file).
4. Rimuovere il link a Instrument Serif in `src/routes/__root.tsx` se non più usato altrove (mantenere DM Sans).
5. Verifica visiva con Playwright: screenshot hero (viewport in alto) e narrativa (scroll in fondo) per confermare leggibilità e coerenza.

Approva e procedo.
