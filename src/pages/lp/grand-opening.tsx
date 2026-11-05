import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { Helmet } from '@dr.pogodin/react-helmet';
import { Rocket, Coffee, Star, MapPin, Clock, Gift } from 'lucide-react';
import { grand_opening } from 'virtual:content';

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function parseDateMs(raw: string): number | null {
  const t = new Date(raw).getTime();
  return Number.isNaN(t) ? null : t;
}

function getTimeLeft(targetDate: string) {
  if (!targetDate) return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  const end = parseDateMs(targetDate);
  if (end === null) return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  const now = Date.now();
  const diff = end - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, ended: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    ended: false,
  };
}

const SALE_START = '2026-09-24T00:00:00Z';
const SALE_END = '2026-10-05T23:59:59Z';

const offerIcons = [<Coffee size={32} key="coffee" />, <Gift size={32} key="gift" />, <Star size={32} key="star" />];

function CountdownBlock({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex flex-col items-center bg-white/10 rounded-lg px-4 py-3 min-w-[64px]">
      <span className="font-mono text-3xl md:text-4xl font-bold text-white leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-xs uppercase tracking-widest text-white/60 mt-1">{label}</span>
    </div>
  );
}

export default function GrandOpeningPage({ startDate, endDate }: { startDate?: string; endDate?: string }) {
  const [searchParams] = useSearchParams();
  const saleStart = startDate ? `${startDate}T00:00:00Z` : SALE_START;
  const saleEnd = endDate ? `${endDate}T23:59:59Z` : SALE_END;
  const effectiveSaleStart = (import.meta.env.VITE_PARENT_ORIGIN ? searchParams.get('__preview_start') : null) ?? saleStart;
  const effectiveSaleEnd = (import.meta.env.VITE_PARENT_ORIGIN ? searchParams.get('__preview_end') : null) ?? saleEnd;
  const now = Date.now();
  const startMs = effectiveSaleStart ? parseDateMs(effectiveSaleStart) : null;
  const endMs = effectiveSaleEnd ? parseDateMs(effectiveSaleEnd) : null;
  const hasStarted = startMs !== null ? now >= startMs : true;
  const hasEnded = endMs !== null ? now >= endMs : false;
  const saleCountdown = useCountdown(effectiveSaleEnd);
  const startCountdown = useCountdown(effectiveSaleStart);

  // SALE ENDED
  if (hasEnded) {
    return (
      <>
        <Helmet>
          <title>Grand Opening — Mars Cafe</title>
          <meta name="description" content="Our Grand Opening celebration has wrapped up. Come visit Mars Cafe anytime — the retro space-diner vibes are here to stay." />
        </Helmet>
        <section className="min-h-screen flex items-center justify-center" style={{ background: 'hsl(var(--secondary))' }}>
          <div className="text-center px-6 py-20 max-w-lg mx-auto">
            <div className="text-6xl mb-6">🛸</div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {grand_opening.ended.headline}
            </h1>
            <p className="text-white/70 text-lg mb-8">{grand_opening.ended.message}</p>
            <a href="/" className="inline-block px-8 py-4 rounded-full font-bold text-white transition-opacity hover:opacity-90" style={{ background: 'hsl(var(--primary))' }}>
              {grand_opening.ended.ctaLabel}
            </a>
          </div>
        </section>
      </>
    );
  }

  // COMING SOON
  if (!hasStarted) {
    return (
      <>
        <Helmet>
          <title>Grand Opening Coming Soon — Mars Cafe</title>
          <meta name="description" content="Mars Cafe is launching soon. Get ready for retro space-diner vibes, cosmic brews, and opening week specials." />
        </Helmet>
        <section className="min-h-screen flex items-center justify-center" style={{ background: 'hsl(var(--secondary))' }}>
          <div className="text-center px-6 py-20 max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🚀</div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
              {grand_opening.comingSoon.headline}
            </h1>
            <p className="text-white/70 text-xl mb-10">{grand_opening.comingSoon.message}</p>
            <div className="flex justify-center gap-3 mb-10">
              <CountdownBlock label="Days" value={startCountdown.days} />
              <CountdownBlock label="Hours" value={startCountdown.hours} />
              <CountdownBlock label="Min" value={startCountdown.minutes} />
              <CountdownBlock label="Sec" value={startCountdown.seconds} />
            </div>
            <a href="/menu" className="inline-block px-8 py-4 rounded-full font-bold text-white text-lg transition-opacity hover:opacity-90" style={{ background: 'hsl(var(--primary))' }}>
              {grand_opening.comingSoon.ctaLabel}
            </a>
          </div>
        </section>
      </>
    );
  }

  // ACTIVE — Grand Opening
  return (
    <>
      <Helmet>
        <title>Grand Opening — Mars Cafe is Open!</title>
        <meta name="description" content="Mars Cafe is officially open! Celebrate our Grand Opening with BOGO coffees, free pastries for the first 50 guests, and loyalty cards. Opening week ends October 5." />
        <link rel="canonical" href="https://r39fidi9w4.c38.airoapp.ai/lp/grand-opening" />
      </Helmet>

      {/* Countdown Banner */}
      <div className="py-3 text-center text-white text-sm font-medium tracking-wide" style={{ background: 'hsl(var(--primary))' }}>
        🚀 <span>{grand_opening.countdown.bannerText}</span>&nbsp;
        <span className="font-mono font-bold">
          {saleCountdown.days}d {String(saleCountdown.hours).padStart(2, '0')}h {String(saleCountdown.minutes).padStart(2, '0')}m {String(saleCountdown.seconds).padStart(2, '0')}s
        </span>
        &nbsp;<span>{grand_opening.countdown.bannerSuffix}</span>
      </div>

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden" style={{ background: 'hsl(var(--secondary))' }}>
        <img
          src="/airo-assets/images/pages/lp/grand-opening-hero"
          alt="Mars Cafe grand opening — retro space diner"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, hsl(var(--secondary)/0.6), hsl(var(--secondary)/0.9))' }} />
        <div className="relative z-10 text-center px-6 py-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 text-white" style={{ background: 'hsl(var(--primary))' }}>
            <Rocket size={14} />
            <span>{grand_opening.hero.badge}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: 'var(--font-heading)' }}>
            {grand_opening.hero.headline}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-xl mx-auto">
            {grand_opening.hero.subheadline}
          </p>
          <a href="/menu" className="inline-block px-10 py-4 rounded-full font-bold text-white text-lg transition-opacity hover:opacity-90" style={{ background: 'hsl(var(--primary))' }}>
            {grand_opening.hero.ctaLabel}
          </a>
        </div>
      </section>

      {/* Opening Week Offers */}
      <section className="py-20 px-6" style={{ background: 'hsl(var(--background))' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--secondary))' }}>
            {grand_opening.offers.heading}
          </h2>
          <p className="text-muted-foreground text-lg mb-12">{grand_opening.offers.subheading}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {grand_opening.offers.items.map((offer, i) => (
              <div key={offer.id} className="rounded-2xl p-8 text-center border" style={{ borderColor: 'hsl(var(--accent)/0.4)', background: 'hsl(var(--accent)/0.08)' }}>
                <div className="flex justify-center mb-4" style={{ color: 'hsl(var(--primary))' }}>
                  {offerIcons[i]}
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', color: 'hsl(var(--secondary))' }}>
                  {offer.title}
                </h3>
                <p className="text-muted-foreground text-sm">{offer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Info */}
      <section className="py-16 px-6" style={{ background: 'hsl(var(--secondary))' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-10" style={{ fontFamily: 'var(--font-heading)' }}>
            {grand_opening.visit.heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="flex gap-4 items-start">
              <div className="mt-1 shrink-0" style={{ color: 'hsl(var(--accent))' }}>
                <Clock size={24} />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">{grand_opening.visit.hours.label}</h3>
                <p className="text-white/70 text-sm">{grand_opening.visit.hours.weekday}</p>
                <p className="text-white/70 text-sm">{grand_opening.visit.hours.weekend}</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="mt-1 shrink-0" style={{ color: 'hsl(var(--accent))' }}>
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">{grand_opening.visit.location.label}</h3>
                <p className="text-white/70 text-sm">{grand_opening.visit.location.name}</p>
                <p className="text-white/70 text-sm">{grand_opening.visit.location.tagline}</p>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <a href="/contact" className="inline-block px-8 py-4 rounded-full font-bold text-white transition-opacity hover:opacity-90" style={{ background: 'hsl(var(--primary))' }}>
              {grand_opening.visit.ctaLabel}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
