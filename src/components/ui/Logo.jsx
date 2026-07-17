import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { BRAND } from '../../constants/brand';
import { COMPANY } from '../../constants/company';

export default function Logo({
  variant = 'nav',
  className,
  wrapperClassName,
  link = true,
}) {
  const configs = {
    nav: {
      src: BRAND.logoNav,
      className: 'h-14 w-auto max-h-16 object-contain object-left sm:h-16 sm:max-h-[72px]',
      width: 120,
      height: 88,
    },
    icon: {
      src: BRAND.logoIcon,
      className: 'h-11 w-11 object-contain',
      width: 44,
      height: 44,
    },
    full: {
      src: BRAND.logoTransparent,
      className: 'h-auto max-h-48 w-auto max-w-xs object-contain sm:max-w-sm',
      width: 220,
      height: 210,
    },
    footer: {
      src: BRAND.logoFooter,
      className: 'h-auto max-h-20 w-auto max-w-[130px] object-contain sm:max-h-24 sm:max-w-[150px]',
      width: 125,
      height: 120,
    },
    loading: {
      src: BRAND.logoTransparent,
      className: 'h-20 w-auto max-w-[200px] object-contain sm:h-24',
      width: 200,
      height: 190,
    },
  };

  const config = configs[variant] || configs.nav;

  const content = (
    <img
      src={config.src}
      alt={`${COMPANY.name} — ${COMPANY.tagline}`}
      className={cn(config.className, className)}
      width={config.width}
      height={config.height}
      loading={variant === 'loading' ? 'eager' : 'lazy'}
      decoding="async"
    />
  );

  if (link) {
    return (
      <Link
        to="/"
        className={cn('inline-flex shrink-0 items-center', wrapperClassName)}
        aria-label={`${COMPANY.shortName} home`}
      >
        {content}
      </Link>
    );
  }

  return (
    <span className={cn('inline-flex shrink-0 items-center', wrapperClassName)}>
      {content}
    </span>
  );
}
