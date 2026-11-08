import type { ReactNode } from 'react';

// SEO: the <h2> carries the existing keyword heading word for word. It comes first in the HTML
// (crawlers and screen readers read the keyword heading first); flex-col-reverse shows the large
// display line first, with the keyword heading beneath it as a brass subtitle. The display line
// is never a heading. Motion reveals [data-reveal="heading"].
export const SectionHead = ({
  id,
  title,
  display,
  tone = 'counter',
  center = false,
  className = '',
}: {
  id: string;
  title: ReactNode;
  display?: ReactNode;
  /** 'velvet' and 'counter' set the heading colour for its ground */
  tone?: 'counter' | 'velvet';
  center?: boolean;
  className?: string;
}) => (
  <div className={`flex flex-col-reverse ${center ? 'items-center text-center' : ''} ${className}`}>
    <h2
      id={id}
      className={`kicker ${display ? 'mt-3' : ''} ${tone === 'velvet' ? 'text-brass-hi' : 'text-[#c6aa78]'} ${center ? 'mx-auto' : ''} max-w-[40ch]`}
    >
      {title}
    </h2>
    {display && (
      <p
        data-reveal="heading"
        className={`display font-bold tracking-[-0.025em] text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1.06] ${center ? 'mx-auto' : ''} max-w-[18ch]`}
      >
        {display}
      </p>
    )}
  </div>
);
