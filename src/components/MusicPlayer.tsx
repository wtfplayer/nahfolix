import { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface MusicPlayerProps {
  shouldAutoPlay?: boolean;
}

const MusicPlayer = ({ shouldAutoPlay = false }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  // Separate effect for autoplay trigger
  useEffect(() => {
    if (shouldAutoPlay && audioRef.current) {
      audioRef.current.play().catch(() => {
        toast({
          title: 'Autoplay blocked',
          description: 'Tap the play button to start the music.',
          duration: 5000,
        });
      });
    }
  }, [shouldAutoPlay]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;
    
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="music-player rounded-2xl p-6 mt-8 relative overflow-hidden glass-card">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-crimson opacity-90" />
      
      <div className="relative z-10">
        {/* Track Info */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-white mb-1">Hello?</h2>
          <h3 className="text-white/80 text-sm">Clairo</h3>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlayPause}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-crimson ml-0.5" />
            ) : (
              <Play className="w-5 h-5 text-crimson ml-1" />
            )}
          </button>

          {/* Progress Bar */}
          <div className="flex-1 flex items-center gap-3">
            <div
              className="flex-1 h-2 bg-black/30 rounded-full cursor-pointer relative overflow-hidden"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-white rounded-full transition-all duration-200"
                style={{ width: `${progressPercentage}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg transition-all duration-200"
                style={{ left: `calc(${progressPercentage}% - 6px)` }}
              />
            </div>
            
            {/* Time Display */}
            <div className="text-white/80 text-sm font-mono min-w-[40px] text-center">
              {formatTime(currentTime)}
            </div>
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio
          ref={audioRef}
          src="/song.mp3"
          preload="metadata"
          playsInline
          className="hidden"
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
