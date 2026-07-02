Aggiungo una frase in ogni nuvola e ridimensiono le nuvole per contenere il testo in modo leggibile.

## Frasi (una per nuvola)
1. "Per chi ha ancora tante cose da raccontare."
2. "La distanza non deve significare silenzio."
3. "Chi ama, vuole sapere come stai davvero."
4. "Una compagnia che ascolta, non che controlla."
5. "Ogni giorno ha una storia da raccontare."

## Modifiche a `src/routes/index.tsx`

- Estendo il tipo `Cloud` con `text: string`.
- Aggiungo il testo a ciascuna delle 5 voci in `CLOUDS`.
- Aumento la dimensione delle nuvole per ospitare il testo:
  - Desktop: da ~10–11vw a ~18–20vw (max ~260px).
  - Mobile: da ~26–30vw a ~40–44vw (max ~340px).
- In `CloudShape` rendo il container `relative` e sovrappongo il testo con `absolute inset-0 flex items-center justify-center` con padding interno (`px-[14%] py-[22%]`) per rientrare nella zona "piena" del cloud PNG.
- Stile testo: Instrument Serif, `text-neutral-800`, `text-center`, `leading-tight`, dimensione fluida `clamp(0.72rem, 1.1vw, 1rem)` desktop e `clamp(0.7rem, 2.6vw, 0.95rem)` mobile via classi responsive.
- Ricontrollo le posizioni: dato che le nuvole ora sono più grandi, verifico che restino nei white space (headline+form al centro, orizzonte in basso). Se necessario sposto leggermente le 2 laterali del form verso l'alto (`sm:top-[38%]`) e le 3 in alto restano sopra la headline. Su mobile le 2 in fascia media potrebbero coprire il form: le sposto sopra la headline anch'esse oppure le distribuisco 3 sopra + 2 sotto in modo che stiano nella fascia bianca ~44–56% ristretta ai bordi.

Nessun'altra modifica: occhi, orizzonte, headline e form invariati.
