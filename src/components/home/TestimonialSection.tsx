'use client';

import { motion } from 'framer-motion';
import { testimonials } from '@/data/testimonials';
import { Star, Quote } from 'lucide-react';

export default function TestimonialSection() {
  return (
    <section className="py-16 md:py-24 bg-brand-black">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl text-brand-white mb-3">
            O que dizem nossos <span className="text-accent-gold">clientes</span>
          </h2>
          <p className="text-brand-white/50 font-body max-w-xl mx-auto">
            Homens reais, experiências reais com a MRSOLE Outfit.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative bg-brand-charcoal/50 border border-brand-white/5 rounded-xl p-6 hover:border-accent-gold/20 transition-colors"
            >
              <Quote size={24} className="text-accent-gold/20 mb-4" />
              <p className="text-sm text-brand-white/80 font-body leading-relaxed mb-4">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, s) => (
                  <Star key={s} size={14} fill="#C5A572" className="text-accent-gold" />
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-white font-body">{t.name}</p>
                <p className="text-xs text-brand-white/40 font-body">{t.city}</p>
                {t.productName && (
                  <p className="text-xs text-accent-gold/60 font-body mt-1">{t.productName}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
