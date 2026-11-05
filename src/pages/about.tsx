import { Helmet } from '@dr.pogodin/react-helmet';
import { ArrowRight, Coffee, Orbit, Sparkles } from 'lucide-react';
import { Link } from "react-router";
import { about } from 'virtual:content';

const siteUrl = 'https://marscafe.example';
const pageUrl = `${siteUrl}/about`;
const title = 'Our Story | Mars Cafe';
const description = 'Discover the retro space-diner story behind Mars Cafe, a playful neighborhood stop for coffee and warm pastries.';
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': `${pageUrl}#webpage`,
  name: title,
  url: pageUrl,
  isPartOf: {
    '@id': `${siteUrl}/#website`
  },
  about: {
    '@id': `${siteUrl}/#organization`
  }
};
export default function AboutPage() {
  return <><Helmet><title>{title}</title><meta name="description" content={description} /><link rel="canonical" href={pageUrl} /><meta property="og:title" content={title} /><meta property="og:description" content={description} /><meta property="og:type" content="website" /><meta property="og:url" content={pageUrl} /><meta property="og:image" content={`${siteUrl}/airo-assets/images/pages/home/hero-mars-coffee`} /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={title} /><meta name="twitter:description" content={description} /><meta name="twitter:image" content={`${siteUrl}/airo-assets/images/pages/home/hero-mars-coffee`} /><script type="application/ld+json">{JSON.stringify(jsonLd)}</script></Helmet><main>
    <section className="relative overflow-hidden bg-secondary text-secondary-foreground"><div className="pointer-events-none absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(hsl(var(--accent)) 1px, transparent 1px)',
          backgroundSize: '18px 18px'
        }} /><div className="container relative mx-auto grid gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center md:py-24"><div><p className="font-bold text-accent">{about.hero.eyebrow}</p><h1 className="mt-4 max-w-3xl font-heading text-5xl leading-[0.95] sm:text-6xl">{about.hero.title}</h1><p className="mt-6 max-w-xl text-lg leading-8 text-secondary-foreground">{about.hero.body}</p><Link to="/#visit" className="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-[5px_5px_0_hsl(var(--accent))] transition-transform hover:-translate-y-1">{about.visit.cta}<ArrowRight size={18} /></Link></div><div className="relative mx-auto w-full max-w-md"><div className="absolute -inset-4 border-2 border-accent" aria-hidden="true" /><div className="relative border-4 border-background bg-primary p-8 shadow-[9px_9px_0_hsl(var(--accent))]"><Orbit size={56} className="text-accent" /><p className="mt-8 font-heading text-3xl leading-tight text-primary-foreground">Coffee for curious humans.</p><p className="mt-4 leading-7 text-primary-foreground">A little Earthly comfort, with a view toward the stars.</p></div></div></div></section>
    <section className="bg-background"><div className="container mx-auto grid gap-10 px-4 py-16 sm:px-6 md:grid-cols-[0.8fr_1.2fr] md:py-24"><div className="flex h-fit items-center gap-3 border-2 border-secondary bg-accent p-5 text-secondary shadow-[5px_5px_0_hsl(var(--secondary))]"><Coffee className="text-primary" size={28} /><span className="font-heading text-xl">Mars Cafe mission</span></div><div><h2 className="font-heading text-4xl leading-tight text-secondary sm:text-5xl">{about.story.title}</h2><div className="mt-7 grid gap-5 text-lg leading-8 text-muted-foreground">{about.story.paragraphs.map(paragraph => <p key={paragraph.id}>{paragraph.text}</p>)}</div></div></div></section>
    <section className="border-y-4 border-secondary bg-muted"><div className="container mx-auto px-4 py-16 sm:px-6 md:py-24"><div className="max-w-2xl"><p className="font-bold text-primary">The Mars Cafe way</p><h2 className="mt-3 font-heading text-4xl leading-tight text-secondary sm:text-5xl">{about.values.title}</h2></div><div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">{about.values.items.map(item => <article key={item.id} className="border-2 border-secondary bg-card p-7 shadow-[6px_6px_0_hsl(var(--secondary))]"><Sparkles className="text-primary" size={28} /><h3 className="mt-6 font-heading text-2xl leading-tight text-secondary">{item.title}</h3><p className="mt-3 leading-7 text-muted-foreground">{item.body}</p></article>)}</div></div></section>
    <section className="border-y-4 border-secondary bg-background"><div className="container mx-auto px-4 py-16 sm:px-6 md:py-24"></div></section>
    <section className="bg-primary text-primary-foreground"><div className="container mx-auto px-4 py-16 text-center sm:px-6 md:py-24"><h2 className="font-heading text-4xl leading-tight sm:text-5xl">{about.visit.title}</h2><p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-primary-foreground">{about.visit.body}</p><Link to="/#visit" className="mt-8 inline-flex items-center gap-2 border-2 border-secondary bg-accent px-6 py-3.5 font-bold text-secondary shadow-[5px_5px_0_hsl(var(--secondary))] transition-transform hover:-translate-y-1">{about.visit.cta}<ArrowRight size={18} /></Link></div></section>
  </main></>;
}
