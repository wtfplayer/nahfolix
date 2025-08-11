import { useState, useEffect } from 'react';
import StatusBadge from '@/components/StatusBadge';
import discordIcon from '@/assets/icons/discord.svg';
import githubIcon from '@/assets/icons/github.svg';
import robloxIcon from '@/assets/icons/roblox.svg';
import { Eye } from 'lucide-react';

const ProfileCard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [views, setViews] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // View counter: increments once per browser session and persists in localStorage
  useEffect(() => {
    try {
      const STORAGE_KEY = 'site_view_count';
      const SESSION_KEY = 'site_view_count_session_incremented';
      const current = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
      setViews(current);
      if (!sessionStorage.getItem(SESSION_KEY)) {
        const next = current + 1;
        localStorage.setItem(STORAGE_KEY, String(next));
        sessionStorage.setItem(SESSION_KEY, '1');
        setViews(next);
      }
    } catch (e) {
      // no-op in restricted environments
    }
  }, []);

  return (
    <div className={`glass-card rounded-3xl p-8 max-w-md w-full text-center relative overflow-hidden transition-all duration-1000 ${
      isLoaded ? 'animate-fade-in opacity-100' : 'opacity-0'
    }`}>

      {/* Views Badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-secondary/70 text-secondary-foreground border border-border px-2 py-1 backdrop-blur-sm">
        <Eye className="h-4 w-4" aria-hidden="true" />
        <span className="text-xs font-medium" aria-label="Views">{views.toLocaleString()}</span>
      </div>

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

      {/* Live Status */}
      <div className="mb-6">
        <StatusBadge userId="938124385817092096" align="center" />
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
          aria-label="Open Discord profile"
          className="px-6 py-3 bg-gradient-crimson text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-crimson focus:ring-opacity-50"
        >
          <img src={discordIcon} alt="" aria-hidden="true" className="h-5 w-5 inline-block" />
        </a>
        <a
          href="https://github.com/wtfplayer"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open GitHub profile"
          className="px-6 py-3 bg-gradient-crimson text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-crimson focus:ring-opacity-50"
        >
          <img src={githubIcon} alt="" aria-hidden="true" className="h-5 w-5 inline-block" />
        </a>
        <a
          href="https://www.roblox.com/users/3784100047/profile"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Roblox profile"
          className="px-6 py-3 bg-gradient-crimson text-white font-semibold rounded-xl hover:scale-105 transition-all duration-300 hover:bg-primary-hover focus:outline-none focus:ring-4 focus:ring-crimson focus:ring-opacity-50"
        >
          <img src={robloxIcon} alt="" aria-hidden="true" className="h-5 w-5 inline-block" />
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