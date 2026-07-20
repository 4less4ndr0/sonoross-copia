import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState, type FormEvent } from "react";
import cloudAsset from "@/assets/cloud.png.asset.json";
import { submitLead } from "@/lib/leads.functions";

export const Route = createFileRoute("/")({
  component: Index,
});

type Cloud = {
  positionClass: string;
  widthClass: string;
  variant: "a" | "b" | "c" | "d";
  delay: string;
  rotate: number;
  text: string;
  hideOnMobile?: boolean;
};

// Clouds grouped around the manifesto glass card (framing it, not decoration).
const CLOUDS: Cloud[] = [
  {
    // top-left, above card, partially behind
    positionClass: "-top-[6%] -left-[6%] sm:-top-[8%] sm:-left-[10%]",
    widthClass: "w-[46vw] max-w-[300px] sm:w-[26vw] sm:max-w-[320px]",
    variant: "a",
    delay: "0s",
    rotate: -3,
    text: "Per chi ha ancora\ntante cose da raccontare.",
  },
  {
    // top-right, above card, partially behind
    positionClass: "-top-[4%] -right-[6%] sm:-top-[10%] sm:-right-[10%]",
    widthClass: "w-[46vw] max-w-[300px] sm:w-[26vw] sm:max-w-[320px]",
    variant: "b",
    delay: "1.1s",
    rotate: 2,
    text: "La distanza\nnon deve significare silenzio.",
  },
  {
    // center-back, only desktop, larger and behind
    positionClass: "top-[30%] left-1/2 -translate-x-1/2",
    widthClass: "w-[38vw] max-w-[420px]",
    variant: "c",
    delay: "2.2s",
    rotate: 2,
    text: "Chi ama, vuole sapere\ncome stai davvero.",
    hideOnMobile: true,
  },
  {
    // bottom-left
    positionClass: "-bottom-[4%] -left-[8%] sm:-bottom-[6%] sm:-left-[10%]",
    widthClass: "w-[46vw] max-w-[300px] sm:w-[26vw] sm:max-w-[320px]",
    variant: "d",
    delay: "0.6s",
    rotate: -1,
    text: "Una compagnia che ascolta,\nnon che controlla.",
  },
  {
    // bottom-right
    positionClass: "-bottom-[6%] -right-[8%] sm:-bottom-[8%] sm:-right-[10%]",
    widthClass: "w-[46vw] max-w-[300px] sm:w-[26vw] sm:max-w-[320px]",
    variant: "a",
    delay: "1.7s",
    rotate: 3,
    text: "Ogni giorno ha\nuna storia da raccontare.",
  },
];

function CloudShape({ c }: { c: Cloud }) {
  return (
    <div
      className={`absolute ${c.positionClass} ${c.widthClass} float-${c.variant} ${c.hideOnMobile ? "hidden sm:block" : ""}`}
      style={{
        animationDelay: c.delay,
        transform: `rotate(${c.rotate}deg)`,
      }}
    >
      <div className="relative w-full">
        <img
          src={cloudAsset.url}
          alt=""
          className="w-full h-auto select-none"
          draggable={false}
          style={{
            filter: "drop-shadow(0 10px 20px rgba(80, 90, 130, 0.15))",
          }}
        />
        <div
          className="absolute flex items-center justify-center"
          style={{
            left: "50%",
            top: "53%",
            width: "58%",
            height: "40%",
            transform: `translate(-50%, -50%) rotate(${-c.rotate}deg)`,
          }}
        >
          <p
            className="text-center"
            style={{
              fontFamily: '"Instrument Serif", serif',
              color: "#1a1a1a",
              fontSize: "clamp(0.72rem, 1.15vw, 1rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
              whiteSpace: "pre-line",
              textWrap: "balance",
              textShadow:
                "0 1px 0 rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.65)",
            }}
          >
            {c.text}
          </p>
        </div>
      </div>
    </div>
  );
}

