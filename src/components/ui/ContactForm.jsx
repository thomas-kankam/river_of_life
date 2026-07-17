import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Check, ChevronDown } from 'lucide-react';
import Button from './Button';
import { submitContactForm } from '../../services/formService';
import { SERVICES } from '../../data/services';
import { cn } from '../../utils/cn';

const SERVICE_OPTIONS = [
  { value: '', label: 'Select a service' },
  ...SERVICES.slice(0, 8).map((s) => ({ value: s.slug, label: s.title })),
  { value: 'consultation', label: 'Free Consultation' },
  { value: 'other', label: 'Other / Not Sure' },
];

const inputClass = 'form-input';

export default function ContactForm({ compact = false, formType = 'contact' }) {
  const [serviceOpen, setServiceOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { service: '' } });

  const onSubmit = async (data) => {
    try {
      const result = await submitContactForm(data, formType);
      if (result?.dev) {
        toast.success('Message received (dev mode). Configure .env for live delivery.');
      } else {
        toast.success('Thank you! Our care team will contact you shortly.');
      }
      reset();
    } catch (error) {
      toast.error(error.message || 'Something went wrong. Please call us directly.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className={compact ? 'grid gap-5' : 'grid gap-5 sm:grid-cols-2'}>
        <div>
          <label htmlFor="firstName" className="mb-2 block text-sm font-semibold text-deep-700">First Name</label>
          <input
            id="firstName"
            type="text"
            placeholder="Jane"
            className={inputClass}
            {...register('firstName', { required: 'First name is required' })}
            aria-invalid={errors.firstName ? 'true' : 'false'}
          />
          {errors.firstName && <p className="mt-1.5 text-sm text-red-600" role="alert">{errors.firstName.message}</p>}
        </div>
        <div>
          <label htmlFor="lastName" className="mb-2 block text-sm font-semibold text-deep-700">Last Name</label>
          <input
            id="lastName"
            type="text"
            placeholder="Doe"
            className={inputClass}
            {...register('lastName', { required: 'Last name is required' })}
            aria-invalid={errors.lastName ? 'true' : 'false'}
          />
          {errors.lastName && <p className="mt-1.5 text-sm text-red-600" role="alert">{errors.lastName.message}</p>}
        </div>
      </div>

      <div className={compact ? 'grid gap-5' : 'grid gap-5 sm:grid-cols-2'}>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-semibold text-deep-700">Email</label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            className={inputClass}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
            })}
            aria-invalid={errors.email ? 'true' : 'false'}
          />
          {errors.email && <p className="mt-1.5 text-sm text-red-600" role="alert">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-deep-700">Phone</label>
          <input
            id="phone"
            type="tel"
            placeholder="(267) 555-0123"
            className={inputClass}
            {...register('phone', { required: 'Phone is required' })}
            aria-invalid={errors.phone ? 'true' : 'false'}
          />
          {errors.phone && <p className="mt-1.5 text-sm text-red-600" role="alert">{errors.phone.message}</p>}
        </div>
      </div>

      {!compact && (
        <div>
          <label htmlFor="service" className="mb-2 block text-sm font-semibold text-deep-700">Service of Interest</label>
          <Controller
            name="service"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <button
                  id="service"
                  type="button"
                  className={cn(
                    inputClass,
                    'flex items-center justify-between pr-12 text-left',
                    !field.value && 'text-deep-400',
                    serviceOpen && 'border-teal-400 ring-4 ring-teal-100'
                  )}
                  aria-haspopup="listbox"
                  aria-expanded={serviceOpen}
                  onClick={() => setServiceOpen((open) => !open)}
                  onBlur={() => window.setTimeout(() => setServiceOpen(false), 120)}
                >
                  <span>
                    {SERVICE_OPTIONS.find((opt) => opt.value === field.value)?.label || SERVICE_OPTIONS[0].label}
                  </span>
                  <ChevronDown
                    className={cn(
                      'pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-royal-600 transition-transform duration-200',
                      serviceOpen && 'rotate-180'
                    )}
                    aria-hidden="true"
                  />
                </button>

                {serviceOpen && (
                  <div
                    className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-2xl border border-deep-100 bg-white p-1.5 shadow-lift"
                    role="listbox"
                    aria-label="Service of Interest"
                  >
                    {SERVICE_OPTIONS.filter((opt) => opt.value !== '').map((opt) => {
                      const selected = opt.value === field.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          role="option"
                          aria-selected={selected}
                          className={cn(
                            'flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left text-sm font-medium transition-colors',
                            selected
                              ? 'bg-royal-50 text-royal-800'
                              : 'text-deep-700 hover:bg-sand-100 hover:text-royal-800'
                          )}
                          onMouseDown={(event) => event.preventDefault()}
                          onClick={() => {
                            field.onChange(opt.value);
                            setServiceOpen(false);
                          }}
                        >
                          <span>{opt.label}</span>
                          {selected && <Check className="h-4 w-4 text-teal-600" aria-hidden="true" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          />
          <p className="mt-2 text-sm text-deep-400">Not sure? Choose Free Consultation — we&apos;ll help you decide.</p>
        </div>
      )}

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-deep-700">How can we help?</label>
        <textarea
          id="message"
          rows={compact ? 4 : 5}
          placeholder="Tell us about your loved one's care needs..."
          className={cn(inputClass, 'resize-y min-h-[120px]')}
          {...register('message', { required: 'Please share a brief message' })}
          aria-invalid={errors.message ? 'true' : 'false'}
        />
        {errors.message && <p className="mt-1.5 text-sm text-red-600" role="alert">{errors.message.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
