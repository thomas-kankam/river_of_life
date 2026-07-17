import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Button from './Button';
import { submitNewsletterForm } from '../../services/formService';
import { cn } from '../../utils/cn';

export default function NewsletterForm({ light = false, stacked = false }) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async ({ email }) => {
    try {
      const result = await submitNewsletterForm(email);
      if (result?.dev) {
        toast.success('Subscribed (dev mode). Configure .env for live delivery.');
      } else {
        toast.success('Welcome! You\'ve been subscribed to our care newsletter.');
      }
      reset();
    } catch (error) {
      toast.error(error.message || 'Subscription failed. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        'flex w-full gap-2',
        stacked ? 'flex-col' : 'flex-row items-start'
      )}
    >
      <div className="min-w-0 flex-1">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="Enter your email"
          className={cn(
            'w-full rounded-full px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400',
            light
              ? 'border border-white/20 bg-white/10 text-white placeholder:text-white/50'
              : 'border border-deep-200 bg-white text-deep-800'
          )}
          {...register('email', {
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
          })}
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && <p className="mt-1 text-xs text-red-400" role="alert">{errors.email.message}</p>}
      </div>
      <Button
        type="submit"
        variant={light ? 'white' : 'primary'}
        disabled={isSubmitting}
        className={cn('shrink-0 px-5 py-2.5 text-sm', stacked && 'w-full')}
      >
        {isSubmitting ? '...' : 'Subscribe'}
      </Button>
    </form>
  );
}
