import { useEffect, useMemo } from "react";

interface StarsBackgroundProps {
  count?: number;
}

export const StarsBackground = ({ count = 80 }: StarsBackgroundProps) => {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const duration = 4 + Math.random() * 8;
        return {
          id: i,
          left: Math.random() * 100,
          duration,
          // Negative delay so animations are mid-flight on mount
          delay: -Math.random() * duration,
          size: Math.random() < 0.7 ? 1.5 : 2.5,
          opacity: 0.4 + Math.random() * 0.6,
        };
      }),
    [count]
  );

  useEffect(() => {
    // ensure repaint smoothness
  }, []);

  return (
    <div className="stars-bg" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="star"
          style={{
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
};
