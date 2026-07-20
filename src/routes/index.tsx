import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState, type FormEvent } from "react";

import { submitLead } from "@/lib/leads.functions";

export const Route = createFileRoute("/")({
  component: Index,
});

type Slot = {
  top: string;
  left?: string;
  right?: string;
  width: string;
  maxWidth?: string;
  rotate: number;
};

type Cloud = {
  variant: "a" | "b" | "c" | "d";
  delay: string;
  text: string;
  body: string;
  desktop: Slot;
  mobile: Slot;
};

// Clouds sit BEHIND the manifesto glass card; only a small portion peeks out.
// On click they SWAP with the manifesto card.
const CLOUDS: Cloud[] = [
  {
    variant: "a",
    delay: "0s",
    text: "chi",
    body: "Chi vive solo, non chi va sorvegliato. Al centro c'è la persona, con la sua storia, non un rischio da monitorare.",
    desktop: { top: "10%", left: "-22%", width: "22vw", maxWidth: "300px", rotate: -4 },
    mobile:  { top: "8%",  left: "-16%", width: "34vw", maxWidth: "220px", rotate: -4 },
  },
  {
    variant: "b",
    delay: "1.1s",
    text: "cosa",
    body: "Un compagno conversazionale che stimola cognitivamente attraverso il racconto: ricordi, passioni, storia di vita.",
    desktop: { top: "66%", left: "-23%", width: "22vw", maxWidth: "300px", rotate: 3 },
    mobile:  { top: "64%", left: "-17%", width: "34vw", maxWidth: "220px", rotate: 3 },
  },
  {
    variant: "d",
    delay: "0.6s",
    text: "come",
    body: "Adattandosi a chi ha davanti: famiglia, passioni, biografia. Non domande uguali per tutti, un dialogo su misura.",
    desktop: { top: "20%", right: "-22%", width: "22vw", maxWidth: "300px", rotate: -2 },
    mobile:  { top: "18%", right: "-17%", width: "34vw", maxWidth: "220px", rotate: -2 },
  },
  {
    variant: "a",
    delay: "1.7s",
    text: "perché",
    body: "Perché la relazione, non il monitoraggio, è lo strumento più potente di cura. Rimettere le persone al centro.",
    desktop: { top: "72%", right: "-23%", width: "22vw", maxWidth: "300px", rotate: 4 },
    mobile:  { top: "70%", right: "-16%", width: "34vw", maxWidth: "220px", rotate: 4 },
  },
];

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const on = () => setIsDesktop(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return isDesktop;
}

const TRANSITION =
  "top 600ms cubic-bezier(0.22,1,0.36,1), left 600ms cubic-bezier(0.22,1,0.36,1), right 600ms cubic-bezier(0.22,1,0.36,1), bottom 600ms cubic-bezier(0.22,1,0.36,1), width 600ms cubic-bezier(0.22,1,0.36,1), max-width 600ms cubic-bezier(0.22,1,0.36,1), transform 600ms cubic-bezier(0.22,1,0.36,1), opacity 400ms ease";

function slotToStyle(s: Slot): React.CSSProperties {
  return {
    top: s.top,
    left: s.left,
    right: s.right,
    width: s.width,
    maxWidth: s.maxWidth,
    transform: `rotate(${s.rotate}deg)`,
  };
}

function CloudShape({
  c,
  index,
  isActive,
  anyActive,
  onToggle,
  isDesktop,
}: {
  c: Cloud;
  index: number;
  isActive: boolean;
  anyActive: boolean;
  onToggle: (i: number) => void;
  isDesktop: boolean;
}) {
  const baseSlot = isDesktop ? c.desktop : c.mobile;
  const style: React.CSSProperties = isActive
    ? {
        top: "0",
        left: "0",
        right: "0",
        width: "auto",
        maxWidth: "none",
        transform: "rotate(0deg)",
        zIndex: 30,
        transition: TRANSITION,
        animationDelay: c.delay,
      }
    : {
        ...slotToStyle(baseSlot),
        zIndex: anyActive ? 1 : 5,
        opacity: anyActive ? 0.55 : 1,
        transition: TRANSITION,
        animationDelay: c.delay,
      };

  return (
    <button
      type="button"
      onClick={() => onToggle(index)}
      aria-expanded={isActive}
      aria-label={c.text}
      className={`group absolute float-${c.variant} pointer-events-auto cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF9F27] rounded-[20px] ${
        !isActive && !anyActive ? "hover:scale-[1.04] hover:z-20" : ""
      }`}
      style={style}
    >
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[32px] pointer-events-none transition-opacity duration-500"
        style={{
          background: "rgba(239, 159, 39, 0.45)",
          filter: "blur(44px)",
          opacity: isActive ? 1 : anyActive ? 0.35 : 0.8,
        }}
      />

      <div
        className="relative flex flex-col items-center justify-center text-center rounded-[20px] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          background: "rgba(255,255,255,0.65)",
          backdropFilter: "blur(20px) saturate(140%)",
          WebkitBackdropFilter: "blur(20px) saturate(140%)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 10px 30px rgba(28,26,20,0.08)",
          containerType: "inline-size",
          padding: isActive ? "clamp(32px, 5cqi, 64px)" : "clamp(14px, 6cqi, 32px)",
          aspectRatio: isActive ? "auto" : "4 / 3",
          minHeight: isActive ? "100%" : undefined,
          gap: isActive ? "1.5rem" : 0,
        }}
      >
        <h3
          className="m-0 font-normal"
          style={{
            fontFamily: '"Instrument Serif", serif',
            color: "#1a1a1a",
            fontSize: isActive
              ? "clamp(3rem, 8cqi, 6rem)"
              : "clamp(2.4rem, 22cqi, 5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          {c.text}
        </h3>
        {isActive && (
          <p
            className="max-w-2xl animate-fade-in"
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              color: "#1C1A14",
              fontSize: "clamp(1rem, 1.4cqi, 1.4rem)",
              lineHeight: 1.55,
              opacity: 0.85,
            }}
          >
            {c.body}
          </p>
        )}
      </div>
    </button>
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
      className={className ?? ""}
      style={{
        width: COLS * pixelSize + (COLS - 1) * gap,
        height: ROWS_COUNT * pixelSize + (ROWS_COUNT - 1) * gap,
        filter:
          "drop-shadow(0 2px 3px rgba(28,26,20,0.35)) drop-shadow(0 0 1px rgba(28,26,20,0.45))",
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
    <div
      className="flex items-center gap-[6px]"
      aria-label="R.O.S.S."
      role="img"
      style={{
        filter: "drop-shadow(0 1px 5px rgba(28,26,20,0.12))",
      }}
    >
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




function GridBackdrop() {
  // Graph-paper grid in #97C459 that fades to transparent at the edges (radial mask).
  const line = "rgba(151, 196, 89, 0.22)";
  const cell = "44px";
  return (
    <div
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        zIndex: 0,
        backgroundImage: `
          linear-gradient(to right, ${line} 1px, transparent 1px),
          linear-gradient(to bottom, ${line} 1px, transparent 1px)
        `,
        backgroundSize: `${cell} ${cell}, ${cell} ${cell}`,
        WebkitMaskImage:
          "radial-gradient(ellipse 55% 55% at 50% 50%, #000 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.35) 70%, transparent 100%)",
        maskImage:
          "radial-gradient(ellipse 55% 55% at 50% 50%, #000 0%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.35) 70%, transparent 100%)",
      }}
    />
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
        background: "#F6F3ED",
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
        {/* Centered content */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-5 sm:px-6 pb-[18vh] sm:pb-[20vh]">
          <div className="relative w-full max-w-3xl mt-[10vh] sm:mt-[12vh]">
            <h1
              className="relative z-10 text-center"
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
              className="relative z-10 mx-auto mt-6 sm:mt-8 flex items-center gap-2 rounded-full pl-5 sm:pl-6 pr-2 py-2 shadow-sm w-full max-w-md"
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
                style={{ backgroundColor: "var(--ross-terra)", color: "var(--ross-ink)" }}
              >
                →
              </button>
            </form>
            <div
              className="relative z-10 mt-3 h-5 text-sm text-center"
              style={{ fontFamily: '"DM Sans", system-ui, sans-serif', color: "#1C1A14" }}
              aria-live="polite"
            >
              {status === "success" && "Grazie, ti scriveremo presto."}
              {status === "error" && "Qualcosa è andato storto, riprova."}
            </div>
          </div>
        </div>

        {/* Faded grid background */}
        <GridBackdrop />

        {/* Eyes + scroll hint grouped below the headline */}
        <div className="absolute top-[78%] left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-6 pointer-events-none">
          <div className="flex items-start gap-[10vw] sm:gap-[12vw]">
            <FlatEye closed={eyesClosed} pixelSize={pixelSize} />
            <FlatEye closed={eyesClosed} pixelSize={pixelSize} />
          </div>
          <div
            className="text-[10px] tracking-[0.25em] uppercase animate-bounce"
            style={{ color: "rgba(28,26,20,0.7)" }}
          >
            ↓ scroll
          </div>
        </div>
      </section>

      {/* NARRATIVE */}
      <section className="relative w-full py-24 sm:py-32 px-6 sm:px-8">
        <div className="relative w-[58vw] max-w-5xl mx-auto">
          {/* Cloud cards tucked BEHIND the manifesto glass card */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            {CLOUDS.map((c, i) => (
              <CloudShape key={i} c={c} />
            ))}
          </div>


          {/* Glass card — sits above the clouds so they only peek from the sides */}
          <div
            className="relative z-10 rounded-[20px] p-6 sm:p-12 space-y-6"
            style={{
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(20px) saturate(140%)",
              border: "1px solid rgba(255,255,255,0.5)",
              boxShadow: "0 24px 70px rgba(28, 26, 20, 0.12)",
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
              Non un sensore che segnala una caduta dopo che è già successa. Qualcosa che, prima ancora, tenga viva la parte di una persona che nessun dispositivo di sicurezza saprebbe mai toccare: <strong className="ross-highlight">i ricordi, le storie, la voglia di raccontarsi a qualcuno che ascolta davvero.</strong>
            </p>

            <p>
              Stiamo costruendo un compagno che stimola cognitivamente chi vive solo attraverso conversazioni adattive, personalizzate su una base di conoscenza biografica che guida ogni dialogo: la famiglia, le passioni, la storia di vita di ciascuno. Non un assistente che fa a tutti le stesse domande. Un'intelligenza che impara chi ha davanti: cosa ha fatto per una vita intera, chi ama, quali canzoni riportano a galla un ricordo preciso.
            </p>

            <p>
              Oggi, tra chi vive solo e la propria famiglia, la maggior parte delle parole scambiate riguarda la cura: ha mangiato, ha preso le medicine, che cosa ha detto il medico, bisognerebbe andare a trovarlo. È un problema reale e non lo eliminiamo. Ma quando si parla solo di questo, <strong className="ross-highlight">si diventa ciechi</strong> a tutto il resto e l'affetto, i ricordi, la voglia di raccontarsi spariscono sotto il peso della preoccupazione.
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
          className="relative z-10 max-w-2xl mx-auto mt-10 sm:mt-14 text-center"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            color: "#1C1A14",
            fontSize: "clamp(1.4rem, 2vw, 1.9rem)",
            lineHeight: 1.35,
          }}
        >
          <strong className="ross-highlight">Per questo R.O.S.S. non sorveglia. Dà voce.</strong>
        </div>
      </section>
    </main>
  );
}
