import { Helmet } from '@dr.pogodin/react-helmet';
import { ArrowRight, Coffee, Orbit, Sparkles } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { home, newsletter } from 'virtual:content';

const siteUrl = 'https://marscafe.example';
const pageTitle = 'Mars Cafe | Retro Coffee for Curious Humans';
const description = 'Mars Cafe is a retro neighborhood coffee stop for carefully made drinks, warm pastries, and a little escape from Earth.';
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': `${siteUrl}/#website`, name: 'Mars Cafe', url: `${siteUrl}/` },
    { '@type': 'Organization', '@id': `${siteUrl}/#organization`, name: 'Mars Cafe', url: `${siteUrl}/` },
    { '@type': 'WebPage', '@id': `${siteUrl}/#webpage`, name: pageTitle, url: `${siteUrl}/`, isPartOf: { '@id': `${siteUrl}/#website` }, about: { '@id': `${siteUrl}/#organization` }, datePublished: '2026-08-06', dateModified: '2026-08-06' },
  ],
};

export default function HomePage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get('newsletter-email') ?? '').trim();
    setNewsletterStatus('submitting');
    try {
      const response = await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      if (!response.ok) throw new Error('Unable to join newsletter');
      form.reset();
      setNewsletterStatus('success');
    } catch {
      setNewsletterStatus('error');
    }
  }

  async function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const inquiryType = String(data.get('inquiry-type') ?? '').trim();
    const guestCount = String(data.get('guest-count') ?? '').trim();
    const eventDate = String(data.get('event-date') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    setFormStatus('submitting');
    try {
      const response = await fetch('/api/contact/catering-inquiries', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversation: { messages_attributes: [{ body: message || 'New contact form submission' }], data: { __gd_contact_form_title: home.contact.formTitle, 'Inquiry type': inquiryType, 'Estimated guest count': guestCount, 'Preferred event date': eventDate } }, user: { email, name } }),
      });
      if (!response.ok) throw new Error('Unable to send message');
      form.reset();
      setFormStatus('success');
    } catch {
      setFormStatus('error');
    }
  }

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title><meta name="description" content={description} /><link rel="canonical" href={`${siteUrl}/`} />
        <meta property="og:title" content={pageTitle} /><meta property="og:description" content={description} /><meta property="og:type" content="website" /><meta property="og:url" content={`${siteUrl}/`} /><meta property="og:image" content={`${siteUrl}/airo-assets/images/pages/home/hero-mars-coffee`} />
        <meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={pageTitle} /><meta name="twitter:description" content={description} /><meta name="twitter:image" content={`${siteUrl}/airo-assets/images/pages/home/hero-mars-coffee`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <main>
        <section className="relative overflow-hidden bg-secondary text-secondary-foreground">
          <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(hsl(var(--accent)) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
          <div className="container relative mx-auto grid gap-10 px-4 py-14 sm:px-6 md:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 border-2 border-accent bg-background px-4 py-2 text-sm font-bold text-secondary shadow-[4px_4px_0_hsl(var(--accent))]">
                <Orbit size={17} className="text-primary" /><span>{home.hero.eyebrow}</span>
              </div>
              <h1 className="mt-7 max-w-2xl font-heading text-5xl leading-[0.95] text-secondary-foreground sm:text-6xl lg:text-7xl">{home.hero.title}</h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-secondary-foreground">{home.hero.body}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#menu" className="inline-flex items-center justify-center gap-2 bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-[5px_5px_0_hsl(var(--accent))] transition-transform hover:-translate-y-1">{home.hero.primaryCta}<ArrowRight size={18} /></a>
                <a href="#visit" className="inline-flex items-center justify-center border-2 border-accent bg-background px-6 py-3.5 font-bold text-secondary transition-colors hover:bg-accent">{home.hero.secondaryCta}</a>
              </div>
              <div className="mt-10 flex flex-wrap gap-5 text-sm font-bold text-secondary-foreground"><span className="inline-flex items-center gap-2"><Coffee size={18} className="text-accent" /> Carefully made coffee</span><span className="inline-flex items-center gap-2"><Sparkles size={18} className="text-accent" /> Fresh daily pastries</span></div>
            </div>
            <div className="relative mx-auto w-full max-w-2xl">
              <div className="absolute -left-3 -top-3 h-full w-full border-2 border-accent" aria-hidden="true" />
              <div className="relative overflow-hidden border-4 border-background bg-card p-3 shadow-[10px_10px_0_hsl(var(--primary))]">
                <img src="/airo-assets/images/pages/home/hero-mars-coffee" alt="A warm coffee moment at Mars Cafe" width={1600} height={1000} loading="eager" fetchPriority="high" className="aspect-[4/3] w-full object-cover" />
                <div className="pointer-events-none absolute inset-x-3 bottom-3 bg-primary p-4 text-center"><p className="font-heading text-xl text-primary-foreground sm:text-2xl">Earth can wait.</p></div>
              </div>
            </div>
          </div>
        </section>

        <section id="story" className="border-y-4 border-secondary bg-accent">
          <div className="container mx-auto grid gap-8 px-4 py-14 sm:px-6 md:grid-cols-[0.7fr_1.3fr] md:items-center md:py-20">
            <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-secondary bg-background text-primary shadow-[6px_6px_0_hsl(var(--secondary))]"><Orbit size={54} strokeWidth={1.5} /></div>
            <div><p className="font-bold text-secondary">{home.intro.eyebrow}</p><h2 className="mt-3 font-heading text-4xl leading-tight text-secondary sm:text-5xl">{home.intro.title}</h2><p className="mt-5 max-w-2xl text-lg leading-8 text-secondary">{home.intro.body}</p></div>
          </div>
        </section>

        <section id="menu" className="bg-background">
          <div className="container mx-auto px-4 py-16 sm:px-6 md:py-24">
            <div className="max-w-2xl"><p className="font-bold text-primary">{home.menu.eyebrow}</p><h2 className="mt-3 font-heading text-4xl leading-tight text-secondary sm:text-5xl">{home.menu.title}</h2></div>
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {home.menu.items.map((item, index) => (
                <article key={item.name} className="overflow-hidden border-2 border-secondary bg-card shadow-[7px_7px_0_hsl(var(--secondary))] transition-transform hover:-translate-y-1">
                  <img src={index === 2 ? '/airo-assets/images/menu/orbit-pastry' : '/airo-assets/images/menu/mars-latte'} alt={item.name} width={800} height={800} loading="lazy" fetchPriority="auto" className="aspect-square w-full border-b-2 border-secondary object-cover" />
                  <div className="p-6"><div className="flex items-start justify-between gap-4"><h3 className="font-heading text-2xl leading-tight text-secondary">{item.name}</h3><span className="bg-primary px-3 py-1 text-sm font-bold text-primary-foreground">{item.price}</span></div><p className="mt-3 leading-7 text-muted-foreground">{item.description}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="bg-muted">
          <div className="container mx-auto grid gap-10 px-4 py-16 sm:px-6 md:grid-cols-[0.85fr_1.15fr] md:py-24">
            <div><p className="font-bold text-primary">{home.contact.eyebrow}</p><h2 className="mt-3 font-heading text-4xl leading-tight text-secondary sm:text-5xl">{home.contact.title}</h2><p className="mt-5 max-w-md text-lg leading-8 text-muted-foreground">{home.contact.body}</p><div className="mt-8 border-2 border-secondary bg-accent p-6 shadow-[6px_6px_0_hsl(var(--secondary))]"><Sparkles size={28} className="text-primary" /><p className="mt-4 font-heading text-2xl text-secondary">Catering, coffee, or a cosmic question.</p><p className="mt-2 leading-7 text-secondary">We’ll get back to you with the details you need.</p></div></div>
            <form onSubmit={handleContactSubmit} className="border-2 border-secondary bg-card p-6 shadow-[8px_8px_0_hsl(var(--primary))] sm:p-8"><h3 className="font-heading text-2xl text-secondary">{home.contact.formTitle}</h3><div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-bold text-secondary">Your name<input name="name" required autoComplete="name" className="border-2 border-secondary bg-background px-4 py-3 text-base font-normal text-foreground outline-none ring-primary focus:ring-2" /></label><label className="grid gap-2 text-sm font-bold text-secondary">Email address<input name="email" type="email" required autoComplete="email" className="border-2 border-secondary bg-background px-4 py-3 text-base font-normal text-foreground outline-none ring-primary focus:ring-2" /></label><label className="grid gap-2 text-sm font-bold text-secondary">What can we help with?<select name="inquiry-type" required defaultValue="" className="border-2 border-secondary bg-background px-4 py-3 text-base font-normal text-foreground outline-none ring-primary focus:ring-2"><option value="" disabled>Select an option</option><option>General question</option><option>Catering inquiry</option><option>Private event</option><option>Other</option></select></label><label className="grid gap-2 text-sm font-bold text-secondary">Estimated guest count<input name="guest-count" placeholder="Optional" className="border-2 border-secondary bg-background px-4 py-3 text-base font-normal text-foreground outline-none ring-primary focus:ring-2" /></label><label className="grid gap-2 text-sm font-bold text-secondary sm:col-span-2">Preferred event date<input name="event-date" type="date" className="border-2 border-secondary bg-background px-4 py-3 text-base font-normal text-foreground outline-none ring-primary focus:ring-2" /></label><label className="grid gap-2 text-sm font-bold text-secondary sm:col-span-2">Tell us more<textarea name="message" rows={5} placeholder="Share the details of your question or gathering." className="resize-y border-2 border-secondary bg-background px-4 py-3 text-base font-normal text-foreground outline-none ring-primary focus:ring-2" /></label></div><input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true" /><button type="submit" disabled={formStatus === 'submitting'} className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-[4px_4px_0_hsl(var(--secondary))] transition-transform hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70">{formStatus === 'submitting' ? 'Sending...' : 'Send inquiry'} <ArrowRight size={18} /></button>{formStatus === 'success' && <p className="mt-4 text-sm font-bold text-primary" role="status">Thanks — your message is on its way to Mars Cafe.</p>}{formStatus === 'error' && <p className="mt-4 text-sm font-bold text-destructive" role="alert">Something went wrong. Please try again.</p>}</form>
          </div>
        </section>

        <section className="border-y-4 border-secondary bg-background">
          <div className="container mx-auto grid gap-8 px-4 py-16 sm:px-6 md:grid-cols-[1fr_1.1fr] md:items-center md:py-20"><div><p className="font-bold text-primary">{newsletter.eyebrow}</p><h2 className="mt-3 font-heading text-4xl leading-tight text-secondary sm:text-5xl">{newsletter.title}</h2><p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{newsletter.body}</p></div><form onSubmit={handleNewsletterSubmit} className="border-2 border-secondary bg-accent p-6 shadow-[7px_7px_0_hsl(var(--secondary))] sm:p-8"><label className="grid gap-2 text-sm font-bold text-secondary"><span>{newsletter.emailLabel}</span><input name="newsletter-email" type="email" required autoComplete="email" placeholder={newsletter.emailPlaceholder} className="border-2 border-secondary bg-background px-4 py-3 text-base font-normal text-foreground outline-none ring-primary focus:ring-2" /></label><button type="submit" disabled={newsletterStatus === 'submitting'} className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-[4px_4px_0_hsl(var(--secondary))] transition-transform hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70">{newsletterStatus === 'submitting' ? 'Joining...' : newsletter.submitLabel} <ArrowRight size={18} /></button>{newsletterStatus === 'success' && <p className="mt-4 text-sm font-bold text-secondary" role="status">{newsletter.successMessage}</p>}{newsletterStatus === 'error' && <p className="mt-4 text-sm font-bold text-destructive" role="alert">{newsletter.errorMessage}</p>}</form></div>
        </section>

        <section id="visit" className="bg-secondary text-secondary-foreground"><div className="container mx-auto grid gap-8 px-4 py-16 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-end md:py-24"><div><p className="font-bold text-accent">{home.visit.eyebrow}</p><h2 className="mt-3 max-w-xl font-heading text-4xl leading-tight sm:text-5xl">{home.visit.title}</h2><p className="mt-5 max-w-xl text-lg leading-8 text-secondary-foreground">{home.visit.body}</p></div><div className="border-2 border-accent bg-background p-7 text-card-foreground shadow-[7px_7px_0_hsl(var(--primary))]"><Coffee size={32} className="text-primary" /><p className="mt-4 text-lg font-bold text-secondary">{home.visit.note}</p><p className="mt-2 leading-7 text-muted-foreground">We’ll add the exact address, hours, and contact details as soon as you share them.</p></div></div></section>
      </main>
    </>
  );
}
