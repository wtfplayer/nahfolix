import { useState, useEffect } from 'react';

const ProfileCard = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`glass-card rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden transition-all duration-1000 ${
      isLoaded ? 'animate-fade-in opacity-100' : 'opacity-0'
    }`}>
      
      {/* Profile Avatar */}
      <div className="relative mb-6">
        <div className="w-32 h-32 mx-auto relative">
          <img
            src="https://cdn.discordapp.com/avatars/938124385817092096/f5e8a5c22a52c9fce9578fcda6f56d2f.webp?size=1024"
            alt="nahfolix avatar"
            className="w-full h-full rounded-full object-cover border-4 border-crimson shadow-crimson animate-float"
          />
        </div>
      </div>

      {/* Name and Tag */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2 tracking-wide">
          nahfolix
        </h1>
        <div className="text-crimson-light font-mono text-sm tracking-widest opacity-80">
          #0000
        </div>
      </div>

      {/* Bio */}
      <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
        im just him
      </p>

      {/* Social Links */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <a
          href="https://discordapp.com/users/938124385817092096"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-gradient-crimson text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-crimson focus:ring-opacity-50"
        >
          Discord
        </a>
        <a
          href="https://github.com/wtfplayer"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-gradient-crimson text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-crimson focus:ring-opacity-50"
        >
          GitHub
        </a>
        <a
          href="https://www.roblox.com/users/3784100047/profile"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-gradient-crimson text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-crimson focus:ring-opacity-50"
        >
          Roblox
        </a>
      </div>

      {/* Footer */}
      <div className="text-muted-foreground text-sm opacity-70">
        Made with ❤️ by folix
      </div>
    </div>
  );
};

export default ProfileCard;