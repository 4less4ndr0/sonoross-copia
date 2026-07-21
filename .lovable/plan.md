## Fix: swap desktop con transizione smooth (no scatti)

### Diagnosi
Oggi lo swap è a scatti perché ogni stato monta/smonta nodi DOM diversi: la cloud attiva è un `CloudShape` nello slot laterale, la glass card centrale è un `<button>` separato. Le CSS transitions non interpolano tra nodi diversi → cambio istantaneo.

### Obiettivo
Ogni card (manifesto + chi/cosa/come/perché) diventa **un singolo nodo DOM persistente** che si sposta e cambia forma tra slot laterale e slot centrale con transizione CSS unica. Il contenuto interno (image-card ↔ glass text) cross-fade in place.

### Modifiche (solo desktop, `src/routes/index.tsx`)

1. **Nuovo componente `SwapCard`** sostituisce sia `CloudShape` sia il `<button>` centrale nel ramo desktop. Un unico `<button>` absolute per ciascuna delle 5 card, sempre montato.

2. **Slot**
   - `CENTER_SLOT`: copre l'area del wrapper 58vw (top/left/right = 0, larghezza piena, altezza data dal sizer invisibile con `MANIFESTO_PARAGRAPHS`).
   - `sideSlot`: gli slot attuali di `CLOUDS` per le 4 cloud; quando attiva una cloud, il manifesto usa lo `sideSlot` della cloud che ha lasciato il centro.

3. **Rendering condizionale interno (cross-fade, non unmount)**
   - Layer A "image-card": immagine + gradient + H3 + pulsante `+`. `opacity: isActive ? 0 : 1`, `pointer-events: none` se attiva.
   - Layer B "glass content": glass background + titolo Instrument Serif + paragrafi da `card.bodyIndexes` (stessa formattazione della manifesto: italic, `ross-highlight`, ecc.). `opacity: isActive ? 1 : 0`.
   - Il fondo del `<button>` transita da "image dominante" a "glass" via `background` + `backdrop-filter` con transition.

4. **Transizioni**
   - Movimento/dimensione (top/left/right/width/height/transform/border-radius): ~600ms `cubic-bezier(0.22,1,0.36,1)`.
   - Cross-fade contenuto: ~300ms ease.
   - Hover "peek" (rotate 0, scale 1.06, z-index 50) resta solo su card non attiva; disabilitato sulla card centrale.

5. **Stato**
   - `activeCloudIndex: number | null` invariato (0..3 → CLOUDS[i]).
   - `activeCard = activeCloudIndex === null ? "manifesto" : CLOUDS[activeCloudIndex]`.
   - Rendering: map su 5 card (manifesto + 4 cloud) → `SwapCard` con `isActive` calcolato e `slot` scelto tra `CENTER_SLOT` e `sideSlot`.
   - Click su card non attiva: `setActiveCloudIndex(i)` (o `null` se manifesto). Click su card attiva: `setActiveCloudIndex(null)` (torna allo stato iniziale con manifesto al centro).

6. **Sizer**
   - Il sizer invisibile con `MANIFESTO_PARAGRAPHS` resta per dare altezza al wrapper — così `CENTER_SLOT` ha altezza stabile e le transizioni size non collassano.

### Vincoli
- Nessun tocco a: mobile stack + `CardModal`, font, palette, hero, form email, occhi/orizzonte, sezione finale, `MANIFESTO_PARAGRAPHS`, animazioni `float-*`, layout attuale degli slot laterali.
- Nessuna nuova libreria: solo CSS transitions su nodi persistenti.

### File toccato
- `src/routes/index.tsx` (unico).

### Risultato atteso
Cliccando una cloud laterale: quella cloud scivola al centro trasformandosi da image-card in glass card con il testo che appare in cross-fade; contemporaneamente il manifesto scivola nello slot appena liberato diventando image-card. Tutto sugli stessi nodi DOM → interpolazione smooth.
