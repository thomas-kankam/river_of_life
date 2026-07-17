import { useScrollProgress } from '../../hooks/useScroll';
import { cn } from '../../utils/cn';

export default function ReadingProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed left-0 top-0 z-[9998] h-1 w-full bg-royal-200"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div
        className={cn('h-full bg-gradient-brand transition-[width] duration-150 ease-out')}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
