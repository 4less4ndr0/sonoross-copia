Sostituisco le 5 bubble iMessage con 5 nuvole 3D bianche stile immagine allegata, mantenendo posizioni, dimensioni responsive e animazioni floating già esistenti.

## Approccio

1. **Asset nuvola**: carico l'immagine `user-uploads://CleanShot_2026-07-02_at_17.27.51@2x.png` su Lovable Assets con background rimosso (PNG trasparente), così la nuvola galleggia sullo sfondo bianco senza il rettangolo azzurro. Salvo il pointer in `src/assets/cloud.png.asset.json`.

2. **Componente `CloudShape`** (in `src/routes/index.tsx`): sostituisce `BubbleShape`. Renderizza `<img src={cloudAsset.url}>` con:
   - `width` / `height` presi dai valori già presenti in `BUBBLES` (le nuvole riempiono lo stesso bounding box delle bubble attuali → stesse dimensioni responsive)
   - `object-contain`, drop-shadow leggera per dare profondità
   - stessa animazione `float-*` e `positionClass` già definite

3. **Array `BUBBLES`**: lo rinomino concettualmente in `CLOUDS` ma mantengo identiche posizioni (3 in alto, 2 in basso sopra l'orizzonte su mobile / vicino agli occhi su desktop) e dimensioni. Rimuovo campi ora inutili (`variant`, tail SVG).

4. **Cleanup**: rimuovo il vecchio SVG con la coda iMessage e i colori `#007AFF`. Le nuvole sono puramente immagini PNG trasparenti.

Nessun cambiamento a headline, form email, orizzonte, occhi pixel.
