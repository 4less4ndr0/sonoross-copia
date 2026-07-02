import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";

export const Route = createFileRoute("/")({
  component: Index,
});

type Bubble = {
  top: string;
  left: string;
  width: number;
  height: number;
  variant: "a" | "b" | "c" | "d";
  delay: string;
  rotate: number;
};

// 5 larger iMessage-style bubbles, all with the same right-tail shape.
const BUBBLES: Bubble[] = [
  { top: "6%",  left: "4%",  width: 170, height: 62, variant: "a", delay: "0s",   rotate: -2 },
  { top: "16%", left: "72%", width: 180, height: 64, variant: "b", delay: "1.1s", rotate: 1 },
  { top: "28%", left: "10%", width: 150, height: 56, variant: "c", delay: "2.2s", rotate: 2 },
  { top: "22%", left: "82%", width: 160, height: 60, variant: "d", delay: "0.6s", rotate: -1 },
  { top: "10%", left: "45%", width: 140, height: 54, variant: "a", delay: "1.7s", rotate: 3 },
];

function BubbleShape({ b }: { b: Bubble }) {
  const bg = "#007AFF";
  return (
    <div
      className={`absolute float-${b.variant}`}
      style={{
        top: b.top,
        left: b.left,
        width: b.width,
        height: b.height,
        animationDelay: b.delay,
        transform: `rotate(${b.rotate}deg)`,
      }}
    >
      <div
        className="w-full h-full"
        style={{
          background: bg,
          borderRadius: "24px",
          boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        }}
      />
      {/* iMessage right tail */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        className="absolute"
        style={{
          bottom: -2,
          right: -6,
        }}
      >
        <path
          d="M 0 0 C 10 0 18 6 20 20 C 12 14 6 14 0 14 Z"
          fill={bg}
        />
      </svg>
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

const PIXEL = 7;
const GAP = 1;
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

function FlatEye({ left, closed }: { left: string; closed: boolean }) {
  const rows = closed
    ? FULL_ROWS.map(() => Array(COLS).fill(0)).map((r, i) =>
        i === 6 || i === 7 ? [0, 0, 0, 1, 1, 0, 0, 0] : r
      )
    : FULL_ROWS;

  return (
    <div
      className="absolute"
      style={{
        left,
        top: "78%",
        transform: "translate(-50%, -50%)",
        width: COLS * PIXEL + (COLS - 1) * GAP,
        height: FULL_ROWS.length * PIXEL + (FULL_ROWS.length - 1) * GAP,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${PIXEL}px)`,
          gap: GAP,
        }}
      >
        {rows.map((row, r) =>
          row.map((on, c) => (
            <div
              key={`${r}-${c}`}
              style={{
                width: PIXEL,
                height: PIXEL,
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
        {BUBBLES.map((b, i) => (
          <BubbleShape key={i} b={b} />
        ))}
      </div>

      {/* Centered content (headline + email) — sits ABOVE the horizon */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 pb-[38vh]">
        <h1
          className="text-center text-4xl md:text-6xl leading-tight text-neutral-900 max-w-3xl"
          style={{ fontFamily: '"Instrument Serif", serif', fontWeight: 400 }}
        >
          Perché nessuno dovrebbe invecchiare solo.
        </h1>

        <form
          onSubmit={onSubmit}
          className="mt-8 flex items-center gap-2 bg-white rounded-full pl-6 pr-2 py-2 shadow-sm border border-neutral-200 w-full max-w-md"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Il tuo indirizzo email"
            className="flex-1 bg-transparent outline-none text-neutral-800 placeholder:text-neutral-400 py-2"
          />
          <button
            type="submit"
            aria-label="Iscriviti"
            className="rounded-full bg-neutral-900 text-white w-10 h-10 flex items-center justify-center hover:bg-neutral-700 transition-colors"
          >
            →
          </button>
        </form>
      </div>

      {/* Horizon — smaller, sits below the email form */}
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none z-0"
        style={{
          width: "160vw",
          height: "34vh",
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          background:
            "radial-gradient(ellipse at 50% 100%, #ffd166 0%, #ff8a3d 25%, #f4506c 50%, #d94892 68%, rgba(250,247,242,0) 82%)",
          filter: "blur(6px)",
        }}
      />

      {/* Flat pixel eyes on the horizon — bigger, whiter, wider apart, blink together */}
      <FlatEye left="42%" closed={eyesClosed} />
      <FlatEye left="58%" closed={eyesClosed} />
    </main>
  );
}
