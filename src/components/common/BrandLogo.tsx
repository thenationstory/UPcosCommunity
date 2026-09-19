import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import logoAsset from '../../assets/images/up_outsource_logo_1789060331342.jpg';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

export const EmblemIcon: React.FC<{ size?: number; className?: string }> = ({ size = 48, className = '' }) => {
  const [imageError, setImageError] = useState(false);

  if (!imageError) {
    return (
      <img
        src={logoAsset}
        alt="UP Outsource Seva Nigam Emblem Logo"
        width={size}
        height={size}
        onError={() => setImageError(true)}
        referrerPolicy="no-referrer"
        className={`rounded-full object-cover flex-shrink-0 select-none shadow-sm drop-shadow-xs ${className}`}
        style={{ width: `${size}px`, height: `${size}px` }}
      />
    );
  }

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`flex-shrink-0 select-none ${className}`}
      aria-label="UP Outsource Seva Nigam Emblem"
    >
      <defs>
        {/* Top Arch Path for UP OUTSOURCE SEVA NIGAM */}
        <path
          id="brand-top-curve"
          d="M 17 60 A 43 43 0 0 1 103 60"
          fill="none"
        />
        {/* Bottom Arch Path for COMMUNITY FORUM (curved clockwise along bottom) */}
        <path
          id="brand-bottom-curve"
          d="M 19 60 A 41 41 0 0 0 101 60"
          fill="none"
        />
        {/* Center Glow / Shadow */}
        <radialGradient id="centerGlow" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#b91c1c" />
          <stop offset="100%" stopColor="#881318" />
        </radialGradient>
      </defs>

      {/* Outer Circle Ring */}
      <circle cx="60" cy="60" r="58" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2.5" />
      <circle cx="60" cy="60" r="55" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />

      {/* Outer Ring Border Separators */}
      <circle cx="60" cy="60" r="39.5" fill="none" stroke="#e2e8f0" strokeWidth="1.2" />

      {/* Top Curved Text: UP OUTSOURCE SEVA NIGAM */}
      <text fill="#b91c1c" fontSize="8.2" fontWeight="900" letterSpacing="0.4" fontFamily="system-ui, -apple-system, sans-serif">
        <textPath href="#brand-top-curve" startOffset="50%" textAnchor="middle">
          UP OUTSOURCE SEVA NIGAM
        </textPath>
      </text>

      {/* Little decorative star / dots at sides */}
      <circle cx="15.5" cy="59" r="1.6" fill="#b91c1c" />
      <circle cx="104.5" cy="59" r="1.6" fill="#b91c1c" />

      {/* Bottom Curved Text: NEWS & INFORMATION */}
      <text fill="#0f172a" fontSize="6.8" fontWeight="900" letterSpacing="0.4" fontFamily="system-ui, -apple-system, sans-serif">
        <textPath href="#brand-bottom-curve" startOffset="50%" textAnchor="middle">
          NEWS & INFORMATION
        </textPath>
      </text>

      {/* Inner Red Badge Circle */}
      <circle cx="60" cy="60" r="36" fill="url(#centerGlow)" stroke="#ffffff" strokeWidth="2" />

      {/* Silhouette Map of Uttar Pradesh */}
      <g transform="translate(60, 60) scale(0.68) translate(-60, -60)">
        <path
          d="M 44 38 
             C 47 37, 51 36, 55 38 
             C 58 39, 62 42, 66 43 
             C 71 45, 77 47, 82 50 
             C 85 52, 88 56, 88 60 
             C 87 63, 83 65, 80 67 
             C 81 70, 83 75, 80 79 
             C 77 82, 73 80, 71 75 
             C 67 73, 63 71, 59 71 
             C 55 72, 53 76, 51 81 
             C 49 84, 46 83, 44 79 
             C 44 74, 47 70, 48 67 
             C 45 66, 41 65, 39 61 
             C 37 57, 39 53, 41 50 
             C 42 47, 41 43, 43 40 
             Z"
          fill="#ffffff"
          stroke="#fecaca"
          strokeWidth="0.8"
          strokeLinejoin="round"
          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.25))"
        />
        <circle cx="61" cy="57" r="1.8" fill="#b91c1c" stroke="#ffffff" strokeWidth="0.8" />
      </g>
    </svg>
  );
};

export const BrandHeader: React.FC<BrandLogoProps> = ({ 
  size = 'md', 
  showText = true, 
  className = '',
  onClick 
}) => {
  const { language } = useApp();

  const logoSizes = {
    sm: 34,
    md: 44,
    lg: 54,
  };

  const currentSize = logoSizes[size];

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center gap-2 sm:gap-3 select-none cursor-pointer group ${className}`}
    >
      {/* Exact Circular Emblem Logo */}
      <div className="transition-transform duration-200 group-hover:scale-105 flex-shrink-0">
        <EmblemIcon size={currentSize} className="w-8 h-8 sm:w-11 sm:h-11 md:w-12 md:h-12" />
      </div>

      {showText && (
        <div className="flex flex-col text-left justify-center min-w-0">
          {/* Main Title Row: "UP Outsource" (Dark) + "Seva Nigam" (Red) + "NEWS & INFORMATION" (Pill Badge) */}
          <div className="flex items-center gap-1.5 sm:gap-2 leading-none">
            <h1 className="text-xs sm:text-base lg:text-lg font-black tracking-tight text-slate-900 dark:text-white font-sans truncate">
              UP Outsource{' '}
              <span className="text-red-600 dark:text-red-500">
                Seva Nigam
              </span>
            </h1>

            {/* Dark pill badge: NEWS & INFORMATION */}
            <span className="inline-flex items-center bg-slate-900 dark:bg-black text-white text-[8px] sm:text-[9.5px] font-black uppercase tracking-wider px-1.5 sm:px-2 py-0.5 rounded-md shadow-xs border border-slate-700/50 whitespace-nowrap flex-shrink-0">
              NEWS & INFORMATION
            </span>
          </div>

          {/* Authentic Subtitle / Tagline from image: आउटसोर्स कर्मचारियों की हर जरूरी खबर, एक जगह */}
          <p className="text-[9.5px] sm:text-[11px] md:text-xs text-slate-500 dark:text-slate-400 font-medium tracking-normal mt-0.5 leading-tight truncate">
            आउटसोर्स कर्मचारियों की हर जरूरी खबर, एक जगह
          </p>
        </div>
      )}
    </div>
  );
};
