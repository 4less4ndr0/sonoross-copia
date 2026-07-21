## Obiettivo
Aumentare la dimensione del titolo/headline "Perché nessuno dovrebbe invecchiare solo." su mobile in modo che occupi meglio lo spazio verticale disponibile, senza toccare altri elementi della landing page.

## Stato attuato
In `src/routes/index.tsx` l’H1 hero ha:
```tsx
fontSize: "clamp(2rem, 7vw, 4.5rem)",
lineHeight: 1.05,
```
Su un viewport mobile di ~393 px, `7vw` vale circa 27–28 px, quindi il `min` di `2rem` (32 px) domina. Il risultato è un titolo relativamente piccolo rispetto all’altezza dello schermo.

## Modifica proposta
1. **Aumentare il font-size mobile dell’H1 hero** portandolo a un valore che occupi più spazio verticale, es. `clamp(2.75rem, 10vw, 4.5rem)` o, in alternativa, usare una regola Tailwind responsive (`text-[...] sm:text-[...]`) per avere un controllo più netto tra mobile e desktop.
2. **Verificare il line-height** mantenendo `1.05` o leggermente più aperto (`1.08`) se il testo più grande risultasse troppo compatto.
3. **Controllare il padding/margin** circostante (`pb-[18vh]`, `mt-[10vh]`, `mt-6` del form) per assicurarsi che il titolo ingrandito non spinga il form o gli occhi fuori posizione; se necessario, ridurre leggermente i margini solo su mobile.
4. **Non modificare** font family, colore, posizionamento centrato, occhi, nuvole/card, manifesto, CTA, gradiente/sfondo.

## Criterio di accettazione
- Su mobile (viewport < 640 px) il titolo appare visibilmente più grande e riempie meglio la parte alta della hero.
- Gli elementi sottostanti (form email, occhi, scroll hint) restano visibili e ben posizionati, senza sovrapposizioni.
- Su desktop non cambia nulla o cambia in modo impercettibile.