import React from 'react';

interface SolarSunEmblemProps {
  className?: string;
  size?: number;
}

export default function SolarSunEmblem({ className = '', size = 64 }: SolarSunEmblemProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="solarGlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>

      {/* Crescent twin arcs */}
      <path
        d="M 50 15 A 35 35 0 0 1 50 85 A 28 28 0 0 0 50 15 Z"
        fill="url(#solarGlowGrad)"
      />
      <path
        d="M 58 22 A 28 28 0 0 1 58 78 A 22 22 0 0 0 58 22 Z"
        fill="url(#solarGlowGrad)"
        opacity="0.85"
      />

      {/* Solar Rays / Flame petals around left semi-circle */}
      {/* Top Ray */}
      <path d="M 45 10 C 42 2, 50 0, 52 8 C 50 12, 47 13, 45 10 Z" fill="url(#solarGlowGrad)" />
      {/* Ray 1 */}
      <path d="M 33 14 C 27 6, 36 3, 39 12 C 37 15, 34 16, 33 14 Z" fill="url(#solarGlowGrad)" />
      {/* Ray 2 */}
      <path d="M 23 23 C 14 17, 22 12, 27 20 C 26 23, 23 25, 23 23 Z" fill="url(#solarGlowGrad)" />
      {/* Ray 3 */}
      <path d="M 15 35 C 5 31, 12 24, 18 31 C 18 34, 16 37, 15 35 Z" fill="url(#solarGlowGrad)" />
      {/* Middle Ray */}
      <path d="M 12 50 C 2 48, 7 40, 15 46 C 16 49, 14 52, 12 50 Z" fill="url(#solarGlowGrad)" />
      {/* Ray 5 */}
      <path d="M 15 65 C 5 69, 12 76, 18 69 C 18 66, 16 63, 15 65 Z" fill="url(#solarGlowGrad)" />
      {/* Ray 6 */}
      <path d="M 23 77 C 14 83, 22 88, 27 80 C 26 77, 23 75, 23 77 Z" fill="url(#solarGlowGrad)" />
      {/* Ray 7 */}
      <path d="M 33 86 C 27 94, 36 97, 39 88 C 37 85, 34 84, 33 86 Z" fill="url(#solarGlowGrad)" />
      {/* Bottom Ray */}
      <path d="M 45 90 C 42 98, 50 100, 52 92 C 50 88, 47 87, 45 90 Z" fill="url(#solarGlowGrad)" />
    </svg>
  );
}
