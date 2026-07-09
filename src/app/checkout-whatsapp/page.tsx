'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useCartStore } from '@/store/cartStore';
import { processWhatsAppCheckout } from '@/services/whatsappMessageService';
import { saveOrder, saveLead, saveAbandonedCart } from '@/services/orderService';
import { trackingService } from '@/services/trackingService';
import { formatCurrencyBRL, getStoredUTMs } from '@/lib/utils';
import { BRAZILIAN_STATES, DELIVERY_OPTIONS, MICROCOPY } from '@/lib/constants';
import { ArrowLeft, MessageCircle, ShoppingBag, ChevronDown, User, Phone, MapPin, Truck, FileText } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  phone: string;
  city: string;
  state: string;
  neighborhood: string;
  deliveryPreference: 'home' | 'pickup' | 'discuss';
  notes: string;
}

export default function CheckoutWhatsAppPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const notes = useCartStore((s) => s.notes);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const getTotalEstimated = useCartStore((s) => s.getTotalEstimated);
  const discount = useCartStore((s) => s.discount);
  const clearCart = useCartStore((s) => s.clearCart);
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      deliveryPreference: 'home',
      notes: '',
    },
  });

  const [abandonedSaved, setAbandonedSaved] = useState(false);

  const handlePhoneBlur = () => {
    if (abandonedSaved) return;
    const { name, phone } = getValues();
    if (phone && phone.length >= 10 && name) {
      const utms = getStoredUTMs();
      saveAbandonedCart(name, phone, items, getSubtotal(), utms.utm_source, utms.utm_campaign);
      setAbandonedSaved(true);
    }
  };

  if (!mounted) {
    return (
      <div className="pt-32 pb-16 container-custom">
        <div className="animate-pulse space-y-4 max-w-2xl mx-auto">
          <div className="h-8 bg-brand-sand rounded w-64" />
          <div className="h-64 bg-brand-sand rounded" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-16 container-custom text-center">
        <div className="max-w-md mx-auto py-16">
          <ShoppingBag size={48} className="text-brand-graphite/20 mx-auto mb-4" />
          <h1 className="font-display text-2xl text-brand-black mb-3">Seu pedido está vazio</h1>
          <p className="text-brand-graphite/60 font-body mb-6">{MICROCOPY.EMPTY_CART}</p>
          <Link href="/colecao" className="bg-brand-black text-brand-white px-6 py-3 rounded-lg font-semibold inline-block">
            Escolher camisas
          </Link>
        </div>
      </div>
    );
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const subtotal = getSubtotal();
      const totalEstimated = getTotalEstimated();

      const { orderCode, whatsappUrl, order } = processWhatsAppCheckout(
        {
          name: data.name,
          phone: data.phone,
          city: data.city,
          state: data.state,
          neighborhood: data.neighborhood,
          deliveryPreference: data.deliveryPreference,
          notes: data.notes || notes,
        },
        items,
        subtotal,
        discount,
        totalEstimated,
        data.notes || notes
      );

      // Save to Supabase/localStorage
      await saveOrder(order);

      // Save lead
      const utms = getStoredUTMs();
      await saveLead(data.name, data.phone, utms.utm_source, utms.utm_campaign, orderCode);

      // Track events
      trackingService.trackInitiateCheckout({
        total_estimated: totalEstimated,
        order_code: orderCode,
        currency: 'BRL',
      });
      trackingService.trackWhatsAppClick(orderCode);

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');

      // Clear cart and redirect
      clearCart();
      router.push(`/obrigado?codigo=${orderCode}`);
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 md:pt-28 pb-16 bg-surface-primary min-h-screen">
      <div className="container-custom max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/meu-pedido" className="text-brand-graphite/50 hover:text-brand-black transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-display text-2xl md:text-3xl text-brand-black">
            Finalizar pelo <span className="text-green-600">WhatsApp</span>
          </h1>
        </div>

        <p className="text-brand-graphite/60 font-body mb-8">{MICROCOPY.BEFORE_WHATSAPP}</p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-3 space-y-6">
            {/* Name */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-brand-black font-body mb-2">
                <User size={14} className="text-accent-gold" /> Nome completo *
              </label>
              <input
                {...register('name', { required: 'Nome é obrigatório', minLength: { value: 3, message: 'Mínimo 3 caracteres' } })}
                className="w-full p-3.5 rounded-lg border-2 border-brand-graphite/10 focus:border-accent-gold bg-surface-elevated text-sm font-body outline-none transition-colors"
                placeholder="Seu nome completo"
              />
              {errors.name && <p className="text-xs text-status-error mt-1 font-body">{errors.name.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-brand-black font-body mb-2">
                <Phone size={14} className="text-accent-gold" /> WhatsApp *
              </label>
              <input
                {...(() => {
                  const reg = register('phone', {
                    required: 'WhatsApp é obrigatório',
                    pattern: { value: /^\d{10,15}$/, message: 'Use apenas números, com DDD. Ex: 81999999999' }
                  });
                  return {
                    ...reg,
                    onBlur: (e) => {
                      reg.onBlur(e);
                      handlePhoneBlur();
                    }
                  }
                })()}
                className="w-full p-3.5 rounded-lg border-2 border-brand-graphite/10 focus:border-accent-gold bg-surface-elevated text-sm font-body outline-none transition-colors"
                placeholder="81999999999"
                inputMode="numeric"
              />
              {errors.phone && <p className="text-xs text-status-error mt-1 font-body">{errors.phone.message}</p>}
            </div>

            {/* City & State */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-brand-black font-body mb-2">
                  <MapPin size={14} className="text-accent-gold" /> Cidade *
                </label>
                <input
                  {...register('city', { required: 'Cidade é obrigatória' })}
                  className="w-full p-3.5 rounded-lg border-2 border-brand-graphite/10 focus:border-accent-gold bg-surface-elevated text-sm font-body outline-none transition-colors"
                  placeholder="Sua cidade"
                />
                {errors.city && <p className="text-xs text-status-error mt-1 font-body">{errors.city.message}</p>}
              </div>
              <div>
                <label className="text-sm font-semibold text-brand-black font-body mb-2 block">Estado *</label>
                <div className="relative">
                  <select
                    {...register('state', { required: 'Selecione o estado' })}
                    className="w-full p-3.5 rounded-lg border-2 border-brand-graphite/10 focus:border-accent-gold bg-surface-elevated text-sm font-body outline-none transition-colors appearance-none"
                  >
                    <option value="">UF</option>
                    {BRAZILIAN_STATES.map(uf => (
                      <option key={uf} value={uf}>{uf}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-graphite/40 pointer-events-none" />
                </div>
                {errors.state && <p className="text-xs text-status-error mt-1 font-body">{errors.state.message}</p>}
              </div>
            </div>

            {/* Neighborhood */}
            <div>
              <label className="text-sm font-semibold text-brand-black font-body mb-2 block">Bairro (opcional)</label>
              <input
                {...register('neighborhood')}
                className="w-full p-3.5 rounded-lg border-2 border-brand-graphite/10 focus:border-accent-gold bg-surface-elevated text-sm font-body outline-none transition-colors"
                placeholder="Seu bairro"
              />
            </div>

            {/* Delivery preference */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-brand-black font-body mb-3">
                <Truck size={14} className="text-accent-gold" /> Preferência de entrega
              </label>
              <div className="space-y-2">
                {(Object.entries(DELIVERY_OPTIONS) as [string, string][]).map(([value, label]) => (
                  <label key={value} className="flex items-center gap-3 p-3 rounded-lg border-2 border-brand-graphite/10 hover:border-accent-gold/50 cursor-pointer transition-colors">
                    <input
                      {...register('deliveryPreference')}
                      type="radio"
                      value={value}
                      className="accent-accent-gold w-4 h-4"
                    />
                    <span className="text-sm font-body">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-brand-black font-body mb-2">
                <FileText size={14} className="text-accent-gold" /> Observações (opcional)
              </label>
              <textarea
                {...register('notes')}
                className="w-full p-3.5 rounded-lg border-2 border-brand-graphite/10 focus:border-accent-gold bg-surface-elevated text-sm font-body outline-none transition-colors resize-none h-24"
                placeholder="Alguma observação para a atendente?"
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-5 rounded-xl text-lg transition-all hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle size={22} />
              {isSubmitting ? 'Enviando...' : 'Enviar pedido pelo WhatsApp'}
            </motion.button>

            <p className="text-xs text-brand-graphite/40 font-body text-center">
              {MICROCOPY.PAYMENT_INFO}
            </p>
          </form>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="bg-surface-elevated rounded-xl p-6 border border-brand-graphite/10 sticky top-28">
              <h3 className="font-display text-lg font-semibold text-brand-black mb-4">Seu Pedido</h3>

              <div className="space-y-3 mb-6">
                {items.map(item => (
                  <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3 text-sm font-body">
                    <div className="w-12 h-14 rounded bg-brand-sand shrink-0 flex items-center justify-center">
                      <ShoppingBag size={14} className="text-brand-graphite/20" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-brand-black font-medium line-clamp-1">{item.product.name}</p>
                      <p className="text-brand-graphite/50 text-xs">{item.selectedSize} • {item.selectedColor} • Qtd: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-brand-black whitespace-nowrap">{formatCurrencyBRL(item.subtotal)}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-brand-graphite/10 pt-4 space-y-2 text-sm font-body">
                <div className="flex justify-between">
                  <span className="text-brand-graphite/60">Subtotal</span>
                  <span className="font-medium">{formatCurrencyBRL(getSubtotal())}</span>
                </div>
                <div className="flex justify-between text-base font-bold">
                  <span>Total estimado</span>
                  <span>{formatCurrencyBRL(getTotalEstimated())}</span>
                </div>
              </div>

              <p className="text-xs text-brand-graphite/40 font-body mt-4">{MICROCOPY.SHIPPING_NOTE}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
