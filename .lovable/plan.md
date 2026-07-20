
## Analisi dello stato attuale

In `src/routes/index.tsx` le 4 card ("chi", "cosa", "come", "perché") sono renderizzate da `CloudShape` dentro un wrapper assoluto (`z-0`) posizionato *dietro* la glass card del manifesto (`z-10`). L'interazione attuale è tutta CSS-only:

- Al **hover** la card usa `hover:!top-1/2 hover:!left-1/2 ... hover:!w-[min(82vw,520px)] hover:z-40`, quindi vola al centro dello stesso contenitore (`.relative w-[58vw]` del manifesto) e passa sopra la manifesto card.
- **Non c'è nessun click handler**, quindi non esiste il comportamento di "swap" con la manifesto card.

Problemi concreti:
1. L'hover fa saltare la card fuori dal suo posto: appena il mouse esce dall'area della card originale (perché si è mossa) l'hover si spezza e la card torna indietro → effetto "rotto".
2. La card volante è limitata al bounding box del wrapper del manifesto (`w-[58vw]`), non allo schermo, quindi il centraggio è visivamente storto.
3. Non c'è stato React che gestisca selezione/swap.

## Comportamento desiderato

- **Hover su una card laterale** → la card resta ancorata al suo lato, ma diventa leggibile: si allarga leggermente verso l'interno, ruota a 0°, alza z-index sopra le sorelle (non sopra il manifesto). Nessun teletrasporto al centro.
- **Click su una card laterale** → *swap* con la manifesto card:
  - La card cliccata si espande al centro (grande come oggi il manifesto, ~58vw), diventa la card protagonista, mostra il titolo + un contenuto associato.
  - La manifesto card si rimpicciolisce e si sposta lateralmente (occupando il posto che aveva la card cliccata), come card secondaria.
  - Cliccando di nuovo la card centrale (o una "×" / la manifesto ridotta), si torna allo stato iniziale.
- Solo **una** card può essere "attiva" al centro alla volta. Le altre 3 restano ai loro slot laterali.

## Piano di implementazione (solo `src/routes/index.tsx`)

1. **Stato React** in `Index`:
   - `const [activeCloud, setActiveCloud] = useState<number | null>(null)`
   - Handler `toggleCloud(i)` che imposta o resetta.
   - `Escape` key + click su backdrop chiudono.

2. **Rifattorizzo il layout della sezione manifesto** in un contenitore relativo che ospita 5 "slot" logici:
   - slot centro (manifesto default), slot NO/SO/NE/SE (4 cloud).
   - Quando `activeCloud === i`, la cloud `i` prende lo slot centro e la manifesto card prende lo slot originale della cloud `i`.
   - Uso `position: absolute` con transizioni su `top/left/width/transform` (ease `cubic-bezier(0.22,1,0.36,1)`, ~500ms) per un movimento fluido.

3. **`CloudShape` diventa controllato**:
   - Prop `isActive: boolean`, `onClick`, `activePositionStyle` (stile "protagonista": centrata, larghezza ~58vw, rotate 0, scale 1, z-30).
   - Rimuovo tutte le classi `hover:!top-*` / `hover:!left-*` che facevano il teletrasporto.
   - Hover leggero (non swap): `hover:scale-[1.04] hover:rotate-0 hover:z-20` + alone terracotta più intenso. Cursor pointer.
   - Quando `isActive`, la card mostra `text` come titolo + un paragrafo di contenuto (placeholder breve per ogni voce "chi/cosa/come/perché" — copy da confermare dopo, per ora frase segnaposto). Font più grande, padding maggiore.

4. **Manifesto card**:
   - Diventa anch'essa "posizionabile": quando `activeCloud !== null`, riceve lo stile dello slot laterale corrispondente (dimensione ridotta ~22vw, rotazione lieve, z-10).
   - Cliccabile per tornare allo stato default (o freccia "torna al manifesto").
   - Il contenuto interno resta invariato; scala con `transform` + riduzione padding.

5. **Backdrop / uscita**:
   - Overlay trasparente (`fixed inset-0 z-20`) visibile solo quando `activeCloud !== null`, cattura click fuori per chiudere.
   - `useEffect` per listener `keydown` su `Escape`.

6. **Accessibilità**:
   - Ogni card è un `<button>` invece di un `<div>`, con `aria-expanded`, `aria-controls`, focus outline coerente.

7. **Vincoli rispettati**: nessun cambio a font, occhi, hero, gradient, palette, form email, testo manifesto, halo/ombre già approvate.

## Tecnicalità

- Transizioni con `transition-[top,left,width,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]` invece di transizioni full su `all` (evita flicker su blur/opacity).
- Le posizioni "slot" sono definite come oggetti `{top,left,width,rotate}` in un array, e vengono assegnate in base a `activeCloud`.
- Mobile (`< sm`): swap disabilitato o semplificato — la card attiva si espande full-width sopra il manifesto (che scompare) invece di swap laterale, per evitare layout stretti. Da confermare se OK.

## Da confermare prima di procedere

1. Il contenuto testuale di "chi / cosa / come / perché" nella card attiva: lascio un placeholder o hai già il copy?
2. Mobile: swap laterale semplificato in "full-screen card + backdrop" (manifesto nascosto) va bene?
