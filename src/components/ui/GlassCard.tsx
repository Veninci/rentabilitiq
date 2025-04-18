
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'subtle' | 'results';
  noPadding?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(({
  children,
  className,
  variant = 'default',
  noPadding = false,
  ...props
}, ref) => {
  const variantClasses = {
    default: 'bg-white/80 backdrop-blur-md border border-white/20 shadow-md dark:bg-black/40 dark:border-white/10 dark:text-foreground',
    elevated: 'bg-white/90 backdrop-blur-lg border border-white/30 shadow-lg dark:bg-black/50 dark:border-white/20 dark:text-foreground',
    subtle: 'bg-white/60 backdrop-blur-sm border border-white/10 shadow-sm dark:bg-black/30 dark:border-white/5 dark:text-foreground',
    results: 'bg-white/95 backdrop-blur-lg border border-white/30 shadow-lg dark:bg-gray-800/95 dark:border-gray-700 dark:text-foreground'
  };

  const paddingClass = noPadding ? '' : 'p-4 md:p-6';

  return (
    <div
      ref={ref}
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
});

GlassCard.displayName = 'GlassCard';

export default GlassCard;
