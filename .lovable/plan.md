Riposiziono le 5 nuvole solo nella fascia bianca sopra l'orizzonte (che occupa ~34vh in basso), evitando la headline e il form al centro.

## Cambio in `src/routes/index.tsx`

Aggiorno l'array `CLOUDS` con nuove `positionClass` responsive. L'orizzonte parte da ~66% (desktop) / ~60% (mobile) dal top, quindi tutte le nuvole restano sopra quel limite. La headline+form occupa la fascia centrale ~30%–60%, quindi nella fascia centrale metto le nuvole solo ai bordi estremi (left <8% o right <8%).

Desktop (sm:):
- 3 nuvole in alto sopra la headline: `sm:top-[5%]` a left 5%, 45%, 78%
- 2 nuvole ai lati del form (fascia media, bordi estremi): `sm:top-[42%]` a `sm:left-[2%]` e `sm:right-[2%]`, dimensioni piccole (`sm:w-[10vw]`) per non toccare né form né orizzonte

Mobile:
- 3 in alto: `top-[3%]` left 6%, `top-[10%]` right 4%, `top-[17%]` left 30%
- 2 nella fascia bianca sotto il form ma sopra l'orizzonte (~top 48–54%), ai lati estremi: left 2% e right 2%

Nessun'altra modifica: occhi, orizzonte, headline e form restano invariati.