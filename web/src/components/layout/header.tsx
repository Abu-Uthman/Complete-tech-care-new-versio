'use client';

/**
 * Header Navigation Component
 * Complete Tech Care (CTC) Project
 */

import Link from 'next/link';
import { FocusEvent, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

const serviceCollections = [
  {
    title: 'Field Engineering',
    description: 'Rapid dispatch crews for smart-hands, swap outs, and discovery work across VIC.',
    links: [
      {
        title: 'On-Site Break/Fix Support',
        href: '/services/onsite-support',
        description: 'L1-L2 smart-hands coverage with live updates',
      },
      {
        title: 'Equipment Swap & Installation',
        href: '/services/equipment-swap',
        description: 'Nationwide hardware deployments and refreshes',
      },
      {
        title: 'Site Audits & Documentation',
        href: '/services/site-audits',
        description: 'Network surveys, rack labelling, and asset registers',
      },
    ],
  },
  {
    title: 'Retail & Infrastructure',
    description: 'Compliant, insured contractors for national retailers, cabling, and logistics programs.',
    links: [
      {
        title: 'POS & Retail Equipment',
        href: '/services/pos-retail',
        description: 'Retail-ready workflows for national chains',
      },
      {
        title: 'Network Infrastructure & Cabling',
        href: '/services/infrastructure',
        description: 'Structured cabling, MDF/IDF builds, and rack tidy-ups',
      },
      {
        title: 'IT Parts Logistics & Transport',
        href: '/services/logistics',
        description: 'Secure same-day delivery and inventory control',
      },
    ],
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const servicesMenuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaMenuId = 'services-mega-menu';

  const clearServicesMenuTimer = () => {
    if (servicesMenuCloseTimer.current) {
      clearTimeout(servicesMenuCloseTimer.current);
      servicesMenuCloseTimer.current = null;
    }
  };

  const openServicesMenu = () => {
    clearServicesMenuTimer();
    setServicesMenuOpen(true);
  };

  const delayCloseServicesMenu = () => {
    clearServicesMenuTimer();
    servicesMenuCloseTimer.current = setTimeout(() => {
      setServicesMenuOpen(false);
      servicesMenuCloseTimer.current = null;
    }, 150);
  };

  const immediateCloseServicesMenu = () => {
    clearServicesMenuTimer();
    setServicesMenuOpen(false);
  };

  const handleServicesToggle = () => {
    if (servicesMenuOpen) {
      immediateCloseServicesMenu();
    } else {
      openServicesMenu();
    }
  };

  const handleServicesBlur = (event: FocusEvent<HTMLDivElement>) => {
    const relatedTarget = event.relatedTarget as Node | null;
    if (relatedTarget && event.currentTarget.contains(relatedTarget)) {
      return;
    }
    delayCloseServicesMenu();
  };

  const handleServiceLinkClick = () => {
    immediateCloseServicesMenu();
  };

  useEffect(() => {
    return () => {
      clearServicesMenuTimer();
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="hidden sm:inline-block text-xl font-bold text-primary">
              Complete Tech Care
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-sm font-medium text-text-primary hover:text-secondary transition-colors"
            >
              Home
            </Link>

            {/* Services Mega Menu */}
            <div
              className="relative"
              onMouseEnter={openServicesMenu}
              onMouseLeave={delayCloseServicesMenu}
              onFocusCapture={openServicesMenu}
              onBlurCapture={handleServicesBlur}
            >
              <button
                type="button"
                className="text-sm font-medium text-text-primary hover:text-secondary transition-colors flex items-center gap-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-expanded={servicesMenuOpen}
                aria-controls={megaMenuId}
                onClick={handleServicesToggle}
              >
                <span>Services</span>
                <svg
                  className={`w-4 h-4 transition-transform ${servicesMenuOpen ? 'rotate-180 text-secondary' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {servicesMenuOpen && (
                <div
                  id={megaMenuId}
                  className="absolute left-1/2 top-full z-50 mt-4 w-[720px] -translate-x-1/2"
                  onMouseEnter={openServicesMenu}
                  onMouseLeave={delayCloseServicesMenu}
                >
                  <div className="overflow-hidden rounded-2xl border border-border/70 bg-background shadow-2xl shadow-primary/10">
                    <div className="grid gap-6 p-6 md:grid-cols-[2fr,1fr]">
                      <div className="space-y-5">
                        {serviceCollections.map((collection) => (
                          <div
                            key={collection.title}
                            className="rounded-2xl border border-border/60 bg-background/80 p-5 shadow-sm shadow-primary/5"
                          >
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                              {collection.title}
                            </p>
                            <p className="mt-2 text-sm text-text-secondary">{collection.description}</p>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                              {collection.links.map((link) => (
                                <Link
                                  key={link.title}
                                  href={link.href}
                                  className="group rounded-xl border border-transparent bg-primary/0 px-4 py-3 transition-all duration-150 hover:border-primary/40 hover:bg-primary/5"
                                  onClick={handleServiceLinkClick}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="flex-1">
                                      <div className="font-medium text-text-primary group-hover:text-primary">
                                        {link.title}
                                      </div>
                                      <p className="text-xs text-text-secondary mt-1">{link.description}</p>
                                    </div>
                                    <svg
                                      className="w-4 h-4 text-text-secondary transition-all group-hover:translate-x-0.5 group-hover:text-primary"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 12h14m-6-6l6 6-6 6"
                                      />
                                    </svg>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}

                        <Link
                          href="/services"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary"
                          onClick={handleServiceLinkClick}
                        >
                          View detailed capabilities
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14m-6-6l6 6-6 6" />
                          </svg>
                        </Link>
                      </div>

                      <div className="flex h-full flex-col justify-between rounded-2xl bg-gradient-to-b from-primary to-primary/80 p-6 text-white">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-white/70">Rapid Dispatch Desk</p>
                          <p className="mt-3 text-xl font-semibold leading-snug">Need engineers on-site within 4 hours?</p>
                          <p className="mt-2 text-sm text-white/80">
                            Share your rollout schedule or SOW and our coordinators confirm crews in under 30 minutes.
                          </p>
                        </div>
                        <div className="mt-6 space-y-3">
                          <Link
                            href="/book"
                            className="flex items-center justify-center rounded-xl bg-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/25"
                            onClick={handleServiceLinkClick}
                          >
                            Book a discovery call
                          </Link>
                          <a
                            href="tel:+61432405388"
                            className="flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-white"
                            onClick={immediateCloseServicesMenu}
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              />
                            </svg>
                            0432 405 388
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/partners"
              className="text-sm font-medium text-text-primary hover:text-secondary transition-colors"
            >
              For MSPs
            </Link>
            <Link
              href="/rates"
              className="text-sm font-medium text-text-primary hover:text-secondary transition-colors"
            >
              Rates
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-text-primary hover:text-secondary transition-colors"
            >
              Blog
            </Link>
            <a
              href="tel:+61432405388"
              className="hidden lg:flex items-center gap-2 text-sm font-medium text-primary hover:text-secondary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              0432 405 388
            </a>
            <Link href="/book">
              <Button size="sm" className="h-9">
                Request Info
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-text-primary hover:text-secondary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-sm font-medium text-text-primary hover:text-secondary transition-colors px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>

              {/* Services Submenu for Mobile */}
              <div className="px-2 py-2">
                <Link
                  href="/services"
                  className="text-sm font-medium text-text-primary hover:text-secondary transition-colors flex items-center gap-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Services
                </Link>
                <div className="ml-4 mt-2 space-y-2">
                  <Link
                    href="/services/site-audits"
                    className="block text-xs text-text-secondary hover:text-primary transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Site Audits & Documentation
                  </Link>
                  <Link
                    href="/services/pos-retail"
                    className="block text-xs text-text-secondary hover:text-primary transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    POS & Retail Equipment
                  </Link>
                  <Link
                    href="/services/equipment-swap"
                    className="block text-xs text-text-secondary hover:text-primary transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Equipment Swap & Installation
                  </Link>
                  <Link
                    href="/services/onsite-support"
                    className="block text-xs text-text-secondary hover:text-primary transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    On-Site Break/Fix Support
                  </Link>
                  <Link
                    href="/services/infrastructure"
                    className="block text-xs text-text-secondary hover:text-primary transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Network Infrastructure & Cabling
                  </Link>
                  <Link
                    href="/services/logistics"
                    className="block text-xs text-text-secondary hover:text-primary transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    IT Parts Logistics & Transport
                  </Link>
                </div>
              </div>

              <Link
                href="/partners"
                className="text-sm font-medium text-text-primary hover:text-secondary transition-colors px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                For MSPs
              </Link>
              <Link
                href="/rates"
                className="text-sm font-medium text-text-primary hover:text-secondary transition-colors px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Rates
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-text-primary hover:text-secondary transition-colors px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/book"
                className="pt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button size="sm" className="w-full">
                  Request Info
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
