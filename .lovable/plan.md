## Problema

Sul monitor desktop del tuo screenshot le card si sovrappongono all'headline. La causa è strutturale: l'hero è `h-screen` (100vh) e la sezione card viene tirata su con `lg:-mt-[28vh]`. Su monitor con aspect ratio diverso (ultrawide, 16:10) il contenuto dell'hero finisce a un'altezza diversa in vh, quindi il margine negativo fisso o lascia troppo spazio o crea overlap. È fragile per definizione.

## Fix definitivo

In `src/routes/index.tsx`:

**Riga 881 (hero section):**
- `h-screen` → `min-h-screen lg:min-h-0`
- così su desktop l'hero si dimensiona al contenuto, non al viewport

**Riga 882 (hero inner padding):**
- aggiungere `lg:pt-24 lg:pb-16` (rem, non vh) per un padding verticale prevedibile su desktop
- mobile/tablet restano con i valori `vh` attuali già approvati

**Riga 913 (cards section):**
- `lg:-mt-[28vh] … lg:pt-4` → `lg:mt-0 lg:pt-0`
- niente più margine negativo su desktop: il flow naturale garantisce zero overlap
- mobile (`-mt-[42vh]`), sm (`-mt-[34vh]`), md (`-mt-[44vh]`) invariati

## Verifica

Screenshot Playwright a 1440×900, 1920×1080 e 2560×1080 (ultrawide) per confermare:
1. Zero overlap tra form e carosello a qualsiasi aspect ratio
2. Gap costante e visivamente equilibrato
3. Mobile e tablet inalterati
