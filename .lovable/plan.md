## Problema

Il carosello ha due bug di hover che si combinano e causano il "misalignment":

1. **Salto verticale sotto il cursore.** `StackCard` ha `hover:-translate-y-1` sul `<button>`: quando il mouse entra su una card, la card si sposta di 4px verso l'alto. Se il cursore era vicino al bordo alto della card, esce dal bounding box → il `:hover` si spegne → la card torna giù → rientra sotto il cursore → e così via (flicker). Questo si percepisce come "hover che seleziona la card sbagliata".

2. **Halo che sfora e si sovrappone tra card vicine.** L'halo terracotta usa `-inset-4` + `blur(26px)` sullo stesso elemento del bottone. Con `group-hover` su un `<button>` che ha anche il translate, l'area effettiva di hover si estende oltre la card e si accavalla con la card adiacente nel gap, alimentando lo stesso flicker.

Un dettaglio correlato: la pausa è agganciata solo al wrapper esterno (`onMouseEnter/Leave` sul contenitore del carosello). Se il flicker fa perdere hover al wrapper (non dovrebbe, ma con `translate` e gap stretti può succedere in edge case), il track riparte per una manciata di ms — e si vede lo scatto orizzontale.

## Fix (solo carosello desktop, tutto in `src/routes/index.tsx`)

1. **Rimuovere `hover:-translate-y-1` dal bottone di `StackCard`.** Nessun movimento della card sotto il cursore → nessun flicker di hover. L'effetto di "attivazione" resta comunque visibile grazie a: focus ring, halo, e (nuovo) leggero scale sul contenuto interno (vedi punto 3).

2. **Isolare l'halo dentro l'area della card.** Ridurre `-inset-4` → `-inset-1` (o `inset-0` con blur più contenuto) così l'halo non sfora nel gap tra due card e non "prende" hover dal vicino. Mantenere l'aspetto ammorbidendo `blur` (es. `18–20px`) e opacità come ora.

3. **(Opzionale, per compensare la perdita del lift)** Applicare un piccolissimo `group-hover:scale-[1.02]` **solo alla cornice interna** (non al bottone che riceve l'hover), così l'area di hit-test del bottone resta fissa e non si autoescludes.

4. **Pausa più robusta.** In aggiunta al listener sul wrapper, tenere pausa anche se il puntatore è sopra una singola card: aggiungere `onMouseEnter/Leave` (che settano `pausedRef.current`) al wrapper della singola card dentro `.map(...)`. Nessun cambio di logica RAF.

## Cosa NON cambia

- Velocità del carosello, direzione, duplicazione delle card, RAF loop.
- Colore terracotta dell'halo, layout mobile, modale, hero, occhi, font.
- Comportamento click → apre `CardModal`.

## Verifica

- Build.
- Playwright: hover lento dal bordo sinistro fino al centro di una card, screenshot per confermare: (a) la card non si sposta, (b) l'halo compare solo su quella card, (c) il track resta fermo per tutta la durata dell'hover.