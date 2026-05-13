import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const VIDEO_URL =
  "https://res.cloudinary.com/ducdtedgp/video/upload/Ghost_of_Tsushima_DC_2024.05.18-17.09_d3mxxt.mp4";
const AUDIO_URL = "/bg-music.mp3";

export const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {});
    }
    if (!audio) return;
    audio.volume = 0.6;
    audio.loop = true;

    const start = async () => {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        /* ignore */
      }
    };

    // Try immediately (will likely fail due to autoplay policy)
    start();

    // Fallback: first user gesture anywhere on the page
    const onGesture = () => {
      start();
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
      window.removeEventListener("touchstart", onGesture);
    };
    window.addEventListener("pointerdown", onGesture);
    window.addEventListener("keydown", onGesture);
    window.addEventListener("touchstart", onGesture);

    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
      window.removeEventListener("touchstart", onGesture);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        /* ignore */
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <div className="video-bg" aria-hidden="true">
        <video
          ref={videoRef}
          src={VIDEO_URL}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
        />
        <audio ref={audioRef} src={AUDIO_URL} loop preload="auto" />
        <div className="video-bg-overlay" />
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Mute music" : "Play music"}
        className="fixed bottom-4 right-4 z-50 grid h-10 w-10 place-items-center rounded-full bg-surface-card/60 text-foreground ring-1 ring-surface-border backdrop-blur-md transition hover:bg-surface-card/80"
      >
        {playing ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
      </button>
    </>
  );
};
