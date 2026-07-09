'use client';

import { motion } from 'framer-motion';
import { Search, ShoppingBag, MessageCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Escolha suas camisas',
    description: 'Navegue pela coleção, use filtros e encontre o modelo perfeito para cada ocasião.',
  },
  {
    number: '02',
    icon: ShoppingBag,
    title: 'Monte seu pedido',
    description: 'Selecione tamanho, cor e quantidade. Adicione quantas camisas quiser ao seu pedido.',
  },
  {
    number: '03',
    icon: MessageCircle,
    title: 'Finalize pelo WhatsApp',
    description: 'Nossa atendente confirma disponibilidade, frete e pagamento com total segurança.',
  },
];

export default function HowItWorks() {
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
            Como <span className="text-accent-gold">funciona</span>
          </h2>
          <p className="text-brand-graphite/70 font-body max-w-xl mx-auto">
            Você escolhe os produtos no site, envia o pedido pelo WhatsApp e nossa atendente confirma disponibilidade, pagamento e entrega.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center group"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-[1px] bg-gradient-to-r from-accent-gold/40 to-accent-gold/10" />
              )}

              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-brand-sand group-hover:bg-accent-gold/10 transition-colors mb-6">
                <step.icon size={32} className="text-accent-gold" />
                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-brand-black text-brand-white text-xs font-bold flex items-center justify-center font-body">
                  {step.number}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold text-brand-black mb-2">{step.title}</h3>
              <p className="text-sm text-brand-graphite/70 font-body leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
