## Obiettivo
Rimuovere completamente la sfumatura radiale "sole" all'orizzonte e sostituirla con un gradiente lineare verticale morbido Cream → Terra → Teal → Ink, arricchito da una texture grain sottile per dare profondità senza alone.

## Modifiche a `src/routes/index.tsx`

1. **Background del `<main>`**: eliminare il layer `radial-gradient(...)` iniziale. Tenere solo il `linear-gradient` verticale, ribilanciando le stop così la transizione sia liscia:
   - 0–40vh: `#F6F3ED` (Cream, area hero/testo)
   - 55vh: `#fdecc9` (crema calda)
   - 80vh: `#EF9F27` (Terra)
   - 110vh: `#5DCAA5` (Teal)
   - 160vh: `#3a9e7e` (Teal scuro)
   - 240–400vh: `#1C1A14` (Ink)

2. **Horizon layer (il div assoluto con il secondo radial)**: sostituirlo con una banda lineare orizzontale sottile (Terra→Teal) posizionata dove prima c'era il glow, oppure rimuoverlo del tutto lasciando che sia il gradiente principale a fare l'orizzonte. Scelta: **rimuoverlo**, il gradient del `main` è già sufficiente.

3. **Grain overlay**: aggiungere un `div` fisso a tutta pagina con un SVG noise inline come `background-image`, `opacity: 0.06`, `mix-blend-mode: overlay`, `pointer-events: none`, `z-index` sopra il gradient ma sotto i contenuti. Implementato via data-URI SVG `feTurbulence` per evitare asset esterni.

## Cosa NON tocco
Font (Georgia, Instrument Serif, DM Sans), occhi FlatEye, posizioni delle nuvole, layout del contact lead, testo del manifesto, form email.

## Verifica
Ricaricare `/`, controllare che non ci sia più l'alone circolare arancione, che lo scroll mantenga transizione continua Cream→Ink, e che la grana sia percepibile ma discreta.
