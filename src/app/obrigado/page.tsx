'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { getLastOrder } from '@/services/whatsappMessageService';
import { WhatsAppOrder } from '@/types';
import { formatCurrencyBRL } from '@/lib/utils';
import { WHATSAPP_NUMBER, MICROCOPY } from '@/lib/constants';
import Link from 'next/link';
import { CheckCircle, MessageCircle, ArrowRight, ShoppingBag, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { buildWhatsAppUrl } from '@/lib/utils';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderCode = searchParams.get('codigo') || '';
  const [order, setOrder] = useState<WhatsAppOrder | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const lastOrder = getLastOrder();
    if (lastOrder) setOrder(lastOrder);
  }, []);

  const copyOrderCode = () => {
    navigator.clipboard.writeText(orderCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-28 md:pt-32 pb-16 bg-surface-primary min-h-screen">
      <div className="container-custom max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl text-brand-black mb-3">
            Pedido enviado para o WhatsApp!
          </h1>
          <p className="text-brand-graphite/60 font-body text-lg">
            {MICROCOPY.ORDER_SENT}
          </p>
        </motion.div>

        {/* Order Code */}
        {orderCode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-brand-sand rounded-xl p-6 text-center mb-8"
          >
            <p className="text-xs text-brand-graphite/60 font-body mb-1 uppercase tracking-wider">Código do pedido</p>
            <div className="flex items-center justify-center gap-3">
              <p className="font-display text-xl md:text-2xl font-bold text-brand-black">{orderCode}</p>
              <button
                onClick={copyOrderCode}
                className="text-brand-graphite/40 hover:text-accent-gold transition-colors"
                title="Copiar código"
              >
                {copied ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
              </button>
            </div>
            <p className="text-xs text-brand-graphite/50 font-body mt-2">
              Guarde este código para referência com a atendente.
            </p>
          </motion.div>
        )}

        {/* Order Summary */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-surface-elevated rounded-xl p-6 border border-brand-graphite/10 mb-8"
          >
            <h3 className="font-display text-lg font-semibold text-brand-black mb-4">Resumo do Pedido</h3>

            <div className="space-y-3 mb-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm font-body">
                  <div>
                    <p className="text-brand-black">{item.product.name}</p>
                    <p className="text-xs text-brand-graphite/50">{item.selectedSize} • {item.selectedColor} • Qtd: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">{formatCurrencyBRL(item.subtotal)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-brand-graphite/10 pt-3">
              <div className="flex justify-between text-base font-bold font-body">
                <span>Total estimado</span>
                <span>{formatCurrencyBRL(order.totalEstimated)}</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Next Steps */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8"
        >
          <h3 className="font-display text-base font-semibold text-green-800 mb-3">📱 Próximos passos</h3>
          <ol className="space-y-2 text-sm text-green-700 font-body list-decimal list-inside">
            <li>Aguarde a confirmação da atendente no WhatsApp</li>
            <li>Ela vai verificar a disponibilidade das peças</li>
            <li>Vocês combinam o frete e a forma de pagamento</li>
            <li>Pronto! Seu outfit está a caminho 🎉</li>
          </ol>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-colors"
          >
            <MessageCircle size={18} />
            Abrir WhatsApp novamente
          </a>
          <Link
            href="/colecao"
            className="flex-1 flex items-center justify-center gap-2 bg-brand-black hover:bg-brand-charcoal text-brand-white font-bold py-4 rounded-lg transition-colors"
          >
            <ShoppingBag size={18} />
            Continuar explorando
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

export default function ObrigadoPage() {
  return (
    <Suspense fallback={
      <div className="pt-32 pb-16 container-custom text-center">
        <div className="animate-pulse space-y-4 max-w-md mx-auto">
          <div className="w-20 h-20 rounded-full bg-brand-sand mx-auto" />
          <div className="h-8 bg-brand-sand rounded" />
          <div className="h-4 bg-brand-sand rounded w-3/4 mx-auto" />
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
}
