## Obiettivo
Al click del bottone di invio email, se la submit va a buon fine (lead salvato su Notion), scatenare un'animazione di confetti sull'intera viewport.

## Implementazione

1. **Dipendenza**
   - `bun add canvas-confetti` + `bun add -d @types/canvas-confetti`

2. **Nuovo componente `src/components/ui/confetti.tsx`**
   - Adattamento della versione MagicUI del file allegato al nostro stack (no `"use client"`, import da `@/components/ui/button` non necessario perché usiamo solo la funzione `fire`).
   - Esporto la funzione helper `fireConfetti()` che chiama direttamente `confetti(...)` da `canvas-confetti` con un preset "celebration" (due burst laterali con `spread`, `startVelocity`, `particleCount`, colori del brand: terracotta `#EF9F27`, sage `#4A5D50`, cream `#F6F3ED`, sage light `#e8f5d3`).
   - Rispetta `prefers-reduced-motion`: se attivo, non spara nulla.

3. **Hook nel `LeadForm` (`src/routes/index.tsx`)**
   - Nel `handleSubmit`, dopo aver ricevuto `{ ok: true }` da `submitLead`, chiamare `fireConfetti()` prima/insieme al reset del form.
   - Nessun confetti in caso di errore o validazione fallita.

4. **Verifica**
   - Build check, poi smoke test manuale via preview: submit con email valida → confetti visibili, form resettato.

## Note tecniche
- `canvas-confetti` è client-only: import dinamico dentro l'handler (`const { default: confetti } = await import("canvas-confetti")`) per evitare qualsiasi problema in SSR.
- Nessun cambiamento di layout, stile del bottone o copy.
