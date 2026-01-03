import * as React from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

export function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  className,
  ...props
}: AvatarProps) {
  const [hasError, setHasError] = React.useState(false);

  const initials = fallback
    ? fallback
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '?';

  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 font-medium text-gray-600',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {src && !hasError ? (
        <img
          src={src}
          alt={alt || 'Avatar'}
          className="h-full w-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}
