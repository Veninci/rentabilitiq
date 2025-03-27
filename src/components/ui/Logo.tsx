
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const Logo = ({ className, size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
    xl: 'h-12 w-12',
    '2xl': 'h-16 w-16'
  };

  return (
    <img 
      src="/lovable-uploads/71fc55e6-6ea4-4084-8ca8-1a2681305298.png" 
      alt="RentabilitiQ Logo" 
      className={cn(sizeClasses[size], className)}
    />
  );
};

export default Logo;
