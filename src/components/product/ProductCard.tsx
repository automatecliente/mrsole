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
    ? 'bg-accent-navy text-brand-white'
    : 'bg-status-error text-brand-white';

  return (
    <motion.div
      className="group relative bg-surface-elevated rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* Image */}
      <Link href={`/produto/${product.slug}`} className="block relative aspect-product overflow-hidden bg-brand-sand">
        <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/5 to-brand-charcoal/30 z-10" />
        <div className="absolute inset-0 flex items-center justify-center text-brand-graphite/30 text-sm font-body">
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-brand-graphite/10 flex items-center justify-center">
              <ShoppingBag size={24} className="text-brand-graphite/30" />
            </div>
            {product.name}
          </div>
        </div>

        {/* Badge */}
        {badge && (
          <span className={cn('absolute top-3 left-3 z-20 text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded', badgeColor)}>
            {badge}
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 z-20 bg-brand-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <span className="bg-brand-white text-brand-black px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2">
            <Eye size={16} /> Ver detalhes
          </span>
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

        {/* Sizes preview */}
        <div className="flex gap-1 mt-3 flex-wrap">
          {product.sizes.map((size) => (
            <span key={size} className="text-[10px] text-brand-graphite/50 border border-brand-graphite/15 rounded px-1.5 py-0.5 font-body">
              {size}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
