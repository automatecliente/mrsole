'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SolarSunEmblem from '@/components/shared/SolarSunEmblem';

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-32 bg-brand-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,158,11,0.2),_transparent_60%)]" />
      
      {/* Background Solar Emblem */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none">
        <SolarSunEmblem size={600} />
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-5xl text-brand-white mb-6 leading-tight">
            Pronto para renovar seu estilo com{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">presença?</span>
          </h2>
          <p className="text-lg text-brand-white/70 font-body mb-10">
            Escolha suas camisas favoritas e finalize com atendimento personalizado pelo WhatsApp.
          </p>
          <Link
            href="/colecao"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-brand-black font-bold px-10 py-5 rounded-xl text-lg transition-all shadow-[0_0_30px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] group"
          >
            Escolher minhas camisas
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
