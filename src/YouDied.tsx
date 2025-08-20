import React, { useEffect, useState } from "react";
import './main.css';

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
  enterDuration = 2000,
  exitDuration = 900,
  color = "#8B0000",
  glowColor = "#FF3B30",
  fontFamily = "serif",
  className,
  onAnimationComplete,
}) => {
  const [render, setRender] = useState(show);
  const [visible, setVisible] = useState(false);
  const [initialMount, setInitialMount] = useState(true);

  useEffect(() => {
    if (show) {
      setRender(true);
      // Ensure it animates even on first mount
      const timer = setTimeout(() => {
        setVisible(true);
        setInitialMount(false);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
      const timeout = setTimeout(() => {
        setRender(false);
        onAnimationComplete?.();
      }, exitDuration);
      return () => clearTimeout(timeout);
    }
  }, [show, exitDuration, onAnimationComplete]);

  if (!render) return null;

  const wrapperDuration = visible ? enterDuration : exitDuration;

  return (
    <div
      aria-live="assertive"
      aria-atomic
      role="status"
      className={className ?? ""}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transition: initialMount ? "none" : `opacity ${wrapperDuration}ms ease-out`,
        backgroundColor: "rgba(0,0,0,0.6)",
        pointerEvents: "none",
      }}
    >

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.85) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.35,
          mixBlendMode: "overlay",
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.02), rgba(255,255,255,0.02) 1px, transparent 1px, transparent 2px)",
        }}
      />

      <div
        style={{
          position: "relative",
          padding: "0 24px",
          transform: visible ? "scale(1)" : "scale(0.7)",
          mixBlendMode: "screen",
          transition: initialMount
            ? "none"
            : [
                `opacity ${wrapperDuration}ms ease-out`,
                `transform ${wrapperDuration}ms ease-out`,
                `filter ${wrapperDuration}ms ease-out`,
              ].join(","),
          opacity: visible ? 1 : 0,
          filter: visible ? "blur(0px)" : "blur(4px)",
          zIndex: 10,
        }}
      >
        <span
          style={{
            display: "block",
            textAlign: "center",
            userSelect: "none",
            fontFamily,
            letterSpacing: "0.06em",
            lineHeight: 1,
            fontSize: "clamp(36px, 10vw, 160px)",
            textTransform: "uppercase",
            textShadow: [
              `0 0 6px ${glowColor}55`,
              `0 0 12px ${glowColor}55`,
              `0 0 20px ${glowColor}66`,
              `0 0 34px ${glowColor}77`,
              `0 0 52px ${glowColor}88`,
            ].join(","),
            color,
            WebkitTextStroke: "1px rgba(0,0,0,0.5)",
            filter: "saturate(115%)",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};

export default YouDiedOverlay;