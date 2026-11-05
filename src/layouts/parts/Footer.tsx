import { Link } from "react-router";
import { home } from 'virtual:content';
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return <footer className="mt-auto border-t-4 border-accent bg-secondary text-secondary-foreground">
      <div className="container mx-auto grid gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div className="max-w-md">
          <img src="/airo-assets/images/logo/horizontal/dark" alt="Mars Cafe" width={240} height={120} className="mb-5 block h-auto max-h-12 w-auto max-w-full object-contain" />
          <p className="text-lg font-medium leading-8 text-secondary-foreground">{home.footer.tagline}</p>
        </div>
        <div className="md:text-right">
          <nav className="mb-5 flex flex-wrap gap-x-5 gap-y-2 md:justify-end" aria-label="Footer navigation">
            <Link to="/about" className="text-sm font-bold text-secondary-foreground transition-colors hover:text-accent">Our story</Link><Link to="/menu" className="text-sm font-bold text-secondary-foreground transition-colors hover:text-accent">Menu</Link><Link to="/contact" className="text-sm font-bold text-secondary-foreground transition-colors hover:text-accent">Visit & contact</Link><Link to="/" className="text-sm font-bold text-secondary-foreground transition-colors hover:text-accent">Home</Link>
          </nav>
          <p className="text-sm text-secondary-foreground">© {currentYear} {home.footer.copyright}</p>
        </div>
      </div>
    </footer>;
}
