'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronDown, Menu, X } from 'lucide-react';

const courseItems = [
  { title: 'Salsa', href: '/courses?category=salsa' },
  { title: 'Bachata', href: '/courses?category=bachata' },
  { title: 'Kizomba', href: '/courses?category=kizomba' },
  { title: 'Cha Cha', href: '/courses?category=chacha' },
  { title: 'Merengue', href: '/courses?category=merengue' },
  { title: 'Lady Style', href: '/courses?category=lady-style' },
  { title: 'Coregrafii Personalizate', href: '/courses?category=choreography' },
];

const eventItems = [
  { title: 'Petreceri Sociale', href: '/events/social' },
  { title: 'Aniversarea Scolii', href: '/events/anniversary' },
  { title: 'Show-uri', href: '/events/shows' },
];

const locationItems = [
  { title: 'Suceava', href: '/locations/suceava' },
  { title: 'Botoșani', href: '/locations/botosani' },
  { title: 'Rădăuți', href: '/locations/radauti' },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const toggleMobileSection = (section: string) => {
    setMobileExpanded(mobileExpanded === section ? null : section);
  };

  const MobileMenu = () => (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
      <div className="min-h-screen flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <Link
            href="/"
            className="flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Image
              src="/logo.png"
              alt="Salsa Family"
              width={120}
              height={60}
              className="w-auto h-12"
            />
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6 text-gray-600" />
          </button>
        </div>

        <div className="flex-1 p-4">
          <nav className="space-y-2">
            <Link
              href="/despre-noi"
              className="block px-4 py-3 text-lg text-gray-700 hover:text-purple-600 rounded-lg hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Despre Noi
            </Link>

            <div className="rounded-lg overflow-hidden">
              <button
                onClick={() => toggleMobileSection('cursuri')}
                className="w-full px-4 py-3 text-left text-lg font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg flex justify-between items-center"
              >
                Cursuri
                <ChevronDown
                  className={`w-5 h-5 transform transition-transform ${
                    mobileExpanded === 'cursuri' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileExpanded === 'cursuri' && (
                <div className="pl-4">
                  {courseItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="block px-4 py-2 text-gray-600 hover:text-purple-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-lg overflow-hidden">
              <button
                onClick={() => toggleMobileSection('evenimente')}
                className="w-full px-4 py-3 text-left text-lg font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg flex justify-between items-center"
              >
                Evenimente
                <ChevronDown
                  className={`w-5 h-5 transform transition-transform ${
                    mobileExpanded === 'evenimente' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileExpanded === 'evenimente' && (
                <div className="pl-4">
                  {eventItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="block px-4 py-2 text-gray-600 hover:text-purple-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-lg overflow-hidden">
              <button
                onClick={() => toggleMobileSection('locatii')}
                className="w-full px-4 py-3 text-left text-lg font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-lg flex justify-between items-center"
              >
                Locații
                <ChevronDown
                  className={`w-5 h-5 transform transition-transform ${
                    mobileExpanded === 'locatii' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileExpanded === 'locatii' && (
                <div className="pl-4">
                  {locationItems.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      className="block px-4 py-2 text-gray-600 hover:text-purple-600"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/preturi"
              className="block px-4 py-3 text-lg text-gray-700 hover:text-purple-600 rounded-lg hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Prețuri
            </Link>

            <Link
              href="/blog"
              className="block px-4 py-3 text-lg text-gray-700 hover:text-purple-600 rounded-lg hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t">
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              className="w-full rounded-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-6"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Înscriere
            </Button>
            <Button
              className="w-full rounded-full bg-purple-600 hover:bg-purple-700 text-white py-6"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-4 py-4">
        <nav className="max-w-7xl mx-auto bg-white/95 backdrop-blur-sm rounded-full shadow-lg px-6">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex-shrink-0 relative z-50">
              <Image
                src="/logo.png"
                alt="Salsa Family"
                width={120}
                height={60}
                className="w-auto h-12"
              />
            </Link>

            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/despre-noi"
                className="text-gray-700 hover:text-purple-600"
              >
                Despre Noi
              </Link>

              <div className="group relative">
                <button className="flex items-center gap-1 text-gray-700 group-hover:text-purple-600 p-2">
                  Cursuri
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="invisible group-hover:visible absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <div className="bg-white rounded-xl shadow-lg py-2 w-48">
                    {courseItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="group relative">
                <button className="flex items-center gap-1 text-gray-700 group-hover:text-purple-600 p-2">
                  Evenimente
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="invisible group-hover:visible absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <div className="bg-white rounded-xl shadow-lg py-2 w-48">
                    {eventItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="group relative">
                <button className="flex items-center gap-1 text-gray-700 group-hover:text-purple-600 p-2">
                  Locații
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="invisible group-hover:visible absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <div className="bg-white rounded-xl shadow-lg py-2 w-48">
                    {locationItems.map((item) => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/preturi"
                className="text-gray-700 hover:text-purple-600"
              >
                Prețuri
              </Link>

              <Link
                href="/blog"
                className="text-gray-700 hover:text-purple-600"
              >
                Blog
              </Link>

              <div className="ml-4 flex items-center gap-3">
                <Button className="rounded-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6">
                  Înscriere
                </Button>
                <Button className="rounded-full bg-purple-600 hover:bg-purple-700 text-white px-6">
                  Contact
                </Button>
              </div>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-purple-600 relative z-50"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>

        {isMobileMenuOpen && <MobileMenu />}
      </div>
    </div>
  );
}
