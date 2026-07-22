## Obiettivo
Aggiungere una cornice glass/gloss sottile intorno a ciascuna delle 4 card della landing page (Cosa, Chi, Manifesto, Perché), mantenendo le foto attuali all'interno e rispettando il design system R.O.S.S.

## Stile scelto
- **Tipo:** cornice glass/frosted sottile
- **Colori:** sfondo bianco/crema semi-trasparente, bordo chiaro, ombra morbida ink; al hover alone terracotta (#EF9F27)
- **Raggio:** angoli arrotondati 20-24 px, coerente con il resto dell'interfaccia
- **Spessore:** cornice sottile con piccolo margine interno (passe-partout leggero)

## Modifiche previste

### 1. Componente `StackCard` in `src/routes/index.tsx`
- Aggiungere un **wrapper esterno** attorno alla card attuale che funzioni da cornice.
- La cornice avrà:
  - `background: rgba(255, 255, 255, 0.30-0.40)`
  - `backdrop-filter: blur(...)` (senza prefisso `-webkit-` manuale)
  - `border: 1px solid rgba(255, 255, 255, 0.55-0.65)`
  - `border-radius: 24px` (leggermente più grande del raggio interno)
  - `padding: 8-12px` (desktop) / `6-8px` (mobile)
  - ombra diffusa `0 20px 50px rgba(28, 26, 20, 0.10-0.14)`
  - highlight interno `inset 0 1px 0 rgba(255,255,255,0.8)`
- Spostare l'**alone terracotta al hover** dietro la cornice esterna in modo che avvolga l'intera card cornice compresa.
- Mantenere la card interna con raggio 20px, foto a copertura, testo in basso a sinistra e bottone freccia in basso a destra.
- Mantenere le animazioni e le interazioni esistenti (hover lift, scale al tap, click → apertura modale).

### 2. Adattamenti responsive
- La cornice si applica sia alla **stack mobile** che alla **griglia desktop 2×2**.
- Ridurre leggermente padding e ombre su schermi piccoli per non appesantire il layout.

### 3. Cosa NON cambia
- Foto, titoli, sottotitoli e testi delle card.
- Logica di apertura modale (`CardModal`) e contenuti interni.
- Posizionamento della griglia e dello stack.
- Occhi, hero, form email e sezione finale.

## Verifica
- Build TypeScript senza errori.
- Verifica visiva sul preview che ogni card abbia la cornice glass, l'alone terracotta al hover e che le foto restino visibili all'interno.
- Controllo rapido su viewport mobile per confermare che la cornice non rompa la stack.