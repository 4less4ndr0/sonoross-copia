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

// 5 floating clouds with phrases inside.
const CLOUDS: Cloud[] = [
  {
    positionClass: "top-[2%] left-[3%] sm:top-[4%] sm:left-[3%]",
    widthClass: "w-[42vw] max-w-[320px] sm:w-[22vw] sm:max-w-[270px]",
    variant: "a",
    delay: "0s",
    rotate: -3,
    text: "Per chi ha ancora\ntante cose da raccontare.",
  },
  {
    positionClass: "top-[10%] right-[3%] sm:top-[3%] sm:left-[41%]",
    widthClass: "w-[44vw] max-w-[340px] sm:w-[23vw] sm:max-w-[280px]",
    variant: "b",
    delay: "1.1s",
    rotate: 2,
    text: "La distanza\nnon deve significare silenzio.",
  },
  {
    positionClass: "top-[20%] left-[28%] sm:top-[5%] sm:right-[3%] sm:left-auto",
    widthClass: "w-[42vw] max-w-[320px] sm:w-[22vw] sm:max-w-[270px]",
    variant: "c",
    delay: "2.2s",
    rotate: 2,
    text: "Chi ama, vuole sapere\ncome stai davvero.",
    hideOnMobile: true,
  },
  {
    positionClass: "top-[46%] left-[2%] sm:top-[40%] sm:left-[1%]",
    widthClass: "w-[42vw] max-w-[320px] sm:w-[21vw] sm:max-w-[260px]",
    variant: "d",
    delay: "0.6s",
    rotate: -1,
    text: "Una compagnia che ascolta,\nnon che controlla.",
  },
  {
    positionClass: "top-[50%] right-[2%] sm:top-[42%] sm:right-[1%] sm:left-auto",
    widthClass: "w-[42vw] max-w-[320px] sm:w-[21vw] sm:max-w-[260px]",
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
        {/* Inner text plate: sits on the flat "heart" of the cloud (measured body center ~53%) */}
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
      // bigger on mobile: ~6px at 390 vmin, ~8px at 760, capped at 10
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
          "radial-gradient(ellipse 92vw 78vh at 50% 100vh, #ffd166 0%, #ff9b3d 22%, #f4506c 46%, #d94892 68%, rgba(217,72,146,0) 100%), linear-gradient(180deg, #faf7f2 0vh, #faf7f2 50vh, #f7c8b0 72vh, #ec8ea6 88vh, #d94892 108vh, #c43d82 138vh, #8d2d66 190vh, #3a1230 270vh, #3a1230 400vh)",
        backgroundRepeat: "no-repeat",
      }}

    >
      <div
        className="absolute left-1/2 pointer-events-none z-0"
        style={{
          top: "calc(100vh - clamp(240px, 36vh, 410px))",
          width: "min(168vw, 1500px)",
          height: "clamp(560px, 82vh, 820px)",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at 50% 44%, #ffd166 0%, #ff9b3d 22%, #f4506c 46%, #d94892 68%, rgba(217,72,146,0) 94%)",
          filter: "blur(8px)",
        }}
      />
      {/* HERO — first screen */}
      <section className="relative z-10 h-screen w-full overflow-hidden">



        {/* Clouds */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {CLOUDS.map((c, i) => (
            <CloudShape key={i} c={c} />
          ))}
        </div>

        {/* Centered content (headline + email) — sits ABOVE the horizon */}
        <div className="relative z-20 h-full flex flex-col items-center justify-center px-5 sm:px-6 pb-[34vh] sm:pb-[36vh]">
          <h1
            className="text-center text-neutral-900 max-w-3xl"
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontWeight: 400,
              fontSize: "clamp(2rem, 7vw, 4.5rem)",
              lineHeight: 1.05,
            }}
          >
            Perché nessuno dovrebbe invecchiare solo.
          </h1>

          <form
            onSubmit={onSubmit}
            className="mt-6 sm:mt-8 flex items-center gap-2 bg-white rounded-full pl-5 sm:pl-6 pr-2 py-2 shadow-sm border border-neutral-200 w-full max-w-md"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Il tuo indirizzo email"
              disabled={status === "loading"}
              className="flex-1 min-w-0 bg-transparent outline-none text-neutral-800 placeholder:text-neutral-400 py-2 disabled:opacity-60"
            />
            <button
              type="submit"
              aria-label="Iscriviti"
              disabled={status === "loading"}
              className="shrink-0 rounded-full bg-neutral-900 text-white w-10 h-10 flex items-center justify-center hover:bg-neutral-700 transition-colors disabled:opacity-60"
            >
              →
            </button>
          </form>
          <div
            className="mt-3 h-5 text-sm text-center"
            style={{ fontFamily: '"DM Sans", system-ui, sans-serif', color: "#3a1230" }}
            aria-live="polite"
          >
            {status === "success" && "Grazie, ti scriveremo presto."}
            {status === "error" && "Qualcosa è andato storto, riprova."}
          </div>

        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 text-white/70 text-[10px] tracking-[0.25em] uppercase animate-bounce pointer-events-none"
        >
          ↓ scroll
        </div>

        {/* Flat pixel eyes on the horizon */}
        <FlatEye className="left-[38%] sm:left-[43%]" closed={eyesClosed} pixelSize={pixelSize} />
        <FlatEye className="left-[62%] sm:left-[57%]" closed={eyesClosed} pixelSize={pixelSize} />
      </section>

      {/* NARRATIVE — revealed on scroll, inherits gradient from main */}
      <section
        className="relative w-full py-24 sm:py-32 px-6 sm:px-8"
        style={{
          color: "#faf1e6",
        }}
      >
        <div
          className="max-w-2xl mx-auto space-y-6"
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: "clamp(1rem, 1.15vw, 1.15rem)",
            fontWeight: 400,
            lineHeight: 1.65,
            letterSpacing: "-0.005em",
          }}
        >

          <p>
            Le soluzioni che esistono oggi per chi vive solo in età avanzata nascono tutte dalla stessa domanda: come faccio a sapere se sta bene? Sensori di movimento, promemoria per le medicine, chiamate per sapere se ha fatto tutto quello che doveva. La cura pensata come sorveglianza riduce le persone ad un rischio da tenere d’occhio.
          </p>

          <p>
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

          <p>
            Non un dato biometrico. Una narrazione.
          </p>

          <p>
            Oggi le famiglie parlano dei propri cari, non con loro. Ci si chiama tra familiari, ci si organizza, ci si preoccupa e chi vive solo viene interpellato solo per confermare cosa ha fatto o non ha fatto.
          </p>

          <p>
            R.O.S.S. lo rimette al centro della conversazione, non ai margini di una gestione.
          </p>

          <p style={{ fontSize: "clamp(1.15rem, 1.5vw, 1.35rem)", fontWeight: 500, lineHeight: 1.4 }}>
            <strong>Per questo R.O.S.S. non sorveglia. Dà voce.</strong>
          </p>
        </div>
      </section>

    </main>
  );
}
