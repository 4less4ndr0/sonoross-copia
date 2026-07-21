## Diagnosi

Il hook `useBlink` funziona ed è collegato: `eyesClosed` viene passato a entrambi i `FlatEye`. Il problema è nel rendering dello stato "chiuso" combinato con la nuova dimensione ridotta (pixelSize=3).

Quando `closed` è true, `FlatEye` sostituisce tutte le righe con zeri tranne le righe 6 e 7, che vengono forzate a `[0,0,0,1,1,0,0,0]`. A pixelSize=3 significa che durante il blink si vedono solo 2 pixel bianchi larghi 6px — praticamente invisibili sul cream. Prima, con occhi grandi, quei 2 pixel erano abbastanza grossi da leggersi come "occhio chiuso"; ora scompaiono e basta, quindi sembra che il blink non avvenga.

## Modifica proposta (solo `src/routes/index.tsx`, funzione `FlatEye`)

Cambiare la rappresentazione dello stato chiuso da "2 pixel centrali" a una fessura orizzontale larga quanto l'occhio, così a qualsiasi dimensione il blink resta visibile:

- Righe 6 e 7 (le due centrali) → `[0, 1, 1, 1, 1, 1, 1, 0]` invece di `[0, 0, 0, 1, 1, 0, 0, 0]`.
- Tutte le altre righe restano vuote come ora.

Risultato: durante il blink l'occhio si "schiaccia" in una linea orizzontale che copre la stessa larghezza dell'occhio aperto — leggibile anche a pixelSize=3.

## Fuori scopo

Nessuna modifica a posizione, dimensione, timing del blink, o al resto della pagina.