'use client';

import { categories } from '@/data/categories';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CategoryGrid() {
  return (
    <section className="py-16 md:py-24 bg-surface-primary">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl text-brand-black mb-3">
            Explore por <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">categoria</span>
          </h2>
          <p className="text-brand-graphite/70 font-body max-w-xl mx-auto">
            Encontre a camisa ideal para cada ocasião e estilo.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.slice(0, 8).map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/colecao?categoria=${cat.slug}`}
                className="group relative block aspect-category rounded-xl overflow-hidden bg-brand-charcoal shadow-md border border-brand-white/10"
              >
                {/* Real Category Image */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-brand-black/30 to-transparent z-10 group-hover:from-brand-black transition-all" />

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5 z-20">
                  <h3 className="font-display text-base md:text-lg text-brand-white font-bold mb-1 group-hover:text-amber-400 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-brand-white/70 font-body hidden md:block line-clamp-1">{cat.description}</p>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-display tracking-wider uppercase font-semibold mt-2 opacity-90 group-hover:opacity-100 transition-opacity">
                    Ver produtos <ArrowRight size={12} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
