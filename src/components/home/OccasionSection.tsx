'use client';

import { motion } from 'framer-motion';
import { occasions } from '@/data/categories';
import { Briefcase, Moon, PartyPopper, Sun, Gift, LayoutGrid, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Briefcase, Moon, PartyPopper, Sun, Gift, LayoutGrid,
};

export default function OccasionSection() {
  return (
    <section className="py-16 md:py-24 bg-surface-primary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl text-brand-black mb-3">
            Escolha por <span className="text-accent-gold">ocasião</span>
          </h2>
          <p className="text-brand-graphite/70 font-body max-w-xl mx-auto">
            Encontre a camisa certa para cada momento da sua vida.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {occasions.map((occ, i) => {
            const Icon = iconMap[occ.icon] || Briefcase;
            const href = occ.filterCategory
              ? `/colecao?categoria=${occ.filterCategory}`
              : `/colecao`;

            return (
              <motion.div
                key={occ.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={href}
                  className="group block bg-brand-black rounded-xl p-6 md:p-8 hover:bg-brand-charcoal transition-colors"
                >
                  <Icon size={28} className="text-accent-gold mb-4" />
                  <h3 className="font-display text-base md:text-lg text-brand-white font-semibold mb-2 group-hover:text-accent-gold transition-colors">
                    {occ.title}
                  </h3>
                  <p className="text-xs text-brand-white/50 font-body mb-3">{occ.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-accent-gold font-body opacity-0 group-hover:opacity-100 transition-opacity">
                    Explorar <ArrowRight size={12} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
