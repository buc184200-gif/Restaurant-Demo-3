import React from 'react';

export default function HeroVisual() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 700 700"
        role="img"
        aria-label="Abstract brass dining composition inspired by contemporary Indian cuisine"
        className="w-full h-full max-w-[700px] max-h-[700px]"
      >
        <defs>
          <filter id="shadow-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.08" />
          </filter>
          <filter id="shadow-inner" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.05" />
          </filter>
          <filter id="texture-paper">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.05 0" in="noise" result="coloredNoise" />
            <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
          </filter>
          
          <linearGradient id="brass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C8AA76" />
            <stop offset="50%" stopColor="#A88950" />
            <stop offset="100%" stopColor="#7A5D2E" />
          </linearGradient>

          <linearGradient id="brass-grad-light" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E4CDA4" />
            <stop offset="50%" stopColor="#C8AA76" />
            <stop offset="100%" stopColor="#967742" />
          </linearGradient>

          <style>
            {`
              @media (prefers-reduced-motion: no-preference) {
                .hero-plate {
                  transform-origin: center;
                  animation: spin-plate 30s linear infinite;
                }
                .hero-heat-line {
                  animation: pulse-heat 4s ease-in-out infinite alternate;
                }
                .hero-spice-dots circle {
                  animation: pulse-spice 3s ease-in-out infinite alternate;
                }
                .hero-leaf {
                  animation: drift-leaf 6s ease-in-out infinite alternate;
                }
              }
              
              @keyframes spin-plate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              
              @keyframes pulse-heat {
                0% { opacity: 0.7; stroke-width: 1.5; }
                100% { opacity: 1; stroke-width: 2.5; }
              }
              
              @keyframes pulse-spice {
                0% { opacity: 0.6; transform: scale(0.9); }
                100% { opacity: 1; transform: scale(1.1); }
              }
              
              @keyframes drift-leaf {
                0% { transform: translateY(0px) rotate(0deg); }
                100% { transform: translateY(-4px) rotate(2deg); }
              }
            `}
          </style>
        </defs>

        <g filter="url(#texture-paper)">
          {/* Main Brass Plate */}
          <g className="hero-plate">
            <circle cx="350" cy="350" r="280" fill="url(#brass-grad)" filter="url(#shadow-soft)" />
            <circle cx="350" cy="350" r="275" fill="none" stroke="#F4EFE5" strokeWidth="1" opacity="0.3" />
            <circle cx="350" cy="350" r="220" fill="url(#brass-grad-light)" filter="url(#shadow-inner)" opacity="0.4" />
            <circle cx="350" cy="350" r="218" fill="none" stroke="#7A5D2E" strokeWidth="1.5" opacity="0.5" />
          </g>

          {/* Grain/Rice Forms */}
          <g opacity="0.6">
            <path d="M 280 400 Q 290 380 300 390 Q 290 410 280 400" fill="#F4EFE5" />
            <path d="M 295 415 Q 305 395 315 405 Q 305 425 295 415" fill="#F4EFE5" />
            <path d="M 270 420 Q 280 400 290 410 Q 280 430 270 420" fill="#F4EFE5" />
          </g>

          {/* Abstract Leaf Shape */}
          <g className="hero-leaf">
            <path d="M 180 250 C 220 220, 280 260, 260 300 C 230 320, 160 280, 180 250 Z" fill="#596C48" opacity="0.85" filter="url(#shadow-inner)" />
            <path d="M 185 255 C 215 230, 265 265, 250 295" fill="none" stroke="#F4EFE5" strokeWidth="1" opacity="0.4" />
          </g>

          {/* Ceramic Bowl */}
          <g>
            <circle cx="480" cy="220" r="70" fill="#F4EFE5" filter="url(#shadow-soft)" />
            <circle cx="480" cy="220" r="62" fill="#E4DACB" filter="url(#shadow-inner)" />
            <circle cx="480" cy="220" r="55" fill="#D99A24" opacity="0.9" />
          </g>

          {/* Spice Dots */}
          <g className="hero-spice-dots" transform-origin="480 220">
            <circle cx="470" cy="210" r="4" fill="#C9462E" style={{ animationDelay: '0s' }} />
            <circle cx="490" cy="230" r="3" fill="#C9462E" style={{ animationDelay: '0.5s' }} />
            <circle cx="465" cy="235" r="2" fill="#6E4635" style={{ animationDelay: '1s' }} />
            <circle cx="495" cy="205" r="2.5" fill="#6E4635" style={{ animationDelay: '1.5s' }} />
            <circle cx="480" cy="220" r="3.5" fill="#C9462E" style={{ animationDelay: '0.2s' }} />
          </g>

          {/* Thin Vermilion Heat Line */}
          <path
            className="hero-heat-line"
            d="M 120 480 C 250 550, 450 450, 580 320"
            fill="none"
            stroke="#C9462E"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
