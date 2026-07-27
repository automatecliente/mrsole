'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Menu, X, MessageCircle } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const itemCount = useCartStore((s) => s.getItemCount());
  const openCartDrawer = useUIStore((s) => s.openCartDrawer);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/colecao', label: 'Coleção' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/guia-de-medidas', label: 'Guia de Medidas' },
  ];

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-brand-black/85 backdrop-blur-xl border-b border-brand-white/10 shadow-2xl py-1'
            : 'bg-gradient-to-b from-brand-black/90 via-brand-black/40 to-transparent py-2.5'
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20 md:h-24">
            {/* Mobile menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-brand-white p-2 hover:text-amber-400 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group py-1">
              <div className="relative h-12 sm:h-14 md:h-16 w-auto flex items-center justify-center">
                <Image
                  src="/images/logos/Logo.png"
                  alt="MR SOLE Outfit"
                  width={280}
                  height={80}
                  priority
                  className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative py-1 text-sm text-brand-white/85 hover:text-amber-400 transition-colors font-display tracking-wider uppercase group/nav"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-400 to-orange-500 scale-x-0 group-hover/nav:scale-x-100 transition-transform duration-300 origin-center" />
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/meu-pedido"
                className="relative p-2 text-brand-white hover:text-amber-400 transition-colors"
                aria-label="Meu Pedido"
              >
                <ShoppingBag size={22} />
                {mounted && itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-amber-500 to-orange-500 text-brand-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Link>
              <Link
                href="/colecao"
                className="hidden md:inline-flex bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-brand-black font-semibold px-5 py-2.5 rounded text-sm transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]"
              >
                Ver Coleção
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-brand-black/85 backdrop-blur-md lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-brand-charcoal z-50 flex flex-col p-8 border-l border-brand-white/10 lg:hidden shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-brand-white/10">
                <Image
                  src="/images/logos/Logo.png"
                  alt="MR SOLE Outfit"
                  width={220}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
                <button onClick={() => setMobileMenuOpen(false)} className="text-brand-white/70 hover:text-amber-400 p-2">
                  <X size={26} />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xl text-brand-white hover:text-amber-400 transition-colors font-display uppercase tracking-wider"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="h-px w-full bg-brand-white/10 my-2" />
                <Link
                  href="/meu-pedido"
                  className="text-lg text-brand-white hover:text-amber-400 transition-colors font-body flex items-center gap-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingBag size={20} /> Meu Pedido
                  {mounted && itemCount > 0 && (
                    <span className="bg-amber-500 text-brand-black text-xs font-bold rounded-full px-2 py-0.5">
                      {itemCount}
                    </span>
                  )}
                </Link>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5581999999999'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-brand-black font-semibold px-6 py-3 rounded text-sm transition-all hover:shadow-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <MessageCircle size={18} /> Falar com atendente
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
