Nella card Manifesto aperta, l'immagine è renderizzata con `object-cover` che di default centra verticalmente e mostra il cielo/albero in alto. La foto in orientamento portrait viene croppata in landscape → serve spostare il punto focale in basso per inquadrare la fascia con edificio + orizzonte (l'area cerchiata in rosso).

**Modifica:** in `src/routes/index.tsx`, aggiungere `object-position: 50% 72%` (circa) all'`<img>` della cover dentro `SwapCard` (desktop) e `CardModal` (mobile), applicato solo quando la card è la "manifesto". Le altre card mantengono il default (`center`).

Proporzioni invariate, nessun crop dell'immagine originale — solo il framing del contenitore cambia.