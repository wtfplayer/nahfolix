import { useState } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import ProfileCard from '@/components/ProfileCard';
import MusicPlayer from '@/components/MusicPlayer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      <div className={`min-h-screen flex items-center justify-center p-6 transition-opacity duration-1000 ${
        isLoading ? 'opacity-0' : 'opacity-100'
      }`}>
        {/* Background Effects */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-crimson opacity-5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-crimson opacity-5 rounded-full blur-3xl animate-pulse animation-delay-1000" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-md">
          <ProfileCard />
          <MusicPlayer />
        </div>

        {/* Floating Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-crimson opacity-20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Index;
