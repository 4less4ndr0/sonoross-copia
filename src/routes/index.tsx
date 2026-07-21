import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState, type FormEvent } from "react";

import { submitLead } from "@/lib/leads.functions";
import cloudChi from "@/assets/cloud-chi.jpg";
import cloudCosa from "@/assets/cloud-cosa.jpg";
import cloudCome from "@/assets/cloud-come.jpg";
import cloudPerche from "@/assets/cloud-perche.jpg";


export const Route = createFileRoute("/")({
  component: Index,
});

type ManifestoParagraph = { text: string; html?: string; italic?: boolean };
const MANIFESTO_PARAGRAPHS: ManifestoParagraph[] = [
  {
    text: "Le soluzioni che esistono oggi per chi vive solo in età avanzata nascono tutte dalla stessa domanda: come faccio a sapere se sta bene? Sensori di movimento, promemoria per le medicine, chiamate per sapere se ha fatto tutto quello che doveva. La cura pensata come sorveglianza riduce le persone ad un rischio da tenere d’occhio.",
  },
  {
    italic: true,
    text: "R.O.S.S. parte da una domanda diversa: e se lo strumento più potente non fosse il monitoraggio, ma la relazione?",
  },
  {
    text: "Non un sensore che segnala una caduta dopo che è già successa. Qualcosa che, prima ancora, tenga viva la parte di una persona che nessun dispositivo di sicurezza saprebbe mai toccare:",
    html: 'Non un sensore che segnala una caduta dopo che è già successa. Qualcosa che, prima ancora, tenga viva la parte di una persona che nessun dispositivo di sicurezza saprebbe mai toccare: <strong class="ross-highlight">i ricordi, le storie, la voglia di raccontarsi a qualcuno che ascolta davvero.</strong>',
  },
  {
    text: "Stiamo costruendo un compagno che stimola cognitivamente chi vive solo attraverso conversazioni adattive, personalizzate su una base di conoscenza biografica che guida ogni dialogo: la famiglia, le passioni, la storia di vita di ciascuno. Non un assistente che fa a tutti le stesse domande. Un'intelligenza che impara chi ha davanti: cosa ha fatto per una vita intera, chi ama, quali canzoni riportano a galla un ricordo preciso.",
  },
  {
    text: "Oggi, tra chi vive solo e la propria famiglia, la maggior parte delle parole scambiate riguarda la cura: ha mangiato, ha preso le medicine, che cosa ha detto il medico, bisognerebbe andare a trovarlo. È un problema reale e non lo eliminiamo. Ma quando si parla solo di questo, si diventa ciechi a tutto il resto e l'affetto, i ricordi, la voglia di raccontarsi spariscono sotto il peso della preoccupazione.",
    html: 'Oggi, tra chi vive solo e la propria famiglia, la maggior parte delle parole scambiate riguarda la cura: ha mangiato, ha preso le medicine, che cosa ha detto il medico, bisognerebbe andare a trovarlo. È un problema reale e non lo eliminiamo. Ma quando si parla solo di questo, <strong class="ross-highlight">si diventa ciechi</strong> a tutto il resto e l\'affetto, i ricordi, la voglia di raccontarsi spariscono sotto il peso della preoccupazione.',
  },
  {
    text: "R.O.S.S. ricostruisce quello che la paura ha eroso: vogliamo che almeno le conversazioni tornino ad essere sulle persone, non sulla gestione.",
  },
  {
    text: "Il modo in cui una persona racconta la propria giornata, quanto ha voglia di parlare, cosa sceglie di raccontare, quali ricordi torna a cercare, diventano lo stimolo cognitivo di cui ha bisogno e, per chi le vuole bene, un segnale di come sta.",
  },
  { text: "Non un dato biometrico. Una narrazione." },
  {
    text: "Oggi le famiglie parlano dei propri cari, non con loro. Ci si chiama tra familiari, ci si organizza, ci si preoccupa e chi vive solo viene interpellato solo per confermare cosa ha fatto o non ha fatto.",
  },
  {
    text: "R.O.S.S. lo rimette al centro della conversazione, non ai margini di una gestione.",
  },
];


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
  image: string;
  bodyIndexes: number[]; // which manifesto paragraphs to show in the modal
  desktop: Slot;
  mobile: Slot;
};

// Clouds are anchored image-cards along the borders of the manifesto glass card.
// Click opens a centered modal with the section content.
const CLOUDS: Cloud[] = [
  {
    variant: "a",
    delay: "0s",
    text: "chi",
    image: cloudChi,
    bodyIndexes: [0, 1],
    desktop: { top: "10%", left: "-22%", width: "22vw", maxWidth: "300px", rotate: -4 },
    mobile:  { top: "8%",  left: "-16%", width: "34vw", maxWidth: "220px", rotate: -4 },
  },
  {
    variant: "b",
    delay: "1.1s",
    text: "cosa",
    image: cloudCosa,
    bodyIndexes: [2, 3],
    desktop: { top: "66%", left: "-23%", width: "22vw", maxWidth: "300px", rotate: 3 },
    mobile:  { top: "64%", left: "-17%", width: "34vw", maxWidth: "220px", rotate: 3 },
  },
  {
    variant: "d",
    delay: "0.6s",
    text: "come",
    image: cloudCome,
    bodyIndexes: [4, 5, 6],
    desktop: { top: "20%", right: "-22%", width: "22vw", maxWidth: "300px", rotate: -2 },
    mobile:  { top: "18%", right: "-17%", width: "34vw", maxWidth: "220px", rotate: -2 },
  },
  {
    variant: "a",
    delay: "1.7s",
    text: "perché",
    image: cloudPerche,
    bodyIndexes: [7, 8, 9],
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

const EASE = "cubic-bezier(0.22,1,0.36,1)";
const HOVER_TRANSITION =
  `transform 480ms ${EASE}, opacity 300ms ease, box-shadow 400ms ease`;

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
  onOpen,
  isDesktop,
}: {
  c: Cloud;
  index: number;
  onOpen: (i: number) => void;
  isDesktop: boolean;
}) {
  const [isHover, setIsHover] = useState(false);
  const baseSlot = isDesktop ? c.desktop : c.mobile;
  const style: React.CSSProperties = {
    ...slotToStyle(baseSlot),
    transform: isHover
      ? `rotate(0deg) scale(1.06) translateY(-4px)`
      : `rotate(${baseSlot.rotate}deg)`,
    zIndex: isHover ? 50 : 5,
    opacity: 1,
    transition: HOVER_TRANSITION,
    willChange: "transform",
    animationPlayState: isHover ? "paused" : "running",
    animationDelay: c.delay,
  };

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onFocus={() => setIsHover(true)}
      onBlur={() => setIsHover(false)}
      aria-label={`Apri ${c.text}`}
      className={`group absolute float-${c.variant} pointer-events-auto cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EF9F27] rounded-[20px]`}
      style={style}
    >
      {/* terracotta halo */}
      <div
        aria-hidden
        className="absolute -inset-8 rounded-[32px] pointer-events-none transition-opacity duration-500"
        style={{
          background: "rgba(239, 159, 39, 0.45)",
          filter: "blur(44px)",
          opacity: isHover ? 1 : 0.8,
        }}
      />

      {/* image card */}
      <div
        className="relative overflow-hidden rounded-[20px]"
        style={{
          aspectRatio: "4 / 5",
          boxShadow: "0 10px 30px rgba(28,26,20,0.18)",
          border: "1px solid rgba(255,255,255,0.5)",
        }}
      >
        <img
          src={c.image}
          alt=""
          loading="lazy"
          width={800}
          height={1000}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* bottom gradient for legibility */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(28,26,20,0.72) 0%, rgba(28,26,20,0.35) 40%, rgba(28,26,20,0) 65%)",
          }}
        />
        {/* title bottom-left */}
        <h3
          className="absolute left-4 right-16 bottom-3 m-0 font-normal text-white"
          style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: "clamp(1.75rem, 14cqi, 3.25rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.02em",
            textShadow: "0 2px 12px rgba(0,0,0,0.35)",
          }}
        >
          {c.text}
        </h3>
        {/* + button bottom-right */}
        <span
          aria-hidden
          className="absolute right-3 bottom-3 flex items-center justify-center rounded-full text-white"
          style={{
            width: "clamp(28px, 12cqi, 44px)",
            height: "clamp(28px, 12cqi, 44px)",
            background: "rgba(255,255,255,0.22)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.5)",
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: "clamp(1rem, 6cqi, 1.5rem)",
            lineHeight: 1,
          }}
        >
          +
        </span>
      </div>
    </button>
  );
}

