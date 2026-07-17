import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function Breadcrumbs({ items, light = false }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className={cn(
        'flex flex-wrap items-center gap-2 text-sm',
        light ? 'text-white/70' : 'text-deep-500'
      )}>
        {items.map((item, index) => (
          <li key={item.path} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />}
            {index === items.length - 1 ? (
              <span className={cn('font-medium', light ? 'text-white' : 'text-deep-900')} aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link
                to={item.path}
                className={cn(
                  'transition-colors',
                  light ? 'hover:text-white' : 'hover:text-royal-700'
                )}
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
