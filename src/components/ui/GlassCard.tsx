
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'subtle';
  noPadding?: boolean;
}

const GlassCard = ({
  children,
  className,
  variant = 'default',
  noPadding = false,
  ...props
}: GlassCardProps) => {
  const variantClasses = {
    default: 'bg-white/80 backdrop-blur-md border border-white/20 shadow-md dark:bg-black/40 dark:border-white/10 dark:text-foreground',
    elevated: 'bg-white/90 backdrop-blur-lg border border-white/30 shadow-lg dark:bg-black/50 dark:border-white/20 dark:text-foreground',
    subtle: 'bg-white/60 backdrop-blur-sm border border-white/10 shadow-sm dark:bg-black/30 dark:border-white/5 dark:text-foreground',
  };

  const paddingClass = noPadding ? '' : 'p-4 md:p-6';

  return (
    <div
      className={cn(
        'rounded-xl md:rounded-2xl transition-all duration-300',
        variantClasses[variant],
        paddingClass,
        'animate-scale-in',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
