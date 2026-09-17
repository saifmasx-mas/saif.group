import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const sizeMap = {
    sm: { icon: 34, text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 42, text: 'text-2xl', sub: 'text-[11px]' },
    lg: { icon: 56, text: 'text-3xl', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Animated Architectural Interior Logo Placeholder */}
      <div className="relative flex items-center justify-center">
        {/* Ambient Golden Glow Ring */}
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-amber-600/40 via-amber-400/30 to-amber-200/20 blur-sm opacity-80 group-hover:opacity-100 transition duration-500 animate-pulse" />
        
        {/* Main Logo Container with custom CSS Animation */}
        <div
          className="relative rounded-xl bg-gradient-to-b from-stone-900 via-stone-950 to-stone-900 p-2 border border-amber-500/30 shadow-xl logo-glow-anim transition-transform hover:scale-105"
          style={{ width: currentSize.icon + 12, height: currentSize.icon + 12 }}
        >
          <svg
            width={currentSize.icon}
            height={currentSize.icon}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform duration-700"
          >
            {/* Architectural False Ceiling Tier (Top Plane) */}
            <path
              d="M15 28L50 14L85 28L50 42L15 28Z"
              fill="url(#goldGrad1)"
              stroke="#F59E0B"
              strokeWidth="2.5"
            />
            {/* Lower Ceiling Recess / Gypsum Depth */}
            <path
              d="M25 40L50 30L75 40L50 50L25 40Z"
              fill="url(#goldGrad2)"
              fillOpacity="0.75"
              stroke="#D97706"
              strokeWidth="2"
            />
            {/* Architectural Interior Pillars / Wall Lines */}
            <line x1="30" y1="46" x2="30" y2="82" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            <line x1="50" y1="54" x2="50" y2="86" stroke="#FCD34D" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="70" y1="46" x2="70" y2="82" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
            
            {/* Foundation / Floor Border */}
            <path
              d="M18 84C38 88 62 88 82 84"
              stroke="url(#goldGrad1)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Glowing Focal Sparkle (Symbol of Luxury & Polish) */}
            <circle cx="50" cy="28" r="4.5" fill="#FFFBEB" className="animate-ping" style={{ animationDuration: '3s' }} />
            <circle cx="50" cy="28" r="3.5" fill="#FBBF24" />

            {/* Linear Gradients */}
            <defs>
              <linearGradient id="goldGrad1" x1="15" y1="14" x2="85" y2="42" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FDE68A" />
                <stop offset="0.45" stopColor="#D97706" />
                <stop offset="1" stopColor="#92400E" />
              </linearGradient>
              <linearGradient id="goldGrad2" x1="25" y1="30" x2="75" y2="50" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FBBF24" />
                <stop offset="0.5" stopColor="#B45309" />
                <stop offset="1" stopColor="#78350F" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Name & Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 font-bold tracking-tight">
          <span className={`gold-gleam-text font-extrabold ${currentSize.text} font-['Cairo',sans-serif]`}>
            saif
          </span>
          <span className="text-amber-500 font-extrabold">.</span>
          <span className={`text-stone-100 ${currentSize.text} tracking-wide font-['Plus_Jakarta_Sans',sans-serif]`}>
            group
          </span>
        </div>
        {showSubtitle && (
          <span className={`text-stone-400 font-medium tracking-widest uppercase ${currentSize.sub}`}>
            Interior & Finishing
          </span>
        )}
      </div>
    </div>
  );
};
