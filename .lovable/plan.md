## Problemi rilevati

**1. Immagine "cosa" — la foto c'è, ma è inquadrata male**
Il file `src/assets/cloud-cosa.jpg` esiste e viene caricato correttamente (visibile in DevTools). Contiene la foto del componente hardware firmato dal team. Il problema è l'inquadratura: con `object-position: center` viene mostrata la parte metallica centrale (grigia), che sommata al gradiente scuro in basso fa sembrare la card un gradiente vuoto. Le firme e i dettagli interessanti stanno nella metà sinistra/bassa dell'immagine.

**2. Click sulle card — nei test il modal si apre correttamente**
Ho verificato via preview: cliccando una card, il modal (`z-[100]`, opacity 1) si monta effettivamente sopra la pagina. Non ho trovato un handler che lo chiuda subito. Possibili cause residue da confermare mentre correggo:
- interazione con la vecchia logica di swap desktop rimasta come stato "morto" nel componente;
- eventuale overlay invisibile (halo terracotta) che intercetta l'hover ma non il click.

## Modifiche proposte (solo `src/routes/index.tsx`)

### A. Inquadratura foto "cosa"
- Cambiare `objectPosition` della card `cosa` da `center` a qualcosa tipo `30% 65%`, così si vedono le firme sulla piastra metallica invece del vuoto in alto.
- Applicare lo stesso `objectPosition` anche dentro il `CardModal` (attualmente solo la manifesto ha un override), così quando si apre la card l'inquadratura resta coerente.

### B. Click sulle card
- Rileggere `StackCard` + `CardModal` e rimuovere qualsiasi residuo del vecchio sistema di swap desktop (state/ref inutilizzati come `lastCardRef` se non più necessario) che potrebbe generare stati inconsistenti.
- Aggiungere `pointer-events-auto` esplicito sulla sezione delle card e assicurarmi che l'halo terracotta rimanga `pointer-events-none` (già così, ma verifico dopo il refactor).
- Verificare al termine cliccando ciascuna delle 4 card in desktop (1321×910) e in mobile che il modal si apra e si chiuda regolarmente, incluso click multipli in sequenza.

## Fuori scopo
Nessuna modifica a font, palette, testi, gerarchia della griglia 2×2 o al layout mobile stacked.
