'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Truck, ShieldCheck, Sparkles, Star } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-brand-black overflow-hidden pt-20">
      {/* Background Solar Glows */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-brand-black/90 to-brand-black/60 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(245,158,11,0.22),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(249,115,22,0.18),_transparent_60%)]" />
      </div>

      {/* Decorative Orbs */}
      <div className="absolute top-24 right-16 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-orange-600/10 blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-20 py-16 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Content */}
          <div className="lg:col-span-7">
            {/* Solar Tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 backdrop-blur-md rounded-full px-4 py-1.5 mb-8"
            >
              <Sparkles size={15} className="text-amber-400" />
              <span className="text-xs text-amber-300 font-display tracking-widest uppercase font-semibold">
                Camisaria Masculina Premium
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-brand-white leading-[1.1] mb-6 tracking-tight"
            >
              Camisas masculinas para homens que se vestem com{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
                presença e sofisticação.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-brand-white/75 font-body leading-relaxed mb-10 max-w-xl"
            >
              Modelos elegantes, tecido de algodão nobre e atendimento assistido pelo WhatsApp para você encontrar a camisa ideal.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Link
                href="/colecao"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-brand-black font-bold px-8 py-4 rounded-lg text-base transition-all shadow-[0_0_25px_rgba(245,158,11,0.35)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] group"
              >
                Ver Coleção
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5581999999999'}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-brand-white/20 hover:border-amber-400/80 bg-brand-white/5 hover:bg-amber-500/10 text-brand-white hover:text-amber-300 font-semibold px-8 py-4 rounded-lg text-base transition-all backdrop-blur-sm"
              >
                <MessageCircle size={18} className="text-amber-400" />
                Falar com atendente
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-brand-white/10"
            >
              {[
                { icon: MessageCircle, label: 'Atendimento via WhatsApp' },
                { icon: ShieldCheck, label: 'Compra assistida' },
                { icon: Truck, label: 'Envio para todo o Brasil' },
                { icon: Sparkles, label: 'Algodão & Linho nobres' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-brand-white/60">
                  <badge.icon size={16} className="text-amber-400 shrink-0" />
                  <span className="text-xs font-body leading-tight">{badge.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Featured Hero Card / Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Solar Border Glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 opacity-35 blur-lg group-hover:opacity-60 transition duration-500" />
              
              <div className="relative rounded-2xl overflow-hidden bg-brand-charcoal border border-brand-white/15 shadow-2xl">
                <div className="aspect-[4/5] relative">
                  <Image
                    src="/images/products/WhatsApp Image 2026-07-10 at 18.08.56.jpeg"
                    alt="Camisa Social Slim Oxford Branca MRSOLE"
                    fill
                    className="object-cover object-top hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80" />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-4 right-4 bg-brand-black/80 backdrop-blur-md border border-amber-500/30 rounded-full px-3 py-1 flex items-center gap-1.5">
                    <Star size={12} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-bold text-brand-white">Edição Solar Premium</span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-brand-black/80 backdrop-blur-md border border-brand-white/10">
                    <p className="text-xs text-amber-400 font-display uppercase tracking-widest mb-1">Destaque da Coleção</p>
                    <h3 className="text-lg font-bold text-brand-white mb-1">Camisa Slim Oxford</h3>
                    <p className="text-xs text-brand-white/70">Caimento ajustado e toque suave em algodão egípcio.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
