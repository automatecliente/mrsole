'use client';

import { MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { motion } from 'framer-motion';

export default function WhatsAppFloatingButton() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Vim pelo site da MRSOLE Outfit e gostaria de saber mais sobre as camisas.')}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-brand-black hover:bg-brand-charcoal text-accent-gold border border-brand-white/10 rounded-full p-4 shadow-2xl transition-colors group"
      aria-label="Falar no WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <MessageCircle size={28} className="text-accent-gold" />
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-brand-white text-brand-black text-xs font-semibold px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
        Falar com atendente
      </span>
    </motion.a>
  );
}
