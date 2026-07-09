'use client';

import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { formatCurrencyBRL, cn } from '@/lib/utils';
import { MICROCOPY } from '@/lib/constants';
import { productService } from '@/services/productService';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, MessageCircle, ArrowLeft, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function MeuPedidoPage() {
  const items = useCartStore((s) => s.items);
  const notes = useCartStore((s) => s.notes);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const setNotes = useCartStore((s) => s.setNotes);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getTotalEstimated = useCartStore((s) => s.getTotalEstimated);
  const showToast = useUIStore((s) => s.showToast);

  const [mounted, setMounted] = useState(false);
  const [upsellProducts, setUpsellProducts] = useState<any[]>([]);

  useEffect(() => { 
    setMounted(true);
    productService.getUpsellProducts(items).then(data => setUpsellProducts(data));
  }, [items]);

  if (!mounted) {
    return (
      <div className="pt-32 pb-16 container-custom">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-brand-sand rounded w-48" />
          <div className="h-32 bg-brand-sand rounded" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-16 container-custom">
        <div className="max-w-lg mx-auto text-center py-16">
          <div className="w-20 h-20 rounded-full bg-brand-sand flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-brand-graphite/30" />
          </div>
          <h1 className="font-display text-2xl text-brand-black mb-3">Meu Pedido</h1>
          <p className="text-brand-graphite/60 font-body mb-8">{MICROCOPY.EMPTY_CART}</p>
          <Link
            href="/colecao"
            className="inline-flex items-center gap-2 bg-brand-black hover:bg-brand-charcoal text-brand-white font-semibold px-8 py-4 rounded-lg transition-all"
          >
            Escolher camisas <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-28 pb-16 bg-surface-primary min-h-screen">
      <div className="container-custom">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/colecao" className="text-brand-graphite/50 hover:text-brand-black transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-display text-2xl md:text-3xl text-brand-black">
            Meu <span className="text-accent-gold">Pedido</span>
          </h1>
          <span className="text-sm text-brand-graphite/50 font-body">({items.length} {items.length === 1 ? 'item' : 'itens'})</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-4 bg-surface-elevated rounded-xl p-4 border border-brand-graphite/5"
                >
                  {/* Image */}
                  <div className="w-20 h-24 md:w-24 md:h-28 rounded-lg bg-brand-sand shrink-0 flex items-center justify-center">
                    <ShoppingBag size={20} className="text-brand-graphite/20" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/produto/${item.product.slug}`} className="font-display text-sm md:text-base font-semibold text-brand-black hover:text-accent-gold transition-colors line-clamp-1">
                      {item.product.name}
                    </Link>
                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-brand-graphite/60 font-body mt-1">
                      <span>Tam: <strong className="text-brand-black">{item.selectedSize}</strong></span>
                      <span className="flex items-center gap-1">
                        Cor: <span className="w-3 h-3 rounded-full inline-block border border-brand-graphite/20" style={{ backgroundColor: item.product.colors.find(c => c.name === item.selectedColor)?.hex || '#ccc' }} /> <strong className="text-brand-black">{item.selectedColor}</strong>
                      </span>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-1 border border-brand-graphite/15 rounded-lg overflow-hidden">
                        <button
                          onClick={() => {
                            if (item.quantity <= 1) {
                              removeItem(item.product.id, item.selectedSize, item.selectedColor);
                              showToast(MICROCOPY.PRODUCT_REMOVED);
                            } else {
                              updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1);
                            }
                          }}
                          className="w-8 h-8 flex items-center justify-center hover:bg-brand-sand transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 h-8 flex items-center justify-center text-sm font-semibold font-body">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-brand-sand transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-base font-bold text-brand-black font-body">{formatCurrencyBRL(item.subtotal)}</p>
                        {item.quantity > 1 && (
                          <p className="text-[10px] text-brand-graphite/50 font-body">{formatCurrencyBRL(item.unitPrice)} cada</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => {
                      removeItem(item.product.id, item.selectedSize, item.selectedColor);
                      showToast(MICROCOPY.PRODUCT_REMOVED);
                    }}
                    className="self-start text-brand-graphite/30 hover:text-status-error transition-colors p-1"
                    title="Remover"
                  >
                    <Trash2 size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Notes */}
            <div className="mt-6">
              <label className="text-sm font-semibold text-brand-black font-body mb-2 block">
                Observações do pedido (opcional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ex: Gostaria de saber sobre disponibilidade antes de confirmar..."
                className="w-full p-4 rounded-lg border-2 border-brand-graphite/10 focus:border-accent-gold bg-surface-elevated text-sm font-body outline-none transition-colors resize-none h-24"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-surface-elevated rounded-xl p-6 border border-brand-graphite/10 sticky top-28">
              <h3 className="font-display text-lg font-semibold text-brand-black mb-4">Resumo do Pedido</h3>

              <div className="space-y-3 text-sm font-body mb-6">
                <div className="flex justify-between">
                  <span className="text-brand-graphite/60">Subtotal</span>
                  <span className="font-semibold text-brand-black">{formatCurrencyBRL(getSubtotal())}</span>
                </div>
                <div className="border-t border-brand-graphite/10 pt-3 flex justify-between">
                  <span className="font-semibold text-brand-black">Total estimado</span>
                  <span className="text-xl font-bold text-brand-black">{formatCurrencyBRL(getTotalEstimated())}</span>
                </div>
              </div>

              <p className="text-xs text-brand-graphite/50 font-body mb-6">{MICROCOPY.SHIPPING_NOTE}</p>

              <Link
                href="/checkout-whatsapp"
                className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg text-base transition-all hover:shadow-lg"
              >
                <MessageCircle size={18} />
                Finalizar pelo WhatsApp
              </Link>

              <Link
                href="/colecao"
                className="flex items-center justify-center gap-2 w-full mt-3 border-2 border-brand-graphite/10 hover:border-brand-graphite/30 text-brand-graphite font-semibold py-3 rounded-lg text-sm transition-colors"
              >
                Continuar escolhendo
              </Link>
            </div>
          </div>
        </div>

        {/* Upsell */}
        {upsellProducts.length > 0 && (
          <section className="mt-16">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={18} className="text-accent-gold" />
              <h2 className="font-display text-xl md:text-2xl text-brand-black">
                Complete seu <span className="text-accent-gold">outfit</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {upsellProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
