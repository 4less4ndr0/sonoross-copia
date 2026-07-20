## Obiettivo
Capire se il database Notion è già raggiungibile con la connessione OAuth attuale, senza farti fare azioni inutili su Notion.

## Passi
1. Invocare `submitLead` con un'email di test (`stack_modern--invoke-server-function` → `/_serverFn/...` tramite il client — in pratica un POST all'endpoint interno).
2. Leggere `stack_modern--server-function-logs` filtrando `Notion` per vedere lo status HTTP e il body di risposta del gateway.
3. Interpretare il risultato:
   - **200 OK** → tutto ok, il DB è accessibile. Nessuna azione da parte tua.
   - **404 `object_not_found`** → il DB non è nel set di pagine autorizzate. Serve una delle due:
     a. Ri-autorizzare Notion da Lovable includendo il DB nella lista pagine.
     b. Aggiungerlo manualmente da Notion (`···` → `Connections` → cerca "Lovable" — non "lovable", il nome esatto della integrazione).
   - **400 `validation_error` su properties** → il DB non ha una colonna `Email` di tipo Title o `Source` Rich text. Ti dico esattamente quale property manca e la sistemi (o rimuovo `Source` dal payload).
4. In base al risultato, agisco: se serve un fix codice (es. togliere `Source`), lo faccio; se serve un'azione tua su Notion, te la descrivo con precisione.

Nessuna modifica al codice in questa fase — solo diagnosi.