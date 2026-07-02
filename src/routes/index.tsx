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
  side: "left" | "right"; // tail side (iMessage: left=gray incoming, right=blue outgoing)
  tone: "gray" | "blue";
  rotate: number;
};

// 10 iMessage-style bubbles, spread across the viewport, avoiding a central
// rect (~30-70% x, ~35-70% y) where the headline + email form sit.
const BUBBLES: Bubble[] = [
  { top: "8%",  left: "6%",  width: 90,  height: 34, variant: "a", delay: "0s",   side: "left",  tone: "gray", rotate: -3 },
  { top: "14%", left: "78%", width: 110, height: 36, variant: "b", delay: "1.1s", side: "right", tone: "blue", rotate: 2 },
  { top: "26%", left: "18%", width: 75,  height: 32, variant: "c", delay: "2.2s", side: "left",  tone: "gray", rotate: 3 },
  { top: "22%", left: "84%", width: 95,  height: 34, variant: "d", delay: "0.6s", side: "right", tone: "blue", rotate: -2 },
  { top: "42%", left: "4%",  width: 100, height: 36, variant: "b", delay: "1.6s", side: "left",  tone: "gray", rotate: 2 },
  { top: "38%", left: "86%", width: 80,  height: 32, variant: "a", delay: "0.9s", side: "right", tone: "blue", rotate: -3 },
  { top: "60%", left: "8%",  width: 85,  height: 34, variant: "c", delay: "2.5s", side: "left",  tone: "gray", rotate: 1 },
  { top: "58%", left: "80%", width: 105, height: 36, variant: "d", delay: "0.3s", side: "right", tone: "blue", rotate: -2 },
  { top: "18%", left: "44%", width: 70,  height: 30, variant: "a", delay: "1.9s", side: "left",  tone: "gray", rotate: 3 },
  { top: "12%", left: "60%", width: 85,  height: 32, variant: "c", delay: "2.8s", side: "right", tone: "blue", rotate: -1 },
];

function BubbleShape({ b }: { b: Bubble }) {
  const isBlue = b.tone === "blue";
  const bg = isBlue ? "#3B82F6" : "#E5E5EA";
  const isRight = b.side === "right";
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
          borderRadius: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      />
      {/* iMessage tail */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        className="absolute"
        style={{
          bottom: -2,
          [isRight ? "right" : "left"]: -3,
          transform: isRight ? "scaleX(-1)" : undefined,
        }}
      >
        <path
          d="M 0 14 C 6 14 12 10 12 0 C 12 8 6 12 0 12 Z"
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