function useBlink(minMs: number, maxMs: number) {
  const [closed, setClosed] = useState(false);
  useEffect(() => {
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    const loop = () => {
      const wait = minMs + Math.random() * (maxMs - minMs);
      t1 = setTimeout(() => {
        setClosed(true);
        t2 = setTimeout(() => {
          setClosed(false);
          loop();
        }, 150);
      }, wait);
    };
    loop();
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [minMs, maxMs]);
  return closed;
}

const COLS = 8;
const FULL_ROWS = [
  [0, 0, 0, 1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
];
const ROWS_COUNT = FULL_ROWS.length;

function usePixelSize() {
  const [px, setPx] = useState(6);
  useEffect(() => {
    const update = () => {
      const vmin = Math.min(window.innerWidth, window.innerHeight);
      setPx(Math.max(6, Math.min(10, Math.round(vmin * 0.012))));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return px;
}

function FlatEye({ className, closed, pixelSize }: { className?: string; closed: boolean; pixelSize: number }) {
  const gap = 1;
  const rows = closed
    ? FULL_ROWS.map(() => Array(COLS).fill(0)).map((r, i) =>
        i === 6 || i === 7 ? [0, 0, 0, 1, 1, 0, 0, 0] : r
      )
    : FULL_ROWS;

  return (
    <div
      className={`absolute ${className ?? ""}`}
      style={{
        top: "80%",
        transform: "translate(-50%, -50%)",
        width: COLS * pixelSize + (COLS - 1) * gap,
        height: ROWS_COUNT * pixelSize + (ROWS_COUNT - 1) * gap,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${pixelSize}px)`,
          gap,
        }}
      >
        {rows.map((row, r) =>
          row.map((on, c) => (
            <div
              key={`${r}-${c}`}
              style={{
                width: pixelSize,
                height: pixelSize,
                background: on ? "#FFFFFF" : "transparent",
                boxShadow: on ? "0 0 3px rgba(255,255,255,0.9), 0 0 6px rgba(255,255,255,0.6)" : undefined,
                transition: "background 120ms ease, box-shadow 120ms ease",
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Small header logo: two static eyes, ink pixels on cream.
function EyeLogo() {
  const px = 2;
  const gap = 1;
  return (
    <div className="flex items-center gap-[6px]" aria-label="R.O.S.S." role="img">
      {[0, 1].map((i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${COLS}, ${px}px)`,
            gap,
          }}
        >
          {FULL_ROWS.map((row, r) =>
            row.map((on, c) => (
              <div
                key={`${r}-${c}`}
                style={{
                  width: px,
                  height: px,
                  background: on ? "#1C1A14" : "transparent",
                }}
              />
            ))
          )}
        </div>
      ))}
    </div>
  );
}

function Index() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const eyesClosed = useBlink(2500, 6000);
  const pixelSize = usePixelSize();
  const submit = useServerFn(submitLead);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await submit({ data: { email } });
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main
      className="relative w-full overflow-x-hidden"
      style={{
        background:
          "linear-gradient(180deg, #F6F3ED 0vh, #F6F3ED 35vh, #cfe9d9 75vh, #5DCAA5 130vh, #5DCAA5 200vh, #1C1A14 320vh, #1C1A14 400vh)",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[5]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px 240px",
          opacity: 0.08,
          mixBlendMode: "overlay",
        }}
      />

      {/* HERO */}
      <section className="relative z-10 h-screen w-full overflow-hidden">
        {/* Header logo (eyes as brand mark) */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-30">
          <EyeLogo />
        </div>

        {/* Centered content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-5 sm:px-6 pb-[34vh] sm:pb-[36vh]">
          <h1
            className="text-center max-w-3xl"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 400,
              fontSize: "clamp(2rem, 7vw, 4.5rem)",
              lineHeight: 1.05,
              color: "#1C1A14",
            }}
          >
            Perché nessuno dovrebbe invecchiare solo.
          </h1>

          <form
            onSubmit={onSubmit}
            className="mt-6 sm:mt-8 flex items-center gap-2 rounded-full pl-5 sm:pl-6 pr-2 py-2 shadow-sm w-full max-w-md"
            style={{
              backgroundColor: "#F6F3ED",
              border: "1px solid rgba(28,26,20,0.14)",
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Il tuo indirizzo email"
              disabled={status === "loading"}
              className="flex-1 min-w-0 bg-transparent outline-none py-2 disabled:opacity-60 placeholder:text-neutral-500"
              style={{ color: "#1C1A14" }}
            />
            <button
              type="submit"
              aria-label="Iscriviti"
              disabled={status === "loading"}
              className="shrink-0 rounded-full w-10 h-10 flex items-center justify-center transition-opacity disabled:opacity-60 hover:opacity-90"
              style={{ backgroundColor: "#1C1A14", color: "#F6F3ED" }}
            >
              →
            </button>
          </form>
          <div
            className="mt-3 h-5 text-sm text-center"
            style={{ fontFamily: '"DM Sans", system-ui, sans-serif', color: "#1C1A14" }}
            aria-live="polite"
          >
            {status === "success" && "Grazie, ti scriveremo presto."}
            {status === "error" && "Qualcosa è andato storto, riprova."}
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 text-[10px] tracking-[0.25em] uppercase animate-bounce pointer-events-none"
          style={{ color: "rgba(28,26,20,0.7)" }}
        >
          ↓ scroll
        </div>

        {/* Eyes on the horizon */}
        <FlatEye className="left-[38%] sm:left-[43%]" closed={eyesClosed} pixelSize={pixelSize} />
        <FlatEye className="left-[62%] sm:left-[57%]" closed={eyesClosed} pixelSize={pixelSize} />
      </section>

      {/* NARRATIVE — glass card framed by clouds */}
      <section className="relative w-full py-24 sm:py-32 px-6 sm:px-8">
        <div className="relative max-w-2xl mx-auto">
          {/* Clouds cluster around the card */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {CLOUDS.map((c, i) => (
              <CloudShape key={i} c={c} />
            ))}
          </div>

          {/* Glass card */}
          <div
            className="relative z-10 rounded-[20px] p-6 sm:p-12 space-y-6"
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(20px) saturate(140%)",
              border: "1px solid rgba(255,255,255,0.5)",
              boxShadow: "0 20px 60px -20px rgba(28,26,20,0.18)",
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: "clamp(1.1rem, 1.3vw, 1.3rem)",
              fontWeight: 400,
              lineHeight: 1.65,
              letterSpacing: "-0.005em",
              color: "#1C1A14",
            }}
          >
            <p>
              Le soluzioni che esistono oggi per chi vive solo in età avanzata nascono tutte dalla stessa domanda: come faccio a sapere se sta bene? Sensori di movimento, promemoria per le medicine, chiamate per sapere se ha fatto tutto quello che doveva. La cura pensata come sorveglianza riduce le persone ad un rischio da tenere d’occhio.
            </p>

            <p className="italic" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
              <strong>R.O.S.S. parte da una domanda diversa: e se lo strumento più potente non fosse il monitoraggio, ma la relazione?</strong>
            </p>

            <p>
              Non un sensore che segnala una caduta dopo che è già successa. Qualcosa che, prima ancora, tenga viva la parte di una persona che nessun dispositivo di sicurezza saprebbe mai toccare: <strong>i ricordi, le storie, la voglia di raccontarsi a qualcuno che ascolta davvero.</strong>
            </p>

            <p>
              Stiamo costruendo un compagno che stimola cognitivamente chi vive solo attraverso conversazioni adattive, personalizzate su una base di conoscenza biografica che guida ogni dialogo: la famiglia, le passioni, la storia di vita di ciascuno. Non un assistente che fa a tutti le stesse domande. Un'intelligenza che impara chi ha davanti: cosa ha fatto per una vita intera, chi ama, quali canzoni riportano a galla un ricordo preciso.
            </p>

            <p>
              Oggi, tra chi vive solo e la propria famiglia, la maggior parte delle parole scambiate riguarda la cura: ha mangiato, ha preso le medicine, che cosa ha detto il medico, bisognerebbe andare a trovarlo. È un problema reale e non lo eliminiamo. Ma quando si parla solo di questo, <strong>si diventa ciechi</strong> a tutto il resto e l'affetto, i ricordi, la voglia di raccontarsi spariscono sotto il peso della preoccupazione.
            </p>

            <p>
              R.O.S.S. ricostruisce quello che la paura ha eroso: vogliamo che almeno le conversazioni tornino ad essere sulle persone, non sulla gestione.
            </p>

            <p>
              Il modo in cui una persona racconta la propria giornata, quanto ha voglia di parlare, cosa sceglie di raccontare, quali ricordi torna a cercare, diventano lo stimolo cognitivo di cui ha bisogno e, per chi le vuole bene, un segnale di come sta.
            </p>

            <p>Non un dato biometrico. Una narrazione.</p>

            <p>
              Oggi le famiglie parlano dei propri cari, non con loro. Ci si chiama tra familiari, ci si organizza, ci si preoccupa e chi vive solo viene interpellato solo per confermare cosa ha fatto o non ha fatto.
            </p>

            <p>
              R.O.S.S. lo rimette al centro della conversazione, non ai margini di una gestione.
            </p>
          </div>
        </div>

        {/* Closing line — on the dark tail of the gradient, light text */}
        <div
          className="relative z-10 max-w-2xl mx-auto mt-32 sm:mt-48 text-center"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            color: "#F6F3ED",
            fontSize: "clamp(1.4rem, 2vw, 1.9rem)",
            lineHeight: 1.35,
          }}
        >
          <strong>Per questo R.O.S.S. non sorveglia. Dà voce.</strong>
        </div>
      </section>
    </main>
  );
}
