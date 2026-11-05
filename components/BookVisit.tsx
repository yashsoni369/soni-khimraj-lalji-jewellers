import { useRef, useState, type FormEvent, type ReactNode } from 'react';
import { CalendarDays, X } from 'lucide-react';
import { trackAppointmentRequest, type CtaLocation, type VisitPurpose } from '@/lib/tracking';
import { createAppointmentMessage, whatsappUrl } from '@/services/whatsappService';

const PURPOSES: { value: VisitPurpose; label: string }[] = [
  { value: 'bridal', label: 'Bridal jewellery' },
  { value: 'general', label: 'General shopping' },
  { value: 'old_gold_exchange', label: 'Old gold exchange' },
  { value: 'custom_order', label: 'Custom / made-to-order' },
];

const TIMES = ['Morning (10 AM – 1 PM)', 'Afternoon (1 – 5 PM)', 'Evening (5 – 9:30 PM)'];

// Built only when the dialog opens, so server and client HTML never differ.
function nextDays(count: number) {
  const fmt = new Intl.DateTimeFormat('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
  const today = new Date();
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const label = fmt.format(d);
    return i === 0 ? `Today, ${label}` : i === 1 ? `Tomorrow, ${label}` : label;
  });
}

/**
 * "Book a visit" button + dialog. Sends the chosen purpose/day/time to the shop on
 * WhatsApp and fires `appointment_request`.
 */
export const BookVisitButton = ({
  location,
  defaultPurpose = 'general',
  className,
  children,
}: {
  location: CtaLocation;
  defaultPurpose?: VisitPurpose;
  className?: string;
  children?: ReactNode;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [days, setDays] = useState<string[]>([]);

  const open = () => {
    setDays(nextDays(14));
    dialogRef.current?.showModal();
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const purpose = data.get('purpose') as VisitPurpose;
    const day = String(data.get('day'));
    const time = String(data.get('time'));
    const purposeLabel = PURPOSES.find((p) => p.value === purpose)?.label ?? purpose;

    trackAppointmentRequest({ cta_location: location, visit_purpose: purpose, visit_day: day, visit_time: time });
    const url = whatsappUrl(createAppointmentMessage(purposeLabel, day, time));
    // window.open with 'noopener' always returns null, so detach the opener manually.
    const win = window.open(url, '_blank');
    if (win) win.opener = null;
    else window.location.href = url;
    dialogRef.current?.close();
  };

  const field = 'w-full border border-gold-300 bg-white px-3 py-2.5 text-gray-900 rounded-sm focus:outline-none focus:ring-2 focus:ring-gold-500';

  return (
    <>
      <button type="button" onClick={open} className={className}>
        {children ?? (
          <>
            <CalendarDays size={18} aria-hidden="true" /> Book a Visit
          </>
        )}
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby={`book-visit-title-${location}`}
        className="w-[calc(100%-2rem)] max-w-md p-0 rounded-sm shadow-2xl backdrop:bg-maroon-950/70"
        onClick={(e) => e.target === dialogRef.current && dialogRef.current?.close()}
      >
        <form onSubmit={submit} className="p-6 md:p-8 bg-cream-50 text-left">
          <div className="flex items-start justify-between gap-4 mb-2">
            <p id={`book-visit-title-${location}`} className="font-serif text-2xl text-maroon-900">
              Book a visit
            </p>
            <button type="button" onClick={() => dialogRef.current?.close()} className="p-1 text-gray-600 hover:text-maroon-900" aria-label="Close">
              <X size={20} />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Choose a time and we’ll confirm on WhatsApp. Open every day, 10 AM – 9:30 PM.
          </p>

          <label className="block text-xs uppercase tracking-widest text-gray-700 mb-1.5" htmlFor={`bv-purpose-${location}`}>
            Purpose
          </label>
          <select id={`bv-purpose-${location}`} name="purpose" defaultValue={defaultPurpose} className={`${field} mb-4`}>
            {PURPOSES.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>

          <label className="block text-xs uppercase tracking-widest text-gray-700 mb-1.5" htmlFor={`bv-day-${location}`}>
            Day
          </label>
          <select id={`bv-day-${location}`} name="day" required className={`${field} mb-4`}>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <label className="block text-xs uppercase tracking-widest text-gray-700 mb-1.5" htmlFor={`bv-time-${location}`}>
            Time
          </label>
          <select id={`bv-time-${location}`} name="time" className={`${field} mb-6`}>
            {TIMES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white py-3.5 rounded-sm font-semibold tracking-wide transition-colors"
          >
            Send on WhatsApp
          </button>
        </form>
      </dialog>
    </>
  );
};
