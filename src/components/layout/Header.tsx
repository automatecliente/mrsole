'use client';

import Link from 'next/link';
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
            ? 'bg-brand-black/70 backdrop-blur-xl border-b border-brand-white/10 shadow-xl py-0'
            : 'bg-gradient-to-b from-brand-black/80 to-transparent py-2'
        )}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Mobile menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-brand-white p-2"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span className="font-display text-xl md:text-2xl font-bold text-brand-white tracking-wider">
                MR<span className="text-accent-gold">SOLE</span>
              </span>
              <span className="hidden sm:inline text-[10px] uppercase tracking-[0.3em] text-brand-white/60 font-body border-l border-brand-white/20 pl-2 ml-1">
                Outfit
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-brand-white/80 hover:text-accent-gold transition-colors font-body tracking-wide"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/meu-pedido"
                className="relative p-2 text-brand-white hover:text-accent-gold transition-colors"
                aria-label="Meu Pedido"
              >
                <ShoppingBag size={22} />
                {mounted && itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent-gold text-brand-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount > 9 ? '9+' : itemCount}
                  </span>
                )}
              </Link>
              <Link
                href="/colecao"
                className="hidden md:inline-flex bg-accent-gold hover:bg-accent-gold-light text-brand-black font-semibold px-5 py-2.5 rounded text-sm transition-all hover:shadow-lg"
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
              className="fixed inset-0 z-40 bg-brand-black/80 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-brand-charcoal z-50 flex flex-col p-8 border-l border-brand-white/10 lg:hidden shadow-2xl"
            >
              <div className="flex justify-end mb-8">
                <button onClick={() => setMobileMenuOpen(false)} className="text-brand-white/70 hover:text-accent-gold p-2">
                  <X size={28} />
                </button>
              </div>
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-2xl text-brand-white hover:text-accent-gold transition-colors font-display"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="h-px w-full bg-brand-white/10 my-4" />
                <Link
                  href="/meu-pedido"
                  className="text-xl text-brand-white hover:text-accent-gold transition-colors font-body flex items-center gap-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShoppingBag size={20} /> Meu Pedido
                  {mounted && itemCount > 0 && (
                    <span className="bg-accent-gold text-brand-black text-xs font-bold rounded-full px-2 py-0.5">
                      {itemCount}
                    </span>
                  )}
                </Link>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5581999999999'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-2 bg-brand-white text-brand-black hover:bg-accent-gold hover:text-brand-black px-6 py-3 rounded-sm font-semibold transition-colors"
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
