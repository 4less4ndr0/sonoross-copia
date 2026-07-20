Obiettivo: ingrandire le 4 card nuvola (chi / cosa / come / perché) che incorniciano la glass card del manifesto, e scalarne il testo di conseguenza, senza alterare font, occhi, posizionamento del contact lead e struttura verticale.

Modifiche previste in `src/routes/index.tsx`:

1. Dimensioni card
   - Aumentare `widthClass` delle voci in `CLOUDS` da `w-[22vw] max-w-[140px]` a `w-[30vw] max-w-[200px]` (desktop) e da `w-[16vw] max-w-[210px]` a `w-[20vw] max-w-[260px]`.
   - Aumentare la dimensione hover da `hover:!w-[min(78vw,460px)]` a `hover:!w-[min(82vw,520px)]` per mantenere leggibilità quando si aprono.
   - Spostare leggermente le card verso l’esterno (es. `-left-[8%]` → `-left-[10%]`, `-right-[9%]` → `-right-[11%]`) così restano nascoste dietro la glass card ma il bordo visibile è più generoso.

2. Testo nelle card
   - Aumentare il `fontSize` in `CloudShape` da `clamp(1.4rem, 14cqi, 3rem)` a `clamp(1.7rem, 16cqi, 3.4rem)`.
   - Aumentare il padding interno da `clamp(12px, 5cqi, 26px)` a `clamp(14px, 6cqi, 32px)`.
   - Mantenere `Instrument Serif`, ink, line-height 1.1.

3. Effetto halo
   - Lasciare invariato il bagliore sage light al 23% con blur 40px; non serve modificarlo.

4. Verifica
   - Controllare in preview che le card, sia ferme che in hover, non coprano testo del manifesto e che su mobile la card più a sinistra non vada fuori viewport.
   - Se necessario, aggiustare i valori di offset e dimensione massima in un secondo micro-passaggio.