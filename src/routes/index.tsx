import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import cloudAsset from "@/assets/cloud.png.asset.json";

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
              fontFamily: 'Georgia, "Times New Roman", serif',
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
  const eyesClosed = useBlink(2500, 6000);
  const pixelSize = usePixelSize();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };


  return (
    <main
      className="relative w-full overflow-x-hidden"
      style={{
        background:
          "radial-gradient(ellipse 92vw 78vh at 50% 100vh, #ffd166 0%, #ff9b3d 22%, #f4506c 46%, #d94892 68%, rgba(217,72,146,0) 100%), linear-gradient(180deg, #faf7f2 0vh, #faf7f2 50vh, #f7c8b0 72vh, #ec8ea6 88vh, #d94892 108vh, #c43d82 138vh, #8d2d66 190vh, #3a1230 270vh)",
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
            className="text-center max-w-3xl"
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontWeight: 400,
              fontSize: "clamp(2rem, 7vw, 4.5rem)",
              lineHeight: 1.05,
              color: "#1a1a1a",
            }}
          >
            Perché nessuno dovrebbe invecchiare solo.
          </h1>

          <form
            onSubmit={onSubmit}
            className="mt-6 sm:mt-8 flex items-center gap-2 bg-white rounded-full pl-5 sm:pl-6 pr-2 py-2 shadow-sm border border-neutral-200 w-full max-w-md"
            style={{ fontFamily: '"DM Sans", system-ui, sans-serif' }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Il tuo indirizzo email"
              className="flex-1 min-w-0 bg-transparent outline-none py-2"
              style={{ color: "#1a1a1a" }}
            />
            <button
              type="submit"
              aria-label="Iscriviti"
              className="shrink-0 rounded-full w-10 h-10 flex items-center justify-center transition-colors"
              style={{ background: "#1a1a1a", color: "#faf7f2" }}
            >
              →
            </button>
          </form>
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
            Ogni giorno, in migliaia di case, una telefonata si riduce a un controllo:
            ha mangiato? ha preso le medicine? è uscito? si è fatto male?
          </p>

          <p>In famiglia ci si scrive per organizzarsi —</p>
          <ul className="list-none space-y-2 pl-6" style={{ opacity: 0.85 }}>
            <li>— chi va a trovarlo questo weekend</li>
            <li>— chi ha sentito il medico</li>
            <li>— chi si sente in colpa per non essere abbastanza presente.</li>
          </ul>

          <p>
            Viene interpellato solo per confermare cosa è successo o non è successo.
            Non gli si chiede più come sta davvero. Il problema pratico occupa tutto lo spazio.
          </p>

          <p>
            Ma il problema non è mai stato solo la sicurezza.
            Le soluzioni che esistono oggi — sensori, promemoria, dispositivi di controllo —
            nascono tutte dalla stessa domanda: <em>come monitorarlo?</em>
          </p>

          <p
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontStyle: "italic",
              fontSize: "clamp(1.5rem, 2.6vw, 2.1rem)",
              lineHeight: 1.25,
              color: "#ffd9a8",
            }}
          >
            E se lo strumento più potente non fosse clinico, ma relazionale?
          </p>

          <p>
            La parte più difficile della solitudine non è il rischio fisico.
            È che nessuno gli chiede più di raccontare — e quando qualcuno lo fa,
            lui torna a stare meglio, a ricordare, a parlare.
          </p>

          <p>
            <strong style={{ fontWeight: 500, letterSpacing: "0.14em" }}>R.O.S.S.</strong>{" "}
            nasce per riportare al centro la famiglia con la propria storia, i ricordi e le persone che ne fanno parte.
          </p>
        </div>
      </section>
    </main>
  );
}
