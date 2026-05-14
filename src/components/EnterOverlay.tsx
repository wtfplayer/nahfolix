import { useState } from "react";

interface EnterOverlayProps {
  onEnter?: () => void;
}

export const EnterOverlay = ({ onEnter }: EnterOverlayProps) => {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  const handleClick = () => {
    if (leaving) return;
    onEnter?.();
    setLeaving(true);
    setTimeout(() => setGone(true), 800);
  };

  if (gone) return null;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Click to enter"
      className={`fixed inset-0 z-[100] grid place-items-center bg-black/70 backdrop-blur-md transition-opacity duration-700 ease-out ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        click to enter...
      </span>
    </button>
  );
};
