Modifica il componente `FlatEye` nella landing page riducendone le dimensioni del ~10% su tutti i breakpoint.

**File coinvolto:** `src/routes/index.tsx`

**Modifica da fare:**
Aggiornare l'hook `useEyePixelSize` (righe ~734-748) con i nuovi valori di pixel ridotti del 10%:

```text
Prima:
- mobile (<640px):     5px
- tablet (640-1024px): 7px
- desktop (1024-1536px): 10px
- large (>=1536px):    12px

Dopo:
- mobile (<640px):     4px
- tablet (640-1024px): 6px
- desktop (1024-1536px): 9px
- large (>=1536px):    11px
```

**Verifica:**
- Build passa senza errori.
- Gli occhi risultano visibilmente più piccoli in preview mantenendo proporzioni, posizione centrata sopra il titolo e animazione di blink.