import { useEffect, useMemo } from "react";

interface StarsBackgroundProps {
  count?: number;
}

export const StarsBackground = ({ count = 80 }: StarsBackgroundProps) => {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        duration: 4 + Math.random() * 8,
        delay: Math.random() * 10,
        size: Math.random() < 0.7 ? 1.5 : 2.5,
        opacity: 0.4 + Math.random() * 0.6,
      })),
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
