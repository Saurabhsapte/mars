import { RouteObject } from "react-router";
import { lazy } from 'react';
import HomePage from './pages/index';
import AboutPage from './pages/about';
import MenuPage from './pages/menu';
import ContactPage from './pages/contact';
import Products from './pages/Products';
import CartPage from './pages/cart';
import CheckoutSuccess from './pages/checkout/success';
import CheckoutCancel from './pages/checkout/cancel';
import BlogListPage from './pages/Blog';
import BlogPostPage from './pages/blog/[slug]';
// Eager import so renderToString doesn't hit a Suspense boundary on 404 routes
// and abort to client rendering. The prod 404 page is tiny; the dev-tools
// variant stays lazy because it pulls in dev-only code we don't want in
// production bundles.
import ProdNotFoundPage from './pages/_404';
import LandingPage from './pages/lp';
const NotFoundPage = ProdNotFoundPage;
export const routes: RouteObject[] = [{
  path: '/',
  element: <HomePage />
}, {
  path: '/about',
  element: <AboutPage />
}, {
  path: '/menu',
  element: <MenuPage />
}, {
  path: '/contact',
  element: <ContactPage />
}, {
  path: '/products',
  element: <Products />
}, {
  path: '/cart',
  element: <CartPage />
}, {
  path: '/checkout/success',
  element: <CheckoutSuccess />
}, {
  path: '/checkout/cancel',
  element: <CheckoutCancel />
}, {
  path: '/blog',
  element: <BlogListPage />
}, {
  path: '/blog/:slug',
  element: <BlogPostPage />
}, {
  path: '/lp/:slug',
  element: <LandingPage />
}, {
  path: '*',
  element: <NotFoundPage />
}];

// Types for type-safe navigation
export type Path = '/' | '/about' | '/menu' | '/contact' | '/blog';
export type Params = Record<string, string | undefined>;
