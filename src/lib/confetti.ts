const BRAND_COLORS = ["#EF9F27", "#4A5D50", "#e8f5d3", "#F6F3ED", "#97C459"];

export async function fireConfetti() {
  if (typeof window === "undefined") return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const { default: confetti } = await import("canvas-confetti");

  const defaults = {
    startVelocity: 45,
    spread: 360,
    ticks: 90,
    zIndex: 9999,
    colors: BRAND_COLORS,
  };

  confetti({
    ...defaults,
    particleCount: 120,
    origin: { x: 0.5, y: 0.6 },
  });

  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: 80,
      angle: 60,
      spread: 70,
      origin: { x: 0, y: 0.7 },
    });
    confetti({
      ...defaults,
      particleCount: 80,
      angle: 120,
      spread: 70,
      origin: { x: 1, y: 0.7 },
    });
  }, 180);
}
