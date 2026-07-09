'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-32 bg-brand-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(197,165,114,0.12),_transparent_60%)]" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-5xl text-brand-white mb-6 leading-tight">
            Pronto para montar seu próximo{' '}
            <span className="text-accent-gold">outfit?</span>
          </h2>
          <p className="text-lg text-brand-white/60 font-body mb-10">
            Escolha suas camisas favoritas e finalize com atendimento personalizado pelo WhatsApp.
          </p>
          <Link
            href="/colecao"
            className="inline-flex items-center gap-3 bg-accent-gold hover:bg-accent-gold-light text-brand-black font-bold px-10 py-5 rounded-xl text-lg transition-all hover:shadow-2xl hover:shadow-accent-gold/20 group"
          >
            Escolher minhas camisas
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
