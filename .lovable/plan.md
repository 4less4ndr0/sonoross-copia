Aggiorno solo `src/routes/index.tsx` (più, se serve, `src/styles.css` per una piccola utility). Font, occhi orizzonte, form e posizionamento del contact lead restano identici.

## 1. Palette / gradiente
Sostituisco l'attuale gradiente crema→terra→teal→ink con una transizione contenuta a due soli colori nella parte "cielo":
- `linear-gradient(180deg, #F6F3ED 0vh, #F6F3ED 35vh, #cfe9d9 75vh, #5DCAA5 130vh, #5DCAA5 200vh, #1C1A14 320vh, #1C1A14 400vh)`
- Cream (#F6F3ED) in alto → Teal (#5DCAA5) a livello orizzonte/dopo lo scroll, poi discesa in Ink solo nella coda scura del manifesto finale (fascia scura conservata perché ospita il testo chiaro).
- Rimossi arancione/terra e verde-giallo dal gradient. Sage `#97C459` non entra nel gradient.
- L'orizzonte visivo (dove stanno gli occhi) diventa quindi teal pieno: gli occhi bianchi mantengono il contrasto richiesto.

## 2. Nuvole → cornice del manifesto
Oggi le 5 nuvole sono sparse ai 4 angoli dell'hero. Le sposto tutte nella sezione narrativa, disposte intorno alla nuova glass card come cornice:
- 2 nuvole in alto-sinistra e alto-destra sopra la card, parzialmente dietro
- 2 nuvole in basso-sinistra e basso-destra sotto la card, parzialmente dietro
- 1 nuvola dietro-centro (nascosta su mobile con `hideOnMobile`) leggermente scalata
- Le coordinate diventano relative al container della sezione (con `position: relative` sulla section e nuvole `absolute` dentro), non più al viewport dell'hero.
- Z-index: nuvole `z-0`, glass card `z-10`.
- Rimosse dall'hero: l'hero resta pulito (solo headline + form + occhi).

## 3. Glass card intorno al manifesto
Avvolgo il blocco `.max-w-2xl` del manifesto in una card con:
- `background: rgba(255,255,255,0.55)`, `backdrop-filter: blur(20px) saturate(140%)`
- `border: 1px solid rgba(255,255,255,0.5)`
- `border-radius: 20px`
- padding generoso (`p-8 sm:p-12`)
- ombra morbida
- Testo interno resta Ink (`#1C1A14`) su vetro chiaro — contrasto ok. Rimuovo `color: #F6F3ED` dalla sezione.
- Il paragrafo finale ("Per questo R.O.S.S. non sorveglia. Dà voce.") lo estraggo FUORI dalla card, sotto, dove il gradiente è già Ink: lì resta testo chiaro (`#F6F3ED`) su sfondo scuro, con contrasto verificato. Nessun testo chiaro su fasce chiare.

## 4. Logo occhi nell'header
Non c'è ancora un wordmark "R.O.S.S." visibile: aggiungo direttamente un piccolo header fisso in alto a sinistra con una versione ridotta degli occhi come logo:
- Componente `EyeLogo` derivato da `FlatEye` ma:
  - `pixelSize` fisso ~2px, gap 1px
  - Due occhi affiancati, gap ~6px
  - Colore pixel `#1C1A14` (non bianco) per stare su Cream nell'hero, con transizione a `#F6F3ED` quando lo sfondo diventa scuro (via `mix-blend-mode: difference` sul wrapper, oppure semplicemente colore fisso Ink: l'header sparisce sotto lo scroll perché `position: absolute top-0` non fixed → più semplice, evitiamo problemi di contrasto e sorveglianza)
  - Blink sincronizzato usando lo stesso `useBlink` (o statico, senza blink, per non risultare "sorvegliante"). Scelta: **statico**, occhi aperti fermi = presenza e ascolto, no blink continuo che darebbe effetto sorveglianza.
- Posizione: `absolute top-4 left-4 sm:top-6 sm:left-6 z-30` dentro l'hero section.
- Altezza ~24-28px per matching l'altezza tipica di un header logo.
- Nessun testo accanto.

## 5. Cose che non tocco
Font (Georgia, Instrument Serif per le nuvole, DM Sans), `FlatEye` grande sull'orizzonte, posizione headline + form, testo copy manifesto, grain overlay, animazioni `float-*`.

## Verifica
Ricarico `/`, controllo:
- Solo cream→teal→ink nel gradient (no arancio/giallo)
- Nuvole clusterizzate intorno alla glass card manifesto, non più nell'hero
- Header con occhi in alto a sinistra
- Glass card leggibile, con testo scuro su vetro chiaro; frase finale fuori card su fondo scuro con testo chiaro