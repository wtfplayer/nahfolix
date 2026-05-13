import { useEffect, useRef } from "react";

const VIDEO_URL =
  "https://res.cloudinary.com/ducdtedgp/video/upload/Ghost_of_Tsushima_DC_2024.05.18-17.09_d3mxxt.mp4";

export const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Try to autoplay with sound first; browsers usually block this.
    const tryUnmuted = async () => {
      try {
        video.muted = false;
        video.volume = 1;
        await video.play();
      } catch {
        // Fallback: muted autoplay so the visual still runs.
        video.muted = true;
        try {
          await video.play();
        } catch {
          /* ignore */
        }
        // Unmute on the first user interaction.
        const unmute = async () => {
          try {
            video.muted = false;
            video.volume = 1;
            await video.play();
          } catch {
            /* ignore */
          }
          window.removeEventListener("pointerdown", unmute);
          window.removeEventListener("keydown", unmute);
          window.removeEventListener("touchstart", unmute);
        };
        window.addEventListener("pointerdown", unmute, { once: true });
        window.addEventListener("keydown", unmute, { once: true });
        window.addEventListener("touchstart", unmute, { once: true });
      }
    };

    tryUnmuted();
  }, []);

  return (
    <div className="video-bg" aria-hidden="true">
      <video
        ref={videoRef}
        src={VIDEO_URL}
        autoPlay
        loop
        playsInline
        preload="auto"
      />
      <div className="video-bg-overlay" />
    </div>
  );
};
