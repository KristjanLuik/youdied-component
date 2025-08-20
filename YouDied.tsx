import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";


/**
 * A simple custom hook to set a timeout and clear it on unmount.
 * @param callback The function to call after the delay.
 * @param delay The delay in milliseconds.
 */
const useTimeout = (callback: () => void, delay: number | null) => {
  useEffect(() => {
    if (delay === null) {
      return;
    }
    const timerId = setTimeout(callback, delay);
    return () => clearTimeout(timerId);
  }, [callback, delay]);
};

export type YouDiedOverlayProps = {
  text: string;
  show: boolean;
  enterDuration?: number;
  exitDuration?: number;
  color?: string;
  glowColor?: string;
  fontFamily?: string;
  className?: string;
  onAnimationComplete?: () => void;
};

export const YouDiedOverlay: React.FC<YouDiedOverlayProps> = ({
  text,
  show,
  enterDuration = 700,
  exitDuration = 900,
  color = "#8B0000", // deep red
  glowColor = "#FF3B30", // warm glow
  fontFamily = "serif",
  className,
  onAnimationComplete,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const enter = prefersReducedMotion
    ? { opacity: 1, scale: 1 }
    : { opacity: 1, scale: 1, filter: "blur(0px)" };

  const initial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, scale: 1.08, filter: "blur(1px)" };

  const exit = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, scale: 1.02, filter: "blur(1.5px)" };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: enterDuration / 1000, ease: "easeOut" }}
          onAnimationComplete={onAnimationComplete}
          aria-live="assertive"
          aria-atomic
          role="status"
          className={[
            "fixed inset-0 z-[9999] pointer-events-none",
            "flex items-center justify-center",
            className ?? "",
          ].join(" ")}
        >
          {/* Backdrop tint */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Vignette (radial gradient at edges) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%)",
            }}
          />

          {/* Film grain */}
          <div
            className="absolute inset-0 opacity-35 mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02) 1px, transparent 1px, transparent 2px)",
            }}
          />

          {/* The text layer */}
          <motion.div
            initial={initial}
            animate={enter}
            exit={exit}
            transition={{
              duration: enterDuration / 1000,
              ease: "easeOut",
            }}
            className="relative px-6"
            style={{
              mixBlendMode: "screen",
            }}
          >
            <div
              className="text-center select-none"
              style={{
                fontFamily,
                letterSpacing: "0.06em",
                lineHeight: 1,
                // Responsive sizing via clamp for big impact
                fontSize: "clamp(36px, 10vw, 160px)",
                textTransform: "uppercase",
                // Layered glow using text-shadow stack
                textShadow: [
                  `0 0 6px ${glowColor}55`,
                  `0 0 12px ${glowColor}55`,
                  `0 0 20px ${glowColor}66`,
                  `0 0 34px ${glowColor}77`,
                  `0 0 52px ${glowColor}88`,
                ].join(","),
                color,
              }}
            >
              {/* Outline via duplicate layer for subtle stroke */}
              <span
                aria-hidden
                className="absolute inset-0 -z-10"
                style={{
                  WebkitTextStroke: "1px rgba(0,0,0,0.5)",
                  color,
                  filter: "saturate(120%)",
                  opacity: 0.95,
                }}
              >
                {text}
              </span>

              {/* Main text */}
              <span style={{ filter: "saturate(115%)" }}>{text}</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Storybook stories for the component ---
// (Normally in DarkSoulsOverlay.stories.tsx)

// We'll export the component itself as the default, and keep the stories as named exports.
// This resolves the "multiple default exports" error.
export default YouDiedOverlay;

export const YouDied = {
  args: {
    text: 'YOU DIED',
    isVisible: true,
  },
};

export const VictoryAchieved = {
  args: {
    text: 'VICTORY ACHIEVED',
    isVisible: true,
    displayDuration: 3000,
  },
};

export const PrepareToDie = {
  args: {
    text: 'PREPARE TO DIE',
    isVisible: false,
  },
};