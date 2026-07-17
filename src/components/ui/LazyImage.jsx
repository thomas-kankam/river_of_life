import { useState, useEffect, useRef } from 'react';
import { cn } from '../../utils/cn';

export default function LazyImage({
  src,
  alt,
  className,
  wrapperClassName,
  priority = false,
  ...props
}) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setFailed(false);
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
      return;
    }
    setLoaded(false);
  }, [src]);

  return (
    <div className={cn('relative overflow-hidden bg-deep-100', wrapperClassName)}>
      {!loaded && !failed && (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-r from-deep-100 via-deep-50 to-deep-100 bg-[length:200%_100%]"
          aria-hidden="true"
        />
      )}
      {failed && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-soft px-5 text-center text-sm font-medium text-deep-500">
          Image temporarily unavailable
        </div>
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => {
          setFailed(true);
          setLoaded(false);
        }}
        className={cn(
          'h-full w-full object-cover transition-opacity duration-700',
          loaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        {...props}
      />
    </div>
  );
}
