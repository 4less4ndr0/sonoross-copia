# Apply new palette (Handoff slide)

Aggiorno solo colori in `src/routes/index.tsx`. Nessun cambio a font, layout, nuvole, animazioni.

## Modifiche

### 1. `<main>` background
- Da: gradient magenta/plum/pink complesso
- A: `#f8f1e0` (cream flat, come slide)

### 2. Horizon glow (div assoluto sotto la hero)
- Da: giallo → arancio → rosa/magenta
- A: `#E8C547` (giallo) → `#D68A3C` (arancio) → `#9CBE5F` (verde salvia) → trasparente sul cream

### 3. Narrative section
- Colore testo body: da cream chiaro → `#1a1a1a`
- Frase enfatica (Georgia italic): da `#ffd9a8` → `#D68A3C`
- Firma "R.O.S.S.": near-black `#1a1a1a`

### 4. Scroll hint "↓ scroll"
- Da: `text-white/70`
- A: `text-black/50` per leggibilità sul glow chiaro

### 5. Occhi (FlatEye)
- Restano bianchi (contrast sul nuovo glow caldo resta buono)

## Non tocco
- Font (Georgia headings, DM Sans body)
- Cloud asset e posizioni
- Struttura JSX, animazioni, form
