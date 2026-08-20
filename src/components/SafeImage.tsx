import React, { useState } from 'react';
import { cn } from '../lib/utils';

export default function SafeImage({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={cn("overflow-hidden bg-muted-light/20 relative", className)}>
      {!error ? (
        <img
          src={src}
          alt={alt}
          className={cn("w-full h-full object-cover transition-opacity duration-700", loaded ? "opacity-100" : "opacity-0")}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          {...props}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-muted-light/10 text-muted-dark text-xs">
          Image unavailable
        </div>
      )}
    </div>
  );
}
