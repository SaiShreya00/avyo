
import React from 'react';

interface AvyoLogoProps {
  size?: number;
  className?: string;
  variant?: 'full' | 'icon';
}

const AvyoLogo: React.FC<AvyoLogoProps> = ({ 
  size = 40, 
  className = "",
  variant = 'full'
}) => {
  return (
    <div className={`inline-flex items-center ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 120 120" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base circle */}
        <circle cx="60" cy="60" r="60" fill="#71B7CF" />
        
        {/* Letter A shape */}
        <path 
          d="M40 90L60 30L80 90" 
          stroke="#E3F2F7" 
          strokeWidth="12" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        
        {/* Crossbar of the A */}
        <path 
          d="M45 65H75" 
          stroke="#E3F2F7" 
          strokeWidth="10" 
          strokeLinecap="round" 
        />
        
        {/* Avatar face elements */}
        {/* Eyes */}
        <circle cx="45" cy="48" r="4" fill="#3D7D91" />
        <circle cx="75" cy="48" r="4" fill="#3D7D91" />
        
        {/* Smile */}
        <path 
          d="M45 75Q60 90 75 75" 
          stroke="#3D7D91" 
          strokeWidth="3" 
          strokeLinecap="round" 
          fill="none"
        />
      </svg>
      {variant === 'full' && (
        <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-avyo-primary to-avyo-accent bg-clip-text text-transparent">
          Avyo<span className="text-sm font-medium align-top ml-1">Pro</span>
        </span>
      )}
    </div>
  );
};

export default AvyoLogo;
