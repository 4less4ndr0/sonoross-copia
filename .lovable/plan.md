Modifica il layout della landing page in `src/routes/index.tsx` per ridurre lo spazio vuoto sopra gli occhi e renderlo uguale allo spazio visibile tra la sezione hero (form email) e il carosello di card.

Passaggi:
1. Ispezionare la struttura attuale del hero (`h-screen`, flex centering, `mt-[2vh] sm:mt-[4vh]`, `pb-[10vh] sm:pb-[12vh]`).
2. Ridurre il margine superiore del contenitore interno del hero e/o regolare il padding verticale in modo che lo spazio sopra gli occhi corrisponda al gap hero-card (attualmente gestito dalla negative margin `-mt-[18vh] sm:-mt-[22vh]` della sezione card).
3. Mantenere il centramento orizzontale, la dimensione degli occhi, il blink e la posizione centrata sopra il headline.
4. Verificare la coerenza su desktop e mobile senza rompere il carosello o il modal.

Nessuna modifica a font, colori, copy, occhi, card o logica di interazione.