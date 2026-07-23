## Fix spaziatura mobile

Obiettivo: su mobile la distanza tra il bordo superiore e gli occhi deve essere uguale alla distanza tra l'email form e la parte visibile delle card.

Attualmente su mobile:
- `pt-[12vh]` sopra gli occhi
- `-mt-[22vh]` sulle card (troppo poco → gap grande sotto il form)

Modifica in `src/routes/index.tsx`:
- Ridurre padding-top hero mobile da `pt-[12vh]` a `pt-[8vh]` (desktop invariato a `sm:pt-[10vh]`)
- Aumentare pull-up card mobile da `-mt-[22vh]` a `-mt-[30vh]` (desktop invariato a `sm:-mt-[28vh]`)

Verifica con screenshot Playwright a 393×852 che i due gap risultino visivamente equivalenti; se necessario piccolo tuning di ±2vh.