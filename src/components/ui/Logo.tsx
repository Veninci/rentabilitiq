
import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo = ({ className, size = 'md' }: LogoProps) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
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
