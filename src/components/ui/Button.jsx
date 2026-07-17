import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  white:
    'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 font-semibold text-royal-700 shadow-soft transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-card focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2',
  outline:
    'inline-flex items-center justify-center gap-2 rounded-full border border-white/50 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-white/80 hover:bg-white/15',
  gold:
    'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-gold px-6 py-3 font-semibold text-deep-900 shadow-soft transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:shadow-card focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: '',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className,
  icon: Icon,
  iconPosition = 'right',
  ...props
}) {
  const classes = cn(variants[variant], sizes[size], 'group/btn', className);

  const content = (
    <>
      {Icon && iconPosition === 'left' && (
        <Icon
          className="h-5 w-5 transition-transform duration-300 ease-smooth group-hover/btn:-translate-x-0.5"
          aria-hidden="true"
        />
      )}
      <span className="relative z-[1]">{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon
          className="relative z-[1] h-5 w-5 transition-transform duration-300 ease-smooth group-hover/btn:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
}
