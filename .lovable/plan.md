## Obiettivo
Sostituire il contenuto della card "chi" con la nuova copy (Blocco 1 + team), rendendo le 4 bio del team dei dropdown apribili.

## Cosa cambia (solo card "chi", desktop + mobile)

**Blocco 1 — "Da dove è iniziato tutto"**
- Eyebrow: `DA DOVE È INIZIATO TUTTO`
- Heading (Georgia italic, coerente con manifesto): `11 Aprile 2026`
- 6 paragrafi della copy fornita.

**Blocco 2 — "Il team"**
- Eyebrow: `CHI SIAMO`
- Heading: `Il team dietro al progetto`
- 4 righe dropdown, una per persona:
  - Header cliccabile: **Nome** — Ruolo, con chevron che ruota all'apertura.
  - Body espanso: bio completa.
- Persone: Alessandro Di Mauro, Federico Sassu Verdieri, Luca Marzotto, Alessandra Beretta.
- Tutti chiusi di default, apertura indipendente (più di uno può stare aperto contemporaneamente).

Font/colori invariati: Georgia italic per gli heading, DM Sans per body, ink `#1C1A14`, eyebrow in sage dark `#3B6D11` uppercase tracking-wide. Nessuna modifica alle altre card, all'immagine di copertina della "chi", al layout swap desktop o alla modale mobile.

## Note dalla bozza ricevuta
La bozza contiene note interne da verificare (refuso "tre ragazzi e una ragazza", cognome Federico "Sassu Verdieri", bio non ancora riviste). Uso i testi così come sono nel file — se vuoi correzioni prima della pubblicazione, dimmi cosa cambiare e le aggiorno.

## Implementazione tecnica
1. In `src/routes/index.tsx`, aggiungo un rendering condizionale: se `card.title === "chi"` renderizzo un nuovo componente `<ChiContent />` invece del loop `card.bodyIndexes.map(...)`. Applicato in entrambi i punti di render (SwapCard desktop ~riga 337 e CardModal mobile ~riga 554), così il comportamento è identico sui due layout.
2. `ChiContent` usa `<details>/<summary>` nativo per i dropdown (accessibile, nessuna libreria) con styling Tailwind: header full-width, separatore sottile ink/10, chevron SVG che ruota via `group-open:rotate-180`.
3. Nessuna modifica a `MANIFESTO_PARAGRAPHS`, `CARDS` config (a parte eventualmente svuotare `bodyIndexes` di chi che diventa inutilizzato), o al sistema swap.