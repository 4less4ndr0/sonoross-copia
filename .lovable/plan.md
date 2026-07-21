## Problema

Attualmente la card attiva ha scroll interno (`overflow-y-auto` + `overscroll-contain`) dentro uno slot ad altezza fissa. La sezione hero è `h-screen overflow-hidden`, quindi non c'è alcuno scroll di pagina a cui "passare il testimone" quando si arriva in fondo.

## Opzioni

**A. Chain scroll verso la pagina (comportamento chiesto letteralmente)**
Trasformare la hero da `h-screen overflow-hidden` a contenitore che può crescere quando una card è attiva, così la pagina scrolla naturalmente oltre il viewport. Quando si chiude la card, si torna al layout one-pager.
- Pro: comportamento richiesto esatto.
- Contro: rompe l'illusione "no scroll" della landing e le altre 4 card restano appese al loro slot mentre la pagina scrolla (visivamente strano) — a meno di nasconderle o fissarle.

**B. Card attiva a tutto viewport (modale desktop)**
Quando si clicca una card, si espande a occupare quasi tutto il viewport (es. `90vw × 85vh`) sopra le altre, con scroll interno che così basta e non risulta più "tagliata". Le altre card restano al loro posto sotto.
- Pro: risolve il taglio senza introdurre scroll di pagina, coerente con l'idea one-pager.
- Contro: cambia l'interazione swap attuale (la manifesto non va più nello slot laterale, resta dietro).

**C. Slot desktop più alto**
Alzare l'altezza dello slot centrale (es. da attuale ~60vh a ~78vh) così il contenuto della card "chi" (l'unica lunga) rientra o richiede molto meno scroll. Mantiene lo scroll interno come fallback.
- Pro: minimo intervento, mantiene tutto il layout attuale.
- Contro: non è "scroll di pagina", è solo più spazio.

## Domanda

Quale preferisci? La A è quella che hai descritto letteralmente ma cambia la sensazione della landing; la B è probabilmente quella che risolve meglio senza rompere l'estetica one-pager.
