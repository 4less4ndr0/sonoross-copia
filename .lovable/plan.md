## Modifiche richieste

1. **Gradiente di sfondo**
   - Sostituire il gradiente attuale `cream → mint/teal` con `cream (#F6F3ED) → terracotta (#EF9F27)`.
   - Mantenere la transizione morbida esistente e la sezione finale scura `ink (#1C1A14)`.
   - File: `src/routes/index.tsx`, proprietà `background` del `<main>`.

2. **Card del manifesto**
   - Allargare il contenitore in vetro/gloss del testo del manifesto.
   - Margine laterale target: ~15-20% per lato, quindi larghezza ~70% del viewport.
   - Non modificare: altezza, padding interno, border-radius (20px), effetto vetro, font, copy.
   - File: `src/routes/index.tsx`, wrapper della card (attualmente `max-w-2xl`).

## Cosa non verrà toccato
- Nuvole, posizionamento e testo.
- Font (Georgia / DM Sans).
- Occhi, blink, header.
- Struttura verticale e scroll.
- Testo chiaro solo su sfondo scuro (contrasto già verificato).

## Implementazione tecnica
- `src/routes/index.tsx`:
  - Aggiornare i color-stop del `linear-gradient` del `<main>`.
  - Cambiare la larghezza del wrapper della card da `max-w-2xl` a `w-[70vw] max-w-6xl` (mantiene margini laterali ~15-20% su desktop e si adatta su mobile).

## Verifica
- Build/dev senza errori.
- Preview: gradiente cream→terracotta visibile durante lo scroll, card più larga con margini laterali ridotti, nessuna sovrapposizione o perdita di contrasto.