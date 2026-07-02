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
  tail?: "left" | "right" | false;
  rotate: number;
};

// Distributed across whole viewport, avoiding a central rect (~35-65% x, ~35-62% y)
// where headline + email form sit.
const BUBBLES: Bubble[] = [
  { top: "6%",  left: "8%",  width: 110, height: 34, variant: "a", delay: "0s",   tail: "left",  rotate: -4 },
  { top: "10%", left: "32%", width: 90,  height: 30, variant: "b", delay: "1.2s", tail: false,   rotate: 2 },
  { top: "4%",  left: "58%", width: 120, height: 36, variant: "c", delay: "2.1s", tail: "right", rotate: 3 },
  { top: "12%", left: "82%", width: 80,  height: 28, variant: "d", delay: "0.6s", tail: false,   rotate: -2 },
  { top: "20%", left: "18%", width: 100, height: 32, variant: "c", delay: "1.8s", tail: false,   rotate: 1 },
  { top: "22%", left: "72%", width: 130, height: 38, variant: "a", delay: "0.3s", tail: "left",  rotate: -3 },
  { top: "30%", left: "4%",  width: 95,  height: 30, variant: "b", delay: "2.4s", tail: false,   rotate: 4 },
  { top: "34%", left: "88%", width: 105, height: 34, variant: "d", delay: "1.5s", tail: "right", rotate: -1 },
  { top: "44%", left: "10%", width: 115, height: 36, variant: "a", delay: "0.9s", tail: false,   rotate: 2 },
  { top: "48%", left: "84%", width: 90,  height: 30, variant: "c", delay: "3s",   tail: "left",  rotate: -4 },
  { top: "58%", left: "6%",  width: 100, height: 32, variant: "b", delay: "1s",   tail: false,   rotate: 3 },
  { top: "56%", left: "26%", width: 85,  height: 28, variant: "d", delay: "2.7s", tail: "right", rotate: -2 },
  { top: "60%", left: "70%", width: 120, height: 36, variant: "a", delay: "0.4s", tail: false,   rotate: 1 },
  { top: "62%", left: "90%", width: 95,  height: 30, variant: "c", delay: "1.9s", tail: "left",  rotate: -3 },
  { top: "72%", left: "14%", width: 110, height: 34, variant: "b", delay: "2.2s", tail: false,   rotate: 4 },
  { top: "74%", left: "42%", width: 90,  height: 30, variant: "d", delay: "0.7s", tail: "right", rotate: -1 },
  { top: "76%", left: "64%", width: 105, height: 32, variant: "a", delay: "1.4s", tail: false,   rotate: 2 },
  { top: "78%", left: "86%", width: 80,  height: 28, variant: "c", delay: "2.6s", tail: "left",  rotate: -4 },
  { top: "16%", left: "48%", width: 75,  height: 26, variant: "d", delay: "3.1s", tail: false,   rotate: 3 },
  { top: "68%", left: "52%", width: 85,  height: 28, variant: "b", delay: "0.2s", tail: "right", rotate: -2 },
];

function BubbleShape({ b }: { b: Bubble }) {
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
        className="w-full h-full rounded-full border border-neutral-800/70 bg-transparent"
      />
      {b.tail && (
        <div
          className="absolute w-2 h-2 border-neutral-800/70"
          style={{
            bottom: -4,
            [b.tail === "left" ? "left" : "right"]: "22%",
            borderStyle: "solid",
            borderWidth: "0 0 1px 1px",
            transform: b.tail === "left" ? "rotate(-30deg)" : "rotate(-60deg)",
            background: "transparent",
          } as React.CSSProperties}
        />
      )}
    </div>
  );
}

function useBlink(minMs = 3000, maxMs = 7000) {
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
        }, 140);
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

function Eye({ x }: { x: number }) {
  const closed = useBlink(2500 + Math.random() * 2000, 6000 + Math.random() * 2000);
  return (
    <svg
      width="70"
      height="40"
      viewBox="0 0 70 40"
      className="absolute"
      style={{
        left: `${x}%`,
        top: "68%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <path
        d={closed ? "M 8 22 Q 35 22 62 22" : "M 8 28 Q 35 -4 62 28"}
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ transition: "d 140ms ease" }}
      />
    </svg>
  );
}

function Index() {
  const [email, setEmail] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <main
      className="relative h-screen w-screen overflow-hidden"
      style={{ backgroundColor: "#faf7f2" }}
    >
      {/* Horizon */}
      <div
        className="absolute left-1/2 bottom-0 -translate-x-1/2 pointer-events-none"
        style={{
          width: "180vw",
          height: "60vh",
          borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
          background:
            "radial-gradient(ellipse at 50% 100%, #ffd166 0%, #ff8a3d 25%, #f4506c 50%, #d94892 68%, rgba(250,247,242,0) 82%)",
          filter: "blur(6px)",
        }}
      />

      {/* Eyes */}
      <Eye x={42} />
      <Eye x={58} />

      {/* Bubbles layer */}
      <div className="absolute inset-0 pointer-events-none">
        {BUBBLES.map((b, i) => (
          <BubbleShape key={i} b={b} />
        ))}
      </div>

      {/* Centered content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
        <h1
          className="text-center text-4xl md:text-6xl leading-tight text-neutral-900 max-w-3xl"
          style={{ fontFamily: '"Instrument Serif", serif', fontWeight: 400 }}
        >
          Perché nessuno dovrebbe invecchiare solo.
        </h1>

        <form
          onSubmit={onSubmit}
          className="mt-10 flex items-center gap-2 bg-white rounded-full pl-6 pr-2 py-2 shadow-sm border border-neutral-200 w-full max-w-md"
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
    </main>
  );
}
