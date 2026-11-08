// Velvet Counter motion layer (approved preview: .impeccable/research/motion-preview/index.html,
// research: .impeccable/research/motion/system-v2.md).
// Lives in root.tsx after <Outlet/> so its per-route effects run after the route's own effects and
// before <ScrollRestoration/> restores the position (pins already exist when Back lands).
// Rules: content is complete in the server HTML; nothing here hides the H1 or the hero image;
// everything sits inside gsap.matchMedia so "reduce motion" gets the static page.
import { useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

const MOTION = '(prefers-reduced-motion: no-preference)';
const DESKTOP = '(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)';
const FINE = '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) and (forced-colors: none)';
const TA = 'play none none reverse';

let lenis: Lenis | null = null;

export function MotionLayer() {
  const root = useRef<HTMLDivElement>(null);
  const { pathname, key } = useLocation();
  const navigate = useNavigate();
  const covering = useRef(false);

  // ---------- once: smooth scroll, header, loupe, magnetic, jhumka, page shutter ----------
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Lenis: desktop pointers only; phones keep native scrolling.
      mm.add(FINE, () => {
        lenis = new Lenis({ autoRaf: false, anchors: true, stopInertiaOnNavigate: true, allowNestedScroll: true });
        lenis.on('scroll', ScrollTrigger.update);
        const tick = (t: number) => lenis?.raf(t * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        // modal dialogs (BookVisit) pause the page scroll while open
        const lock = () => lenis?.stop();
        const unlock = () => lenis?.start();
        document.addEventListener('skl:modal-open', lock);
        document.addEventListener('skl:modal-close', unlock);
        return () => {
          document.removeEventListener('skl:modal-open', lock);
          document.removeEventListener('skl:modal-close', unlock);
          gsap.ticker.remove(tick);
          gsap.ticker.lagSmoothing(500, 33);
          lenis?.destroy();
          lenis = null;
        };
      });

      // Header hides on scroll down, returns on scroll up (the WhatsApp pill stays).
      mm.add(MOTION, () => {
        const hdr = document.getElementById('site-header');
        if (!hdr) return;
        const st = ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (s) => hdr.setAttribute('data-hidden', String(s.direction === 1 && s.scroll() > 260)),
        });
        return () => {
          st.kill();
          hdr.removeAttribute('data-hidden');
        };
      });

      // Magnetic primary buttons: the label leans, the hit area never moves.
      mm.add(FINE, () => {
        const off: Array<() => void> = [];
        const bind = (b: HTMLElement) => {
          const inner = b.querySelector<HTMLElement>('.btn-in');
          if (!inner || b.dataset.magnet) return;
          b.dataset.magnet = '1';
          const xTo = gsap.quickTo(inner, 'x', { duration: 0.4, ease: 'power3' });
          const yTo = gsap.quickTo(inner, 'y', { duration: 0.4, ease: 'power3' });
          const move = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse') return;
            const r = b.getBoundingClientRect();
            xTo(gsap.utils.clamp(-6, 6, (e.clientX - r.left - r.width / 2) * 0.25));
            yTo(gsap.utils.clamp(-6, 6, (e.clientY - r.top - r.height / 2) * 0.25));
          };
          const leave = () => { xTo(0); yTo(0); };
          b.addEventListener('pointermove', move);
          b.addEventListener('pointerleave', leave);
          off.push(() => { b.removeEventListener('pointermove', move); b.removeEventListener('pointerleave', leave); delete b.dataset.magnet; });
        };
        const scan = () => document.querySelectorAll<HTMLElement>('.magnetic').forEach(bind);
        scan();
        const mo = new MutationObserver(scan);
        mo.observe(document.body, { childList: true, subtree: true });
        return () => { mo.disconnect(); off.forEach((f) => f()); };
      });

      // Loupe over jewellery photos (mouse only; the native cursor stays as zoom-in).
      mm.add(FINE, () => {
        const lens = root.current?.querySelector<HTMLDivElement>('.loupe');
        if (!lens) return;
        // the magnified image is created here, not in the server HTML (an <img> with no src is invalid)
        const big = document.createElement('img');
        big.alt = '';
        big.decoding = 'async';
        lens.prepend(big);
        const Z = 2.4, R = 85;
        const p = { x: 0, y: 0 };
        let box: DOMRect | null = null;
        let active: HTMLImageElement | null = null;
        const lx = gsap.quickSetter(lens, 'x', 'px'), ly = gsap.quickSetter(lens, 'y', 'px');
        const bx = gsap.quickSetter(big, 'x', 'px'), by = gsap.quickSetter(big, 'y', 'px');
        const xTo = gsap.quickTo(p, 'x', { duration: 0.18, ease: 'power3' });
        const yTo = gsap.quickTo(p, 'y', { duration: 0.18, ease: 'power3' });
        const render = () => {
          if (!box) return;
          lx(p.x - R); ly(p.y - R);
          bx(R - (p.x - box.left) * Z); by(R - (p.y - box.top) * Z);
        };
        const show = (img: HTMLImageElement, e: PointerEvent) => {
          box = img.getBoundingClientRect();
          big.src = img.dataset.loupe || img.currentSrc || img.src;
          gsap.set(big, { width: box.width * Z, height: box.height * Z });
          p.x = e.clientX; p.y = e.clientY; xTo(e.clientX, e.clientX); yTo(e.clientY, e.clientY);
          gsap.to(lens, { autoAlpha: 1, scale: 1, duration: 0.2 });
          gsap.ticker.add(render);
        };
        const hide = () => { gsap.to(lens, { autoAlpha: 0, scale: 0.92, duration: 0.15 }); gsap.ticker.remove(render); };
        const onMove = (e: PointerEvent) => {
          const t = e.target as Element | null;
          const img = e.pointerType === 'mouse' && t?.closest ? (t.closest('img[data-loupe]') as HTMLImageElement | null) : null;
          if (img !== active) { if (active) hide(); if (img) show(img, e); active = img; }
          if (active) { xTo(e.clientX); yTo(e.clientY); }
        };
        const onScroll = () => {
          if (!active) return;
          const under = document.elementFromPoint(p.x, p.y);
          const img = under?.closest ? (under.closest('img[data-loupe]') as HTMLImageElement | null) : null;
          if (img !== active) { hide(); active = null; return; }
          box = active.getBoundingClientRect();
        };
        const onLeave = () => { if (active) { hide(); active = null; } };
        document.addEventListener('pointermove', onMove, { passive: true });
        window.addEventListener('scroll', onScroll, { passive: true });
        document.documentElement.addEventListener('pointerleave', onLeave);
        document.documentElement.classList.add('loupe-on');
        return () => {
          document.removeEventListener('pointermove', onMove);
          window.removeEventListener('scroll', onScroll);
          document.documentElement.removeEventListener('pointerleave', onLeave);
          document.documentElement.classList.remove('loupe-on');
          gsap.ticker.remove(render);
          gsap.set(lens, { autoAlpha: 0 });
          big.remove();
        };
      });

      // Jhumka hangs from the chain tip and sways with scroll speed (desktop).
      mm.add('(min-width: 821px) and (prefers-reduced-motion: no-preference)', () => {
        const jh = root.current?.querySelector<HTMLImageElement>('.companion');
        const chain = root.current?.querySelector<HTMLElement>('.chain');
        if (!jh || !chain) return;
        document.documentElement.classList.add('jhumka-on');
        const rotTo = gsap.quickTo(jh, 'rotation', { duration: 0.9, ease: 'elastic.out(1, 0.35)' });
        let target = 0;
        const place = (p: number) => {
          const r = chain.getBoundingClientRect();
          gsap.set(jh, { y: r.top + p * r.height - 4 });
        };
        place(0);
        const st = ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (s) => {
            place(s.progress);
            target = gsap.utils.clamp(-18, 18, -s.getVelocity() / 160);
            rotTo(target);
          },
          onRefresh: (s) => place(s.progress),
        });
        const decay = () => { if (Math.abs(target) > 0.2) { target *= 0.9; rotTo(target); } };
        gsap.ticker.add(decay);
        return () => {
          st.kill();
          gsap.ticker.remove(decay);
          gsap.set(jh, { clearProps: 'transform' });
          document.documentElement.classList.remove('jhumka-on');
        };
      });

      // Brass shutter between pages: intercept plain left clicks on internal links.
      mm.add(MOTION, () => {
        const sh = root.current?.querySelector<HTMLElement>('.shutter');
        if (!sh) return;
        const onClick = (e: MouseEvent) => {
          if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
          const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
          if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
          const url = new URL(a.href, location.href);
          if (url.origin !== location.origin) return;
          if (url.pathname === location.pathname) return; // same page (hash links) scrolls normally
          if (/\.(vcf|xml|txt|pdf|webp|png|jpe?g)$/i.test(url.pathname) || url.pathname.startsWith('/api/')) return;
          e.preventDefault();
          e.stopPropagation();
          covering.current = true;
          gsap.timeline()
            .set(sh, { transformOrigin: '50% 0%', display: 'block' })
            .fromTo(sh, { scaleY: 0 }, { scaleY: 1, duration: 0.42, ease: 'power3.inOut' })
            .add(() => navigate(url.pathname + url.search + url.hash));
        };
        document.addEventListener('click', onClick, true);
        return () => document.removeEventListener('click', onClick, true);
      });
    },
    { scope: root }
  );

  // Lenis must not carry inertia into React Router's scroll restoration.
  useLayoutEffect(() => {
    lenis?.stop();
    lenis?.start();
  }, [key]);

  // ---------- per route: the shutter lifts, focus moves to the new H1 ----------
  useGSAP(
    () => {
      if (!covering.current) return;
      covering.current = false;
      const sh = root.current?.querySelector<HTMLElement>('.shutter');
      if (sh) gsap.to(sh, { scaleY: 0, duration: 0.5, delay: 0.06, ease: 'power3.inOut', onComplete: () => { gsap.set(sh, { display: 'none' }); } });
      const h1 = document.querySelector<HTMLElement>('main h1');
      if (h1) {
        if (!h1.hasAttribute('tabindex')) h1.setAttribute('tabindex', '-1');
        h1.focus({ preventScroll: true });
      }
    },
    { dependencies: [pathname] }
  );

  // ---------- per route: section choreography (rebuilt on every route) ----------
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      const below = (el: Element) => el.getBoundingClientRect().top > window.innerHeight * 0.9;

      mm.add(MOTION, () => {
        // hero: settle after paint + text parallax
        const heroImg = document.querySelector<HTMLElement>('#top .hero-img');
        if (heroImg) {
          gsap.fromTo(heroImg, { scale: 1.04 }, { scale: 1, duration: 1.6, ease: 'power3.out' });
          gsap.to('#top .hero-copy', { yPercent: -14, ease: 'none', scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true } });
          gsap.to('#top .hero-bg', { yPercent: 7, ease: 'none', scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true } });
        }

        // display headings rise line by line (never the H1)
        gsap.utils.toArray<HTMLElement>('[data-reveal="heading"]').forEach((el) => {
          if (!below(el)) return;
          SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            aria: 'none', // the split lines keep the real text, so no aria-label on the <p>

            onSplit: (s) => gsap.from(s.lines, { yPercent: 105, duration: 0.9, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 86%', toggleActions: TA } }),
          });
        });

        // trust band moves only while the page scrolls
        gsap.utils.toArray<HTMLElement>('[data-band]').forEach((band) => {
          gsap.fromTo(band, { x: 48 }, { x: -48, ease: 'none', scrollTrigger: { trigger: band, start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
        });

        // section colours: a short tween of --page-bg as each section takes the stage
        const page = document.getElementById('main');
        gsap.utils.toArray<HTMLElement>('[data-bg]').forEach((sec) => {
          const c = sec.dataset.bg!;
          ScrollTrigger.create({
            trigger: sec,
            start: 'top 55%',
            end: 'bottom 55%',
            onEnter: () => page && gsap.to(page, { '--page-bg': c, duration: 0.6, overwrite: 'auto' }),
            onEnterBack: () => page && gsap.to(page, { '--page-bg': c, duration: 0.6, overwrite: 'auto' }),
          });
        });

        // rate card: stamp presses in, one glass sheen
        gsap.utils.toArray<HTMLElement>('[data-ratecard]').forEach((card) => {
          const tl = gsap.timeline({ scrollTrigger: { trigger: card, start: 'top 78%', toggleActions: TA } });
          const stamp = card.querySelector('[data-stamp]');
          const sheen = card.querySelector('[data-sheen]');
          if (stamp) tl.fromTo(stamp, { scale: 1.35, autoAlpha: 0, rotate: -24 }, { scale: 1, autoAlpha: 1, rotate: -12, duration: 0.45, ease: 'back.out(2.2)' }, 0.1);
          if (sheen) tl.fromTo(sheen, { xPercent: 0, autoAlpha: 1 }, { xPercent: 520, duration: 1.3, ease: 'power2.inOut' }, 0).set(sheen, { autoAlpha: 0 });
        });

        // story words light up as you read
        gsap.utils.toArray<HTMLElement>('[data-fill]').forEach((el) => {
          SplitText.create(el, {
            type: 'words',
            autoSplit: true,
            aria: 'none',
            // unlit words use a muted colour (not opacity) so they still pass 4.5:1 contrast
            onSplit: (s) =>
              gsap.fromTo(s.words, { color: '#8d9690' }, { color: getComputedStyle(el).color, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true } }),
          });
        });

        // numbers roll into place once
        gsap.utils.toArray<HTMLElement>('[data-odo]').forEach((el) => {
          const val = el.dataset.odo || el.textContent || '';
          if (!/^\d+$/.test(val)) return;
          const orig = el.innerHTML;
          el.innerHTML =
            `<span class="sr-only">${val}</span>` +
            val
              .split('')
              .map(() => `<span class="odo-col" aria-hidden="true"><span>${'0123456789'.split('').map((n) => `<span>${n}</span>`).join('')}</span></span>`)
              .join('');
          el.querySelectorAll<HTMLElement>('.odo-col > span').forEach((c, i) =>
            gsap.fromTo(c, { yPercent: 0 }, { yPercent: -10 * Number(val[i]), duration: 1.4 + i * 0.15, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: TA } })
          );
          return () => { el.innerHTML = orig; };
        });

        // WhatsApp nudges once when the visit block arrives
        const nudge = document.querySelector('[data-nudge]');
        if (nudge) {
          gsap.timeline({ scrollTrigger: { trigger: nudge, start: 'top 75%', once: true } })
            .to(nudge, { rotate: 14, duration: 0.08 }).to(nudge, { rotate: -12, duration: 0.08 })
            .to(nudge, { rotate: 10, duration: 0.08 }).to(nudge, { rotate: -6, duration: 0.08 }).to(nudge, { rotate: 0, duration: 0.12 });
        }
      });

      // tray rail: pinned sideways scroll on desktop; phones swipe natively
      mm.add(DESKTOP, () => {
        gsap.utils.toArray<HTMLElement>('[data-rail]').forEach((track) => {
          const wrap = track.closest<HTMLElement>('section') ?? track.parentElement!;
          const dist = () => Math.max(0, track.scrollWidth - window.innerWidth + 32);
          if (dist() < 40) return;
          track.classList.add('is-pinned');
          const hdr = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--hdr')) || 64;
          const slide = gsap.to(track, {
            x: () => -dist(),
            ease: 'none',
            scrollTrigger: { trigger: wrap, start: `top ${hdr}px`, end: () => `+=${dist()}`, pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true },
          });
          const nav = wrap.querySelector<HTMLElement>('[data-rail-nav]');
          if (nav) nav.style.visibility = 'hidden';
          track.querySelectorAll<HTMLElement>(':scope > li').forEach((t) => {
            const tag = t.querySelector('.tray-tag');
            if (tag) gsap.from(tag, { yPercent: 140, autoAlpha: 0, duration: 0.5, ease: 'power3.out', scrollTrigger: { trigger: t, containerAnimation: slide, start: 'left 85%', toggleActions: TA } });
            ScrollTrigger.create({ trigger: t, containerAnimation: slide, start: 'left 70%', onEnter: () => { t.classList.remove('shine'); void t.offsetWidth; t.classList.add('shine'); } });
          });
          const onFocus = (e: FocusEvent) => {
            const card = (e.target as Element).closest<HTMLElement>('li');
            const st = slide.scrollTrigger;
            if (!card || !st) return;
            const y = st.start + (card.offsetLeft / Math.max(1, track.scrollWidth)) * (st.end - st.start);
            if (lenis) lenis.scrollTo(y, { immediate: true }); else window.scrollTo(0, y);
          };
          track.addEventListener('focusin', onFocus);
          return () => { track.removeEventListener('focusin', onFocus); track.classList.remove('is-pinned'); if (nav) nav.style.visibility = ''; };
        });

        // old-gold story: each step photo lifts open like a tray lid as it arrives (text column stays put)
        gsap.utils.toArray<HTMLElement>('[data-oldgold] [data-og-step] figure > div').forEach((frame) => {
          const img = frame.querySelector('img');
          if (!below(frame)) return;
          const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: 'top 82%', toggleActions: TA } });
          tl.fromTo(frame, { clipPath: 'inset(46% 0% 46% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.15, ease: 'expo.inOut' });
          if (img) tl.fromTo(img, { scale: 1.08 }, { scale: 1, duration: 1.35, ease: 'power3.out' }, 0);
        });

        // occasions stack: each tray slides over the last, which sinks back
        gsap.utils.toArray<HTMLElement>('[data-stack]').forEach((stack) => {
          const cards = gsap.utils.toArray<HTMLElement>('[data-stack-card]', stack);
          cards.forEach((c, i) => {
            const next = cards[i + 1];
            if (!next) return;
            const st = { trigger: next, start: 'top bottom', end: `top ${120 + i * 16}px`, scrub: true };
            gsap.to(c, { scale: 0.94, ease: 'none', scrollTrigger: st });
            const dim = c.querySelector('[data-dim]');
            if (dim) gsap.to(dim, { opacity: 0.45, ease: 'none', scrollTrigger: { ...st } });
          });
        });

        // categories: a photo follows the pointer down the list
        gsap.utils.toArray<HTMLElement>('[data-follow]').forEach((list) => {
          const fol = list.querySelector<HTMLElement>('[data-follow-img]');
          if (!fol) return;
          const imgs = fol.querySelectorAll('img');
          const yTo = gsap.quickTo(fol, 'y', { duration: 0.5, ease: 'power3' });
          const move = (e: PointerEvent) => {
            if (e.pointerType !== 'mouse') return;
            const r = list.getBoundingClientRect();
            yTo(gsap.utils.clamp(0, r.height - fol.offsetHeight, e.clientY - r.top - fol.offsetHeight / 2));
          };
          const over = (e: PointerEvent) => {
            const row = (e.target as Element).closest<HTMLElement>('[data-follow-i]');
            if (!row) return;
            imgs.forEach((im, i) => im.classList.toggle('on', i === Number(row.dataset.followI)));
            gsap.to(fol, { autoAlpha: 1, duration: 0.3 });
          };
          const leave = () => gsap.to(fol, { autoAlpha: 0, duration: 0.3 });
          list.addEventListener('pointermove', move);
          list.addEventListener('pointerover', over);
          list.addEventListener('pointerleave', leave);
          return () => { list.removeEventListener('pointermove', move); list.removeEventListener('pointerover', over); list.removeEventListener('pointerleave', leave); };
        });
      });

      // phones: light versions (no pins)
      mm.add('(max-width: 899px) and (prefers-reduced-motion: no-preference), (hover: none) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('[data-rail]').forEach((track) => {
          const trays = track.querySelectorAll(':scope > li');
          gsap.from(trays, { y: 28, autoAlpha: 0, duration: 0.8, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: track, start: 'top 85%', toggleActions: TA } });
        });
        gsap.utils.toArray<HTMLElement>('[data-oldgold] [data-og-step]').forEach((l) =>
          gsap.from(l, { y: 30, autoAlpha: 0, duration: 0.8, ease: 'expo.out', scrollTrigger: { trigger: l, start: 'top 86%', toggleActions: TA } })
        );
      });

      // fonts and images change layout after first paint
      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh);
      window.addEventListener('load', refresh, { once: true });
      ScrollTrigger.refresh();
      return () => window.removeEventListener('load', refresh);
    },
    { dependencies: [pathname], revertOnUpdate: true }
  );

  return (
    <div ref={root} aria-hidden="true" className="pointer-events-none">
      <div className="chain">
        <div className="chain-gold" />
      </div>
      <img className="companion" src="/images/redesign/jhumka.webp" alt="" width={300} height={486} decoding="async" />
      <div className="loupe" />
      <div className="shutter" />
    </div>
  );
}
