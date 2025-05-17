
import React from 'react';

interface AvyoLogoProps {
  size?: number;
  className?: string;
}

const AvyoLogo: React.FC<AvyoLogoProps> = ({ size = 40, className = "" }) => {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 120 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="60" cy="60" r="60" fill="#71B7CF" />
        <path 
          d="M36 84L60 36L84 84" 
          stroke="#E3F2F7" 
          strokeWidth="8" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d="M48 60H72" 
          stroke="#E3F2F7" 
          strokeWidth="8" 
          strokeLinecap="round" 
        />
        <circle 
          cx="60" 
          cy="48" 
          r="6" 
          fill="#3D7D91" 
        />
        <circle 
          cx="40" 
          cy="78" 
          r="6" 
          fill="#3D7D91" 
        />
        <circle 
          cx="80" 
          cy="78" 
          r="6" 
          fill="#3D7D91" 
        />
      </svg>
      <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-avyo-primary to-avyo-accent bg-clip-text text-transparent">
        Avyo
      </span>
    </div>
  );
};

export default AvyoLogo;
