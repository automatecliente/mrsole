'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { CheckCircle } from 'lucide-react';

export default function Toast() {
  const message = useUIStore((s) => s.toastMessage);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 50, x: '-50%' }}
          className="fixed bottom-24 left-1/2 z-[60] bg-brand-black text-brand-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-body max-w-[90vw]"
        >
          <CheckCircle size={18} className="text-accent-gold shrink-0" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
