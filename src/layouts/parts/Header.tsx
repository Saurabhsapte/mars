import { Link } from "react-router";
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/contexts/use-cart';
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const navItems = [{
    href: '/about',
    label: 'Our story'
  }, {
    href: '/menu',
    label: 'Menu'
  }, {
    href: '/blog',
    label: 'Blog'
  }, {
    href: '/contact',
    label: 'Visit & contact'
  }];
  return <header className="sticky top-0 z-50 border-b-4 border-secondary bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex min-h-20 items-center justify-between gap-4 py-3">
          <Link to="/" className="min-w-0 shrink" aria-label="Mars Cafe home">
            <img src="/airo-assets/images/logo/horizontal/light" alt="Mars Cafe" width={240} height={120} className="block h-auto max-h-10 w-auto max-w-full object-contain md:max-h-12" />
          </Link>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            {navItems.map(item => <Link key={item.href} to={item.href} className="text-sm font-bold text-secondary transition-colors hover:text-primary">{item.label}</Link>)}
            <Link to="/cart" className="relative p-2 text-secondary hover:text-primary" aria-label="View shopping cart"><ShoppingBag size={22} />{cartCount > 0 && <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{cartCount}</span>}</Link>
            <Link to="/contact" className="bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-[3px_3px_0_hsl(var(--secondary))] transition-transform hover:-translate-y-0.5">Plan a visit</Link>
          </nav>
          <button type="button" onClick={() => setIsMobileMenuOpen(open => !open)} className="border-2 border-secondary bg-accent p-2 text-secondary transition-colors hover:bg-primary hover:text-primary-foreground md:hidden" aria-label="Toggle menu" aria-expanded={isMobileMenuOpen}>{isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
        {isMobileMenuOpen && <nav className="grid gap-2 border-t-2 border-secondary py-4 md:hidden" aria-label="Mobile navigation">{navItems.map(item => <Link key={item.href} to={item.href} onClick={() => setIsMobileMenuOpen(false)} className="border border-transparent px-3 py-2 text-sm font-bold text-secondary hover:border-secondary hover:bg-accent">{item.label}</Link>)}<Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="mt-2 bg-primary px-4 py-3 text-center text-sm font-bold text-primary-foreground">Plan a visit</Link></nav>}
      </div>
    </header>;
}
