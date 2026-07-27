'use client';

import { motion } from 'framer-motion';
import { Shirt, UserCheck, Ruler, Layers, MessageCircle, HeartHandshake, Package } from 'lucide-react';
import SolarSunEmblem from '@/components/shared/SolarSunEmblem';

const differentials = [
  { icon: Shirt, title: 'Curadoria masculina', description: 'Cada peça é selecionada para o homem moderno.' },
  { icon: UserCheck, title: 'Atendimento personalizado', description: 'Uma atendente real para te ajudar na escolha.' },
  { icon: Ruler, title: 'Caimento moderno', description: 'Cortes slim e regular que vestem bem de verdade.' },
  { icon: Layers, title: 'Peças versáteis', description: 'Do escritório ao lazer com a mesma camisa.' },
  { icon: MessageCircle, title: 'Compra pelo WhatsApp', description: 'Simples, rápido e sem complicação.' },
  { icon: HeartHandshake, title: 'Ajuda com tamanho', description: 'Não sabe seu tamanho? A gente te ajuda.' },
  { icon: Package, title: 'Combos inteligentes', description: 'Monte seu guarda-roupa com economia.' },
];

export default function DifferentialsSection() {
  return (
    <section className="py-16 md:py-24 bg-brand-sand/50 relative overflow-hidden">
      {/* Background Solar Emblem Watermark */}
      <div className="absolute right-[-100px] top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none">
        <SolarSunEmblem size={500} />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl md:text-4xl text-brand-black mb-3">
            Por que escolher a <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">MRSOLE</span>
          </h2>
          <p className="text-brand-graphite/70 font-body max-w-xl mx-auto">
            Mais do que camisas. Uma experiência de compra pensada para você.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {differentials.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-surface-elevated rounded-xl p-5 text-center hover:shadow-xl transition-all border border-brand-black/5 group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors mb-4">
                <d.icon size={24} className="text-amber-500" />
              </div>
              <h3 className="font-display text-sm md:text-base font-semibold text-brand-black mb-1">
                {d.title}
              </h3>
              <p className="text-xs text-brand-graphite/60 font-body">{d.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
