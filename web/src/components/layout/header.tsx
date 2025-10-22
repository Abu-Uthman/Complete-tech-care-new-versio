'use client';

/**
 * Header Navigation Component
 * CTC Smart-Hands Project
 */

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              CTC Smart-Hands
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
            <Link
              href="/coverage"
              className="text-sm font-medium text-text-primary hover:text-secondary transition-colors"
            >
              Coverage
            </Link>
            <Link
              href="/rates"
              className="text-sm font-medium text-text-primary hover:text-secondary transition-colors"
            >
              Rates
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-text-primary hover:text-secondary transition-colors"
            >
              About
            </Link>
            <Link href="/book">
              <Button size="sm" className="h-9">
                Book Service
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
              <Link
                href="/coverage"
                className="text-sm font-medium text-text-primary hover:text-secondary transition-colors px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Coverage
              </Link>
              <Link
                href="/rates"
                className="text-sm font-medium text-text-primary hover:text-secondary transition-colors px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Rates
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-text-primary hover:text-secondary transition-colors px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/book"
                className="pt-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button size="sm" className="w-full">
                  Book Service
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
