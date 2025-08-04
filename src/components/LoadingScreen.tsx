import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onLoadingComplete, 500);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 bg-background z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${
      progress >= 100 ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Main Loading Spinner */}
      <div className="relative mb-8">
        <div className="w-20 h-20 border-4 border-muted rounded-full animate-spin border-t-transparent">
          <div className="absolute inset-2 border-2 border-crimson rounded-full animate-spin border-t-transparent animation-delay-75" style={{ animationDirection: 'reverse' }} />
        </div>
        <div className="absolute inset-0 w-20 h-20 border-4 border-transparent rounded-full">
          <div 
            className="absolute inset-0 border-4 border-crimson-glow rounded-full opacity-50"
            style={{
              background: `conic-gradient(from 0deg, transparent 0deg, hsl(var(--crimson-glow)) ${progress * 3.6}deg, transparent ${progress * 3.6}deg)`
            }}
          />
        </div>
      </div>

      {/* Loading Text */}
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text mb-2">nahfolix</h2>
        <p className="text-muted-foreground text-sm">Loading experience...</p>
        
        {/* Progress Bar */}
        <div className="w-64 h-1 bg-muted rounded-full mt-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-crimson transition-all duration-300 ease-out rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        
        {/* Progress Percentage */}
        <div className="text-crimson text-xs mt-2 font-mono">
          {Math.floor(Math.min(progress, 100))}%
        </div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-crimson-glow rounded-full opacity-30 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;