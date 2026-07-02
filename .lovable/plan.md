# Landing page one-pager

Sostituisco `src/routes/index.tsx` con una landing a schermo intero (h-screen, overflow-hidden — no scroll), organizzata come nello sketch.

## Layout

```
┌─────────────────────────────────────┐
│  ·  bubble   ·    bubble  ·  bubble │
│    bubble  "Perché nessuno    ·     │
│  ·      dovrebbe invecchiare bubble │
│  bubble        solo"     ·          │
│     ·   ┌──────────────┬─────┐  ·   │
│  bubble │  your@email  │  →  │bubble│
│    ·    └──────────────┴─────┘      │
│  bubble  ·    bubble    ·   bubble  │
│ ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲      │
│╱      ◕           ◕          ╲     │
└─────────────────────────────────────┘
```

## Elementi

**Sfondo**: crema tenue (`#faf7f2`).

**Headline** (centrata, sopra il form):
- "Perché nessuno dovrebbe invecchiare solo."
- Serif elegante (Instrument Serif), peso regular.

**Form email** (subito sotto la headline, centrato):
- Input rounded-full, button freccia integrato a destra.
- Nessun submit reale (solo UI, `onSubmit` preventDefault).

**Orizzonte** (parte bassa):
- Semiellisse che sborda dal basso, radial-gradient dai colori del logo (giallo caldo → arancio → rosa/magenta → sfumato).
- `filter: blur()` per look aurorale.

**Occhi** sull'orizzonte:
- 2 archi SVG (solo la curva superiore, come nel logo).
- Blink randomico indipendente: ogni 3–7s scaleY 1 → 0.1 → 1 in ~150ms via `setTimeout` ricorsivo.

**Bubbles floating** (tante, distribuite su TUTTA l'area):
- ~18–22 bubble sparse su tutto lo schermo (non solo intorno alla headline), incluse zone laterali, angoli e sopra l'orizzonte.
- Distribuzione a griglia jitterata: divido l'area in celle e piazzo una bubble per cella con offset random → copertura uniforme senza sovrapposizioni.
- Zona di rispetto attorno a headline+form: bubble in quell'area vengono spostate ai lati (evitano un rettangolo centrale ~40% × 25%).
- Mix di stili come nello sketch: ovali orizzontali outline sottile, alcune con codino da fumetto (piccolo triangolino in basso), dimensioni variabili (60–140px larghezza).
- Vuote (nessun testo).
- Animazione floating: 3–4 varianti di `@keyframes float` con ampiezze/direzioni/durate diverse (6–12s), delay random per ogni bubble → movimento organico non sincronizzato.
- Ogni bubble anche una leggera rotazione oscillante (±3°).

## File toccati

- `src/routes/index.tsx` — landing completa (componente `Index` + sotto-componenti `Bubble`, `BlinkingEye`, `Horizon`). Array di ~20 bubble con posizioni pre-calcolate e variante animazione.
- `src/styles.css` — keyframes `float-a/b/c/d`, `blink`, token colore logo (`--sunset-yellow`, `--sunset-orange`, `--sunset-pink`) in `:root` + `@theme inline`.
- `src/routes/__root.tsx` — `head()` con title + description reali. `<link>` per Instrument Serif da Google Fonts.

## Dettagli tecnici

- Container root: `h-screen overflow-hidden relative`.
- Bubbles in un layer `absolute inset-0 pointer-events-none` DIETRO headline/form (z-index inferiore) così non intercettano il click sull'input; l'orizzonte è ancora più in fondo.
- Orizzonte: `absolute bottom-0 left-1/2 -translate-x-1/2`, `width: 180vw; height: 60vh; border-radius: 50% 50% 0 0 / 100% 100% 0 0;` + radial-gradient.
- Occhi: SVG assoluti sopra l'arco a ~70% viewport height.
- Blink: hook `useBlink()` con `setTimeout` random 3–7s.
- Bubble positions: array statico definito nel file (top/left %, size, keyframe variant, delay) — riproducibile e controllabile, distribuito su tutta l'area evitando il rettangolo centrale.

## Fuori scope

- Nessuna validazione/submit email reale.
- Nessun testo dentro le bubbles.
- Layout desktop-first (responsive base).
