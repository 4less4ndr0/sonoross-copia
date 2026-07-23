Problema: la distanza verticale tra il form email (nel hero) e la sezione card è troppo ampia, sia su mobile che su desktop.

Soluzione: stringere l'intercapedine agendo sui due punti di controllo del layout:

1. **Hero bottom padding** — ridurre `pb-[6vh] sm:pb-[8vh]` del container interno del hero per avvicinare il fondo del form alla sezione sottostante.
2. **Cards negative margin** — aumentare il valore negativo di `-mt-[30vh] sm:-mt-[28vh]` della sezione card per farla salire ulteriormente verso il form.

File da modificare:
- `src/routes/index.tsx` (hero container e sezione card)

Verifica:
- Controllare in preview che il form email e la prima card non siano troppo distanti, senza però sovrapporre gli occhi o il testo del hero.
- Verificare sia su mobile che su desktop.

Nessuna modifica a font, colori, occhi, posizionamento delle nuvole/card, copy o logica di submit.