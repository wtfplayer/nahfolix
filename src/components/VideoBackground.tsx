import { useEffect, useRef } from "react";

const VIDEO_URL =
  "https://res.cloudinary.com/ducdtedgp/video/upload/Ghost_of_Tsushima_DC_2024.05.18-17.09_d3mxxt.mp4";
const AUDIO_URL = "/bg-music.mp3";

export const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

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

    const tryPlay = async () => {
      try {
        await audio.play();
      } catch {
        const start = async () => {
          try {
            await audio.play();
          } catch {
            /* ignore */
          }
          window.removeEventListener("pointerdown", start);
          window.removeEventListener("keydown", start);
          window.removeEventListener("touchstart", start);
        };
        window.addEventListener("pointerdown", start, { once: true });
        window.addEventListener("keydown", start, { once: true });
        window.addEventListener("touchstart", start, { once: true });
      }
    };
    tryPlay();
  }, []);

  return (
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
  );
};
