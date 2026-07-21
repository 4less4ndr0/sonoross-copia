## Fix: layout responsive differenziato

La modifica precedente (5 card impilate) deve valere **solo su mobile**. Su desktop va ripristinato il layout precedente (manifesto glass card centrale + 4 cloud card ancorate ai bordi con hover peek e modale al click).

### Approccio
- Mantenere entrambe le implementazioni nello stesso file `src/routes/index.tsx`.
- Usare l'hook `useIsDesktop()` (breakpoint 640px) — va reintrodotto — per switchare tra i due rendering nella sezione narrative.
- Alternativa CSS: `hidden sm:block` / `sm:hidden` sui due wrapper. Preferisco questa via, così evito flicker SSR e non serve JS di gating.

### Desktop (≥ 640px) — ripristino
Ripristinare esattamente il blocco precedente:
- Wrapper `w-[58vw] max-w-5xl` centrato con sizer invisibile che dà l'altezza al contenitore.
- 4 `CloudShape` (chi, cosa, come, perché) posizionate in absolute lungo i bordi con `desktop` slot (top/left/right/rotate) e halo terracotta, hover peek (z-index 50, scale, rotate 0), floating animation `float-a/b/c/d`.
- Glass card manifesto fissa al centro (`rgba(255,255,255,0.55)`, backdrop-blur, boxShadow attuale) che contiene i `MANIFESTO_PARAGRAPHS` inline (con `.ross-highlight`, italic Georgia per il paragrafo italic).
- Click sulla cloud → apre `CardModal` (già esistente).
- Nessuna manifesto card fra le 4 cloud su desktop: il manifesto è la glass card centrale, come prima.

### Mobile (< 640px) — resta com'è ora
- Colonna `max-w-[640px]` con 5 `StackCard` (manifesto + 4) impilate, aspect 16/10, click apre modale.

### Componenti/stato
- Reintrodurre `CloudShape` (image-card ancorato con slot desktop, halo, hover peek) accanto al `StackCard`.
- Reintrodurre `type Cloud`/`Slot` e array `CLOUDS` (solo 4: chi/cosa/come/perché) con le stesse coordinate desktop del layout precedente.
- `CARDS` per mobile resta com'è (5 elementi, incluso manifesto).
- Modale unico `CardModal` condiviso: apertura da entrambi i layout tramite lo stesso stato `activeCard`. Su desktop, cliccando una cloud, si passa l'indice della card corrispondente in `CARDS` (offset +1, perché mobile ha manifesto a indice 0).
- Chiusura Esc/× invariata.

### Cosa NON cambia
- Hero, form email, halo terracotta, occhi, scroll indicator, sezione finale scura, palette, font, `MANIFESTO_PARAGRAPHS`, `CloudModal`.
- Nessun asset nuovo (l'immagine `cloud-manifesto.jpg` resta in progetto, usata solo dal layout mobile).

### File toccato
- `src/routes/index.tsx` — unico file modificato.
