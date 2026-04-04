"use client";

import { useRef, useEffect, CSSProperties, ReactNode } from "react";

type AnimationType = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-up" | "fade-up-strong";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  type?: AnimationType;
  style?: CSSProperties;
  threshold?: number;
}

const INITIAL: Record<AnimationType, CSSProperties> = {
  "fade-up":        { opacity: 0, transform: "translateY(24px)" },
  "fade-up-strong": { opacity: 0, transform: "translateY(48px)" },
  "fade-in":        { opacity: 0 },
  "slide-left":     { opacity: 0, transform: "translateX(32px)" },
  "slide-right":    { opacity: 0, transform: "translateX(-32px)" },
  "scale-up":       { opacity: 0, transform: "scale(0.93)" },
};

const FINAL: Record<AnimationType, CSSProperties> = {
  "fade-up":        { opacity: 1, transform: "translateY(0)" },
  "fade-up-strong": { opacity: 1, transform: "translateY(0)" },
  "fade-in":        { opacity: 1 },
  "slide-left":     { opacity: 1, transform: "translateX(0)" },
  "slide-right":    { opacity: 1, transform: "translateX(0)" },
  "scale-up":       { opacity: 1, transform: "scale(1)" },
};

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  duration = 650,
  type = "fade-up",
  style,
  threshold = 0.1,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    Object.assign(el.style, INITIAL[type]);
    el.style.transition = `opacity ${duration}ms cubic-bezier(0.22,1,0.36,1), transform ${duration}ms cubic-bezier(0.22,1,0.36,1)`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (!ref.current) return;
            Object.assign(ref.current.style, FINAL[type]);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, duration, type, threshold]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
