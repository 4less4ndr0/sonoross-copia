## Obiettivo
Salvare le email inviate dalla form della landing nel tuo database Notion:
`REDACTED_DB_ID`

## Passi

1. **Collegare Notion** (App connector di workspace) tramite `standard_connectors--connect` con `connector_id: notion`. L'OAuth ti chiederà di scegliere quali pagine condividere con l'integrazione — devi includere il database indicato.

2. **Preparare il database Notion**. Deve avere almeno queste proprietà (nomi esatti, case-sensitive):
   - `Email` — tipo **Title** (colonna principale)
   - `Created` — tipo **Date** (opzionale, altrimenti basta `created_time` automatico di Notion)
   - `Source` — tipo **Rich text** (opzionale, verrà valorizzato con "landing")
   
   Se il DB ha nomi diversi, dimmelo e li adatto nel codice.

3. **Server function** `submitLead` in `src/lib/leads.functions.ts`:
   - Validazione email con Zod (trim, formato, max 255).
   - `POST REDACTED_GATEWAY/v1/pages` con:
     - headers: `Authorization: Bearer ${LOVABLE_API_KEY}`, `X-Connection-Api-Key: ${NOTION_API_KEY}`, `Content-Type: application/json`
     - body: `{ parent: { database_id: "REDACTED_DB_ID" }, properties: { Email: { title: [{ text: { content: email } }] }, Source: { rich_text: [{ text: { content: "landing" } }] } } }`
   - Gestione errori: se il gateway risponde non-OK, log server-side + ritorno `{ ok: false, error }`.
   - Il database ID va hardcoded come costante (non è un segreto: sta nell'URL).

4. **Wiring della form** in `src/routes/index.tsx`:
   - `useServerFn(submitLead)` nell'`onSubmit`.
   - Stati `idle | loading | success | error` per abilitare/disabilitare il bottone e mostrare un piccolo messaggio sotto la form ("Grazie, ti scriveremo presto." / "Qualcosa è andato storto, riprova.").
   - Nessun altro cambio grafico.

5. **Verifica**: invocare `submitLead` con `stack_modern--invoke-server-function` per confermare che una riga compaia nel DB Notion.

## Note
- Il gateway Notion inietta automaticamente `Notion-Version`, non lo setto.
- L'endpoint non è pubblico: essendo una `createServerFn`, viene chiamato tramite RPC dal client — nessuno può leggere il `LOVABLE_API_KEY`.
- Se in futuro vuoi anche un campo `Nome`/`Consenso GDPR`, si aggiunge una property in Notion e un campo nella form.

Confermi che procedo? Al via, il primo tool call sarà il collegamento a Notion.