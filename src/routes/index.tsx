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
    widthClass: "w-[42vw] max-w-[320px] sm:w-[19vw] sm:max-w-[240px]",
    variant: "a",
    delay: "0s",
    rotate: -3,
    text: "Per chi ha ancora tante cose da raccontare.",
  },
  {
    positionClass: "top-[10%] right-[3%] sm:top-[3%] sm:left-[41%]",
    widthClass: "w-[44vw] max-w-[340px] sm:w-[20vw] sm:max-w-[250px]",
    variant: "b",
    delay: "1.1s",
    rotate: 2,
    text: "La distanza non deve significare silenzio.",
  },
  {
    positionClass: "top-[20%] left-[28%] sm:top-[5%] sm:right-[3%] sm:left-auto",
    widthClass: "w-[42vw] max-w-[320px] sm:w-[19vw] sm:max-w-[240px]",
    variant: "c",
    delay: "2.2s",
    rotate: 2,
    text: "Chi ama, vuole sapere come stai davvero.",
  },
  {
    positionClass: "top-[46%] left-[2%] sm:top-[40%] sm:left-[1%]",
    widthClass: "w-[42vw] max-w-[320px] sm:w-[18vw] sm:max-w-[230px]",
    variant: "d",
    delay: "0.6s",
    rotate: -1,
    text: "Una compagnia che ascolta, non che controlla.",
  },
  {
    positionClass: "top-[50%] right-[2%] sm:top-[42%] sm:right-[1%] sm:left-auto",
    widthClass: "w-[42vw] max-w-[320px] sm:w-[18vw] sm:max-w-[230px]",
    variant: "a",
    delay: "1.7s",
    rotate: 3,
    text: "Ogni giorno ha una storia da raccontare.",
  },
];

function CloudShape({ c }: { c: Cloud }) {
  return (
    <div
      className={`absolute ${c.positionClass} ${c.widthClass} float-${c.variant}`}
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
          className="absolute inset-0 flex items-center justify-center px-[16%] pt-[6%] pb-[10%]"
          style={{ transform: `rotate(${-c.rotate}deg)` }}
        >
          <p
            className="text-center text-neutral-800 leading-tight"
            style={{
              fontFamily: '"Instrument Serif", serif',
              fontSize: "clamp(0.7rem, 1.7vw, 1.05rem)",
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
      className="relative h-screen w-screen overflow-hidden"
      style={{ backgroundColor: "#faf7f2" }}
    >
      {/* Bubbles */}
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
            className="flex-1 min-w-0 bg-transparent outline-none text-neutral-800 placeholder:text-neutral-400 py-2"
          />
          <button
            type="submit"
            aria-label="Iscriviti"
            className="shrink-0 rounded-full bg-neutral-900 text-white w-10 h-10 flex items-center justify-center hover:bg-neutral-700 transition-colors"
          >
            →
          </button>
        </form>
      </div>

      {/* Horizon — fluid, sits below the email form */}
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none z-0"
        style={{
          width: "min(160vw, 1400px)",
          height: "clamp(220px, 34vh, 380px)",
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          background:
            "radial-gradient(ellipse at 50% 100%, #ffd166 0%, #ff8a3d 25%, #f4506c 50%, #d94892 68%, rgba(250,247,242,0) 82%)",
          filter: "blur(6px)",
        }}
      />

      {/* Flat pixel eyes on the horizon — bigger and more separated on mobile */}
      <FlatEye className="left-[38%] sm:left-[43%]" closed={eyesClosed} pixelSize={pixelSize} />
      <FlatEye className="left-[62%] sm:left-[57%]" closed={eyesClosed} pixelSize={pixelSize} />
    </main>
  );
}
