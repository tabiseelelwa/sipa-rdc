'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Leaf } from 'lucide-react'
import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/actualites', label: 'Actualités' },
  { href: '/communautes', label: 'Communautés' },
  { href: '/culture', label: 'Culture & Patrimoine' },
  { href: '/galerie', label: 'Galerie' },
  { href: '/a-propos', label: 'À Propos' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? 'bg-[#1A0A00]/95 backdrop-blur-md shadow-2xl py-3'
        : 'bg-transparent py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B4513] to-[#C4622D] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Leaf className="w-5 h-5 text-[#F5F0E8]" />
            </div>
            <div>
              <div className="text-[#F5F0E8] font-bold text-lg leading-tight font-display">
                SIPA-RDC
              </div>
              <div className="text-[#D4A853] text-xs tracking-widest uppercase">
                Voix de la liberté
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link px-4 py-2 rounded-full hover:bg-white/10 text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-[#F5F0E8] hover:bg-white/10 transition-colors"
              aria-label="Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-white/10">
            <div className="flex flex-col gap-1 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-[#F5F0E8] px-4 py-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="btn-primary text-center mt-2"
              >
                Nous soutenir
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
