## Diagnosi
Nello screenshot si vede una linea netta tra la fine dell'hero (rosa acceso #d94892) e l'inizio della narrativa. Cause:
1. L'hero e la narrativa hanno **due background separati**. Anche se il colore di giunzione è nominalmente lo stesso, il gradient dell'hero è calcolato sull'altezza dell'hero (100vh) e quello della narrativa sulla propria altezza — le due rampe non sono continue.
2. La narrativa parte con `linear-gradient(180deg, #d94892 0%, #b83a7a 22%, ...)`: già dal primo pixel la rampa scurisce, quindi il match col rosa dell'hero non è mai davvero uguale a occhio.
3. L'alone dell'orizzonte è blur(6px), quindi ai bordi laterali il rosa dell'hero non è pieno #d94892 ma un mix col crema più chiaro sopra — creando un ulteriore mismatch.

## Fix: un unico gradiente continuo su tutta la pagina

1. **Rimuovere il background dall'hero e dalla narrativa.** Spostare un unico `background` su `<main>` che copre l'intera altezza della pagina.
2. Definirlo con color-stops in **vh** (non in %), così la rampa è ancorata al viewport e si allinea alla giunzione:
   - `0vh → 100vh` (hero): crema → arancio-rosa → magenta pieno
   - `100vh → fine` (narrativa): magenta → viola scuro → plum quasi nero
   
   Esempio:
   ```
   background: linear-gradient(180deg,
     #faf7f2 0vh,
     #faf7f2 55vh,
     #f7c8b0 75vh,
     #ec8ea6 90vh,
     #d94892 100vh,
     #b83a7a 130vh,
     #7a2456 180vh,
     #3a1230 260vh
   );
   ```
3. Aggiornare l'orizzonte: la parte trasparente della radial passa a `rgba(217,72,146,0)` (già fatto) — così sfuma sul rosa del main invece che sul crema.
4. Il testo scroll-hint torna leggibile sul rosa: cambiare colore da `text-neutral-500` a bianco/60% opacity.

## Verifica
- Screenshot Playwright a scroll = 100vh (giunzione hero/narrativa) per confermare zero linea visibile.
- Screenshot a metà narrativa per confermare che il testo resta leggibile sul viola-plum.

Nessun'altra modifica.
