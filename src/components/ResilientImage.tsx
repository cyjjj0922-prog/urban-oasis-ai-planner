import { useState } from 'react';
import { Trees } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  aspectClassName = 'aspect-[4/3]',
  fallbackTitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EAE4D7] via-[#DFE4DC] to-[#D2DDD4] text-[#355243] p-6 ${aspectClassName} ${className}`}
      >
        <Trees className="w-8 h-8 mb-3 opacity-70" strokeWidth={1.5} />
        {fallbackTitle ? (
          <p className="font-editorial text-sm tracking-wide text-center">
            {fallbackTitle}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
