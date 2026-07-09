'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Truck, ShieldCheck, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-brand-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/95 to-brand-black/70 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(197,165,114,0.15),_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(27,42,74,0.2),_transparent_60%)]" />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-accent-gold/5 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-accent-navy/10 blur-3xl" />

      <div className="container-custom relative z-20 py-32 md:py-40">
        <div className="max-w-3xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-accent-gold/10 border border-accent-gold/20 rounded-full px-4 py-1.5 mb-8"
          >
            <Sparkles size={14} className="text-accent-gold" />
            <span className="text-xs text-accent-gold font-body tracking-wider uppercase">
              Camisaria Masculina Premium
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-hero-mobile md:text-hero-desktop text-brand-white leading-tight mb-6"
          >
            Camisas masculinas para homens que se vestem com{' '}
            <span className="text-accent-gold">presença.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-brand-white/70 font-body leading-relaxed mb-10 max-w-2xl"
          >
            Modelos elegantes, caimento moderno e atendimento personalizado para você escolher sua próxima camisa com segurança pelo WhatsApp.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mb-14"
          >
            <Link
              href="/colecao"
              className="inline-flex items-center justify-center gap-2 bg-accent-gold hover:bg-accent-gold-light text-brand-black font-bold px-8 py-4 rounded-lg text-base transition-all hover:shadow-xl hover:shadow-accent-gold/20 group"
            >
              Ver Coleção
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5581999999999'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border-2 border-brand-white/20 hover:border-green-500 text-brand-white hover:text-green-400 font-semibold px-8 py-4 rounded-lg text-base transition-all"
            >
              <MessageCircle size={18} />
              Falar com atendente
            </a>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-6 md:gap-8"
          >
            {[
              { icon: MessageCircle, label: 'Atendimento via WhatsApp' },
              { icon: ShieldCheck, label: 'Compra assistida' },
              { icon: Truck, label: 'Envio para sua região' },
              { icon: Sparkles, label: 'Peças selecionadas' },
            ].map((badge) => (
              <div key={badge.label} className="flex items-center gap-2 text-brand-white/50">
                <badge.icon size={16} className="text-accent-gold/70" />
                <span className="text-xs font-body">{badge.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-brand-white/20 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 rounded-full bg-accent-gold/60" />
        </div>
      </motion.div>
    </section>
  );
}
