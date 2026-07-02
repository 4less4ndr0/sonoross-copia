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
};

// 5 floating clouds. Mobile: 3 in top band, 2 in white space above horizon.
// Desktop: 3 above the headline, 2 near the eyes.
const CLOUDS: Cloud[] = [
  {
    positionClass: "top-[50%] left-[4%] sm:top-[36%] sm:left-[3%]",
    widthClass: "w-[32vw] max-w-[340px] sm:w-[13vw] sm:max-w-[190px]",
    variant: "a",
    delay: "0s",
    rotate: -3,
  },
  {
    positionClass: "top-[46%] left-[62%] sm:top-[40%] sm:right-[3%]",
    widthClass: "w-[34vw] max-w-[360px] sm:w-[14vw] sm:max-w-[210px]",
    variant: "b",
    delay: "1.1s",
    rotate: 2,
  },
  {
    positionClass: "top-[2%] left-[4%] sm:top-[6%] sm:left-[4%]",
    widthClass: "w-[28vw] max-w-[300px] sm:w-[11vw] sm:max-w-[170px]",
    variant: "c",
    delay: "2.2s",
    rotate: 2,
  },
  {
    positionClass: "top-[10%] left-[52%] sm:top-[10%] sm:right-[4%]",
    widthClass: "w-[30vw] max-w-[320px] sm:w-[12vw] sm:max-w-[180px]",
    variant: "d",
    delay: "0.6s",
    rotate: -1,
  },
  {
    positionClass: "top-[18%] left-[24%] sm:top-[2%] sm:left-[22%]",
    widthClass: "w-[26vw] max-w-[280px] sm:w-[10vw] sm:max-w-[160px]",
    variant: "a",
    delay: "1.7s",
    rotate: 3,
  },
];

function CloudShape({ c }: { c: Cloud }) {
  const width = `clamp(140px, ${c.widthVw}vw, ${c.widthVw * 12}px)`;
  return (
    <div
      className={`absolute ${c.positionClass} float-${c.variant}`}
      style={{
        width,
        animationDelay: c.delay,
        transform: `rotate(${c.rotate}deg)`,
      }}
    >
      <img
        src={cloudAsset.url}
        alt=""
        className="w-full h-auto select-none"
        draggable={false}
        style={{
          filter: "drop-shadow(0 10px 20px rgba(80, 90, 130, 0.15))",
        }}
      />
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
