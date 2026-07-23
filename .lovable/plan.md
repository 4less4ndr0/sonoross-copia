## Obiettivo
Ridurre ulteriormente la distanza verticale tra il form email e la sezione card su **mobile**, replicando la stessa logica di compattazione già applicata su desktop.

## Stato attuale
In `src/routes/index.tsx`:
- Hero mobile: `pt-[8vh] pb-0`
- Sezione card mobile: `-mt-[48vh] pt-2`

La distanza residua tra il form e la prima card su mobile è ancora troppo ampia.

## Modifica proposta
1. **Compattare ulteriormente il passaggio form → card su mobile** portando il margine negativo della sezione card da `-mt-[48vh]` a **`-mt-[56vh]`** (o simile, da verificare visivamente).
2. **Mantenere invariati** padding, occhi, headline, form, carousel desktop, colori, font e interazioni esistenti.
3. **Verificare** con screenshot su viewport mobile (≈ 375–414 px) che:
   - la prima card sia visibile senza sovrapporsi al form;
   - occhi e headline non vengano tagliati o schiacciati;
   - non compaia alcuna striscia/banda colorata indesiderata.

## File coinvolto
- `src/routes/index.tsx` (solo le classi responsive del hero e della card section)

## Consegna
Dopo la modifica, condivido screenshot mobile prima/dopo per confermare che il gap sia quello desiderato.