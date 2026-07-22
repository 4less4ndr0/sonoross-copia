## Obiettivo
Aggiungere il form email (stesso della header/hero) dentro la card "cosa", collegato allo stesso database Notion.

## Modifiche

**`src/routes/index.tsx`**
1. Estrarre il form email attualmente inline nell'hero in un componente riusabile `LeadForm` (stesso markup, stesso stile con halo terracotta, stessa chiamata a `submitLead` da `@/lib/leads.functions`, stessi stati `submitting`/`submitted`/`error`).
2. Sostituire il form inline nell'hero con `<LeadForm />`.
3. Dentro `CosaContent`, dopo il paragrafo "…Ti chiediamo di aiutarci a non sbagliare." (posizione annotata dall'utente), inserire `<LeadForm />` con un piccolo margine verticale, prima del paragrafo finale sul prototipo.

## Note tecniche
- Nessun cambiamento al backend: il form riusa `submitLead` che scrive già sul database Notion `REDACTED_DB_ID`.
- Il componente `LeadForm` accetta opzionalmente una prop `className` per adattare max-width dentro la card (la card è più stretta dell'hero).
- Nessuna modifica a font, palette, layout card o posizionamento altri elementi.