function CloudModal({
  cloud,
  onClose,
}: {
  cloud: Cloud;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={cloud.text}
      onClick={onClose}
      style={{
        background: "rgba(28,26,20,0.55)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[20px]"
        style={{
          background: "rgba(246,243,237,0.98)",
          border: "1px solid rgba(255,255,255,0.6)",
          boxShadow: "0 30px 80px rgba(28,26,20,0.35)",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Chiudi"
          className="absolute top-4 right-4 z-10 flex items-center justify-center rounded-full w-10 h-10 hover:opacity-80 transition"
          style={{
            background: "rgba(28,26,20,0.08)",
            color: "#1C1A14",
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: "1.25rem",
          }}
        >
          ×
        </button>
        <div className="p-8 sm:p-12">
          <h2
            className="m-0 font-normal"
            style={{
              fontFamily: '"Instrument Serif", serif',
              color: "#1C1A14",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {cloud.text}
          </h2>
          <div
            className="mt-6 space-y-5"
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              color: "#1C1A14",
              fontSize: "clamp(1rem, 1.15vw, 1.15rem)",
              lineHeight: 1.65,
            }}
          >
            {cloud.bodyIndexes.map((idx) => {
              const p = MANIFESTO_PARAGRAPHS[idx];
              if (!p) return null;
              if (p.italic) {
                return (
                  <p
                    key={idx}
                    className="italic"
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                  >
                    <strong>{p.text}</strong>
                  </p>
                );
              }
              return (
                <p key={idx} dangerouslySetInnerHTML={{ __html: p.html ?? p.text }} />
              );
            })}
          </div>
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
  const [activeCloud, setActiveCloud] = useState<number | null>(null);
  const eyesClosed = useBlink(2500, 6000);
  const pixelSize = usePixelSize();
  const isDesktop = useIsDesktop();
  const submit = useServerFn(submitLead);

  const anyActive = activeCloud !== null;
  const activeSlot =
    activeCloud !== null
      ? isDesktop
        ? CLOUDS[activeCloud].desktop
        : CLOUDS[activeCloud].mobile
      : null;

  const toggleCloud = (i: number) =>
    setActiveCloud((prev) => (prev === i ? null : i));

  useEffect(() => {
    if (!anyActive) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveCloud(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [anyActive]);


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
              className="relative z-10 text-center text-[clamp(2.75rem,10vw,4.5rem)] sm:text-[clamp(2rem,7vw,4.5rem)]"
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontWeight: 400,
                lineHeight: 1.05,
                color: "#1C1A14",
              }}
            >
              Perché nessuno dovrebbe invecchiare solo.
            </h1>

            <div className="relative z-10 mx-auto mt-6 sm:mt-8 w-full max-w-md">
              <div
                aria-hidden
                className="absolute -inset-3 rounded-full pointer-events-none"
                style={{
                  background: "rgba(239, 159, 39, 0.55)",
                  filter: "blur(18px)",
                }}
              />
              <form
                onSubmit={onSubmit}
                className="relative z-10 flex items-center gap-2 rounded-full pl-5 sm:pl-6 pr-2 py-2 shadow-sm w-full"
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
            </div>
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
          {/* Sizer: keeps the wrapper the same height as the full manifesto */}
          <div
            aria-hidden
            className="invisible pointer-events-none rounded-[20px] p-6 sm:p-12 space-y-6"
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: "clamp(1.1rem, 1.3vw, 1.3rem)",
              lineHeight: 1.65,
            }}
          >
            {MANIFESTO_PARAGRAPHS.map((p, i) => (
              <p key={i}>{p.text}</p>
            ))}
          </div>

          {/* Cloud cards — absolute, click to swap with manifesto */}
          {CLOUDS.map((c, i) => (
            <CloudShape
              key={i}
              c={c}
              index={i}
              isActive={activeCloud === i}
              anyActive={anyActive}
              onToggle={toggleCloud}
              isDesktop={isDesktop}
            />
          ))}

          {/* Manifesto glass card — absolute, swaps with clouds */}
          <div
            className="absolute"
            style={{
              top: anyActive && activeSlot ? activeSlot.top : "0",
              left: anyActive && activeSlot ? activeSlot.left : "0",
              right: anyActive && activeSlot ? activeSlot.right : "0",
              bottom: anyActive ? "auto" : "0",
              width: anyActive && activeSlot ? activeSlot.width : "auto",
              maxWidth: anyActive && activeSlot ? activeSlot.maxWidth : "none",
              transform: anyActive && activeSlot ? `rotate(${activeSlot.rotate}deg)` : "rotate(0deg)",
              zIndex: 10,
              transition: TRANSITION,
            }}
          >
            <div
              aria-hidden
              className="absolute -inset-8 rounded-[32px] pointer-events-none transition-opacity duration-500"
              style={{
                background: "rgba(239, 159, 39, 0.45)",
                filter: "blur(44px)",
                opacity: anyActive ? 0.8 : 0,
              }}
            />
          <button
            type="button"
            onClick={anyActive ? () => setActiveCloud(null) : undefined}
            aria-label={anyActive ? "Torna al manifesto" : "Manifesto"}
            className={`relative w-full text-left rounded-[20px] p-6 sm:p-12 space-y-6 focus:outline-none ${
              anyActive ? "cursor-pointer" : "cursor-default"
            }`}
            style={{
              aspectRatio: anyActive ? "4 / 3" : undefined,
              transition: TRANSITION,
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(20px) saturate(140%)",
              WebkitBackdropFilter: "blur(20px) saturate(140%)",
              border: "1px solid rgba(255,255,255,0.5)",
              boxShadow: "0 24px 70px rgba(28, 26, 20, 0.12)",
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: anyActive ? "clamp(0.75rem, 1.1cqi, 1rem)" : "clamp(1.1rem, 1.3vw, 1.3rem)",
              fontWeight: 400,
              lineHeight: 1.65,
              letterSpacing: "-0.005em",
              color: "#1C1A14",
              overflow: "hidden",
              containerType: "inline-size",
            }}
          >
            {anyActive ? (
              <div className="flex flex-col items-center justify-center text-center h-full animate-fade-in">
                <h3
                  className="m-0 font-normal"
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    color: "#1a1a1a",
                    fontSize: "clamp(2rem, 20cqi, 4.5rem)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                  }}
                >
                  manifesto
                </h3>
              </div>
            ) : (
              MANIFESTO_PARAGRAPHS.map((p, i) =>
                p.italic ? (
                  <p
                    key={i}
                    className="italic"
                    style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
                  >
                    <strong>{p.text}</strong>
                  </p>
                ) : (
                  <p key={i} dangerouslySetInnerHTML={{ __html: p.html ?? p.text }} />
                )
              )
            )}
          </button>
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
