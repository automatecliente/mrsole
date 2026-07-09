'use client';

import { Product } from '@/types';
import { formatCurrencyBRL, cn } from '@/lib/utils';
import { ShoppingBag, Eye } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product) => void;
}

export default function ProductCard({ product, onQuickAdd }: ProductCardProps) {
  const price = product.promotional_price || product.price;
  const hasPromo = !!product.promotional_price;

  const badge = product.is_best_seller
    ? 'Mais vendida'
    : product.is_new
    ? 'Lançamento'
    : product.stock_status === 'low_stock'
    ? 'Últimas unidades'
    : null;

  const badgeColor = product.is_best_seller
    ? 'bg-accent-gold text-brand-black'
    : product.is_new
    ? 'bg-brand-charcoal text-brand-white border border-brand-white/10'
    : 'bg-brand-black text-brand-white border border-accent-gold/50';

  return (
    <motion.div
      className="group relative bg-surface-elevated rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* Image */}
      <Link href={`/produto/${product.slug}`} className="block relative aspect-product overflow-hidden bg-brand-charcoal">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-black/30 z-10 pointer-events-none" />

        {/* Product Images */}
        {product.images && product.images.length > 0 ? (
          <>
            {/* Image 2 (Second image - visible on hover) */}
            {product.images[1] && (
              <img
                src={product.images[1]}
                alt={`${product.name} - Detalhe`}
                className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-105 transition-all duration-700 ease-out z-0"
                loading="lazy"
              />
            )}
            {/* Image 1 (Primary image - fades on hover if Image 2 is available) */}
            <img
              src={product.images[0]}
              alt={product.name}
              className={cn(
                "absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out z-0",
                product.images[1] 
                  ? "group-hover:opacity-0 group-hover:scale-105" 
                  : "group-hover:scale-105"
              )}
              loading="lazy"
            />
          </>
        ) : (
          /* Placeholder */
          <div className="absolute inset-0 flex flex-col items-center justify-center text-accent-gold/40 text-sm font-body bg-brand-charcoal border border-brand-white/5">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-accent-gold/5 flex items-center justify-center border border-accent-gold/10">
              <ShoppingBag size={24} className="text-accent-gold/40" />
            </div>
            <span className="font-display tracking-widest text-[10px] uppercase text-brand-white/40">
              MRSOLE
            </span>
          </div>
        )}

        {/* Badge */}
        {badge && (
          <span className={cn('absolute top-3 left-3 z-20 text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded', badgeColor)}>
            {badge}
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 z-20 bg-brand-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
          <span className="bg-brand-white text-brand-black px-6 py-2.5 rounded-sm text-sm font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Eye size={16} /> Ver detalhes
          </span>
          <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
            {product.sizes.map((size) => (
              <span key={size} className="w-8 h-8 rounded-full bg-brand-black border border-brand-white/20 text-brand-white flex items-center justify-center text-[10px] font-bold">
                {size}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link href={`/produto/${product.slug}`}>
          <h3 className="font-display text-base font-semibold text-brand-black mb-1 group-hover:text-accent-gold transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-brand-graphite/70 mb-3 line-clamp-1 font-body">
          {product.short_description}
        </p>

        {/* Colors */}
        <div className="flex gap-1.5 mb-3">
          {product.colors.map((c) => (
            <span
              key={c.hex}
              className="w-4 h-4 rounded-full border border-brand-graphite/20"
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            {hasPromo && (
              <span className="text-xs text-brand-graphite/50 line-through mr-2 font-body">
                {formatCurrencyBRL(product.price)}
              </span>
            )}
            <span className={cn('text-lg font-bold font-body', hasPromo ? 'text-status-success' : 'text-brand-black')}>
              {formatCurrencyBRL(price)}
            </span>
          </div>

          {product.stock_status !== 'out_of_stock' && (
            <Link
              href={`/produto/${product.slug}`}
              className="bg-brand-black hover:bg-brand-charcoal text-brand-white p-2.5 rounded-lg transition-colors"
              title="Ver detalhes"
            >
              <ShoppingBag size={16} />
            </Link>
          )}
        </div>

        {/* Sizes preview hidden on default to reveal on hover instead, but we leave the container empty for layout if needed, or remove it entirely */}
        <div className="flex gap-1 mt-3 flex-wrap opacity-0 h-0">
        </div>
      </div>
    </motion.div>
  );
}
