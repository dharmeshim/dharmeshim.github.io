import React from 'react';

export const WireframeTerminal = ({ className }: { className?: string }): JSX.Element => (
  <svg
    width="800"
    height="800"
    viewBox="0 0 800 800"
    className={className}
  >
    {/* Main structural grid */}
    <path d="M0,400 L800,400 M400,0 L400,800" stroke="currentColor" strokeWidth="1" strokeDasharray="10 20" opacity="0.2" />

    {/* Massive Display Screen */}
    <rect x="100" y="150" width="600" height="400" rx="12" stroke="currentColor" strokeWidth="4" fill="none" />
    <rect x="120" y="170" width="560" height="360" rx="4" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.8" />

    {/* Screen UI Elements - Code/Blueprint Blocks */}
    <rect x="160" y="220" width="300" height="12" rx="6" fill="currentColor" opacity="0.6" />
    <rect x="160" y="250" width="400" height="8" rx="4" fill="currentColor" opacity="0.4" />
    <rect x="160" y="270" width="250" height="8" rx="4" fill="currentColor" opacity="0.4" />
    <rect x="160" y="310" width="480" height="8" rx="4" fill="currentColor" opacity="0.3" />
    <rect x="160" y="330" width="350" height="8" rx="4" fill="currentColor" opacity="0.3" />

    {/* Floating Terminal Window inside Screen */}
    <rect x="380" y="360" width="280" height="150" fill="none" stroke="currentColor" strokeWidth="2" className="drop-shadow-lg bg-black" />
    <path d="M380,380 L660,380" stroke="currentColor" strokeWidth="2" />
    <circle cx="400" cy="370" r="4" fill="currentColor" />
    <circle cx="415" cy="370" r="4" fill="currentColor" />
    <rect x="400" y="400" width="200" height="6" fill="currentColor" opacity="0.5" />
    <rect x="400" y="420" width="150" height="6" fill="currentColor" opacity="0.6" />
    <rect x="400" y="440" width="220" height="6" fill="currentColor" opacity="0.4" />
    <rect x="400" y="460" width="180" height="6" fill="currentColor" opacity="0.5" />

    {/* Awwwards specific touch - geometric overlay inside the computer */}
    <circle cx="280" cy="400" r="60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 8" fill="none" opacity="0.8" />
    <circle cx="280" cy="400" r="30" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
    <path d="M220,400 L340,400 M280,340 L280,460" stroke="currentColor" strokeWidth="1" opacity="0.3" />

    {/* Hardware Arm / Stand */}
    <path d="M360,550 L440,550 L460,700 L340,700 Z" stroke="currentColor" strokeWidth="4" fill="none" />
    {/* Rotational joint */}
    <circle cx="400" cy="550" r="16" stroke="currentColor" strokeWidth="4" fill="none" />

    {/* Base / Hardware block */}
    <rect x="250" y="700" width="300" height="30" rx="8" stroke="currentColor" strokeWidth="4" fill="none" />
    <path d="M280,715 L520,715" stroke="currentColor" strokeWidth="2" opacity="0.4" strokeDasharray="5 5" />
  </svg>
);
