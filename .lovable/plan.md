## Sostituzione immagine card Manifesto

1. Carica `user-uploads://IMG_9700.JPG` come asset CDN → `src/assets/cloud-manifesto.jpeg.asset.json` (via `lovable-assets create`).
2. Rimuovi il vecchio pointer/asset del manifesto (se esistente).
3. In `src/routes/index.tsx`: aggiorna l'import dell'immagine della card Manifesto per puntare al nuovo asset, mantenendo lo stesso trattamento visivo (cover image in cima al contenuto sia nel desktop `SwapCard` che nel mobile `CardModal`) già applicato a "chi" e alle altre card.