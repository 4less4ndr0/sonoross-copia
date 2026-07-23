import { FC, useEffect, useRef, useState } from "react";
import { motion, useSpring } from "motion/react";

interface Position {
  x: number;
  y: number;
}

export interface SmoothCursorProps {
  cursor?: React.ReactNode;
  springConfig?: {
    damping: number;
    stiffness: number;
    mass: number;
    restDelta: number;
  };
}

const DESKTOP_POINTER_QUERY = "(any-hover: hover) and (any-pointer: fine)";

function isTrackablePointer(pointerType: string) {
  return pointerType !== "touch";
}

const DefaultCursorSVG: FC = () => {
  // Sage liquid-glass frosted pointer — flat, even sage fill
  return (
    <div
      style={{
        width: 26,
        height: 30,
        clipPath:
          "polygon(50% 0%, 100% 100%, 50% 78%, 0% 100%)",
        background: "rgba(74, 93, 80, 0.55)",
        backdropFilter: "blur(10px) saturate(160%)",
        border: "1px solid rgba(255, 255, 255, 0.35)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 2px rgba(28,26,20,0.15), 0 4px 10px rgba(28,26,20,0.18)",
      }}
    />
  );
};

export function SmoothCursor({
  cursor = <DefaultCursorSVG />,
  springConfig = {
    damping: 45,
    stiffness: 400,
    mass: 1,
    restDelta: 0.001,
  },
}: SmoothCursorProps) {
  const lastMousePos = useRef<Position>({ x: 0, y: 0 });
  const velocity = useRef<Position>({ x: 0, y: 0 });
  const lastUpdateTime = useRef(Date.now());
  const previousAngle = useRef(0);
  const accumulatedRotation = useRef(0);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const rotation = useSpring(0, {
    ...springConfig,
    damping: 60,
    stiffness: 300,
  });
  const scale = useSpring(1, {
    ...springConfig,
    stiffness: 500,
    damping: 35,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia(DESKTOP_POINTER_QUERY);

    const updateEnabled = () => {
      const nextIsEnabled = mediaQuery.matches;
      setIsEnabled(nextIsEnabled);
      if (!nextIsEnabled) setIsVisible(false);
    };

    updateEnabled();
    mediaQuery.addEventListener("change", updateEnabled);
    return () => mediaQuery.removeEventListener("change", updateEnabled);
  }, []);

  useEffect(() => {
    if (!isEnabled) return;

    let timeout: ReturnType<typeof setTimeout> | null = null;

    const updateVelocity = (currentPos: Position) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastUpdateTime.current;

      if (deltaTime > 0) {
        velocity.current = {
          x: (currentPos.x - lastMousePos.current.x) / deltaTime,
          y: (currentPos.y - lastMousePos.current.y) / deltaTime,
        };
      }

      lastUpdateTime.current = currentTime;
      lastMousePos.current = currentPos;
    };

    const smoothPointerMove = (e: PointerEvent) => {
      if (!isTrackablePointer(e.pointerType)) return;

      setIsVisible(true);

      const currentPos = { x: e.clientX, y: e.clientY };
      updateVelocity(currentPos);

      const speed = Math.sqrt(
        Math.pow(velocity.current.x, 2) + Math.pow(velocity.current.y, 2),
      );

      cursorX.set(currentPos.x);
      cursorY.set(currentPos.y);

      if (speed > 0.1) {
        const currentAngle =
          Math.atan2(velocity.current.y, velocity.current.x) * (180 / Math.PI) +
          90;

        let angleDiff = currentAngle - previousAngle.current;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;
        accumulatedRotation.current += angleDiff;
        rotation.set(accumulatedRotation.current);
        previousAngle.current = currentAngle;

        scale.set(0.95);

        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(() => scale.set(1), 150);
      }
    };

    let rafId = 0;
    const throttledPointerMove = (e: PointerEvent) => {
      if (!isTrackablePointer(e.pointerType)) return;
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        smoothPointerMove(e);
        rafId = 0;
      });
    };

    document.body.style.cursor = "none";
    window.addEventListener("pointermove", throttledPointerMove, {
      passive: true,
    });

    return () => {
      window.removeEventListener("pointermove", throttledPointerMove);
      document.body.style.cursor = "auto";
      if (rafId) cancelAnimationFrame(rafId);
      if (timeout !== null) clearTimeout(timeout);
    };
  }, [cursorX, cursorY, rotation, scale, isEnabled]);

  if (!isEnabled) return null;

  return (
    <motion.div
      style={{
        position: "fixed",
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
        rotate: rotation,
        scale: scale,
        zIndex: 100,
        pointerEvents: "none",
        willChange: "transform",
        opacity: isVisible ? 1 : 0,
      }}
      initial={false}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      {cursor}
    </motion.div>
  );
}
