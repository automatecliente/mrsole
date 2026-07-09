'use client';

import { useState, useEffect } from 'react';
import { productService } from '@/services/productService';
import { ProductFilters, ProductCategory, Product } from '@/types';
import ProductCard from '@/components/product/ProductCard';
import { Search, SlidersHorizontal, X, Loader2 } from 'lucide-react';
import { CATEGORY_LABELS, SORT_OPTIONS } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ColecaoPage() {
  const [filters, setFilters] = useState<ProductFilters>({ sortBy: 'recommended' });
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getAllProducts().then(data => setAllProducts(data));
  }, []);

  useEffect(() => {
    setLoading(true);
    productService.filterProducts({ ...filters, search: searchQuery })
      .then(data => {
        setProducts(data);
        setLoading(false);
      });
  }, [filters, searchQuery]);

  const availableCategories = [...new Set(allProducts.map(p => p.category))];
  const availableSizes = [...new Set(allProducts.flatMap(p => p.sizes))];

  const toggleCategory = (cat: ProductCategory) => {
    setFilters(prev => {
      const current = prev.category || [];
      const updated = current.includes(cat)
        ? current.filter(c => c !== cat)
        : [...current, cat];
      return { ...prev, category: updated.length > 0 ? updated : undefined };
    });
  };

  const toggleSize = (size: string) => {
    setFilters(prev => {
      const current = prev.sizes || [];
      const updated = current.includes(size)
        ? current.filter(s => s !== size)
        : [...current, size];
      return { ...prev, sizes: updated.length > 0 ? updated : undefined };
    });
  };

  const clearFilters = () => {
    setFilters({ sortBy: 'recommended' });
    setSearchQuery('');
  };

  const activeFilterCount = (filters.category?.length || 0) + (filters.sizes?.length || 0) + (filters.isBestSeller ? 1 : 0) + (filters.isNew ? 1 : 0);

  return (
    <div className="pt-20 md:pt-24 pb-16 bg-surface-primary min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl text-brand-black mb-2">
            Nossa <span className="text-accent-gold">Coleção</span>
          </h1>
          <p className="text-brand-graphite/70 font-body">
            {!loading && (
              <>{products.length} {products.length === 1 ? 'camisa encontrada' : 'camisas encontradas'}</>
            )}
            {loading && 'Buscando camisas...'}
          </p>
        </div>

        {/* Search & Controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-graphite/40" />
            <input
              type="text"
              placeholder="Buscar camisas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-brand-graphite/10 focus:border-accent-gold bg-surface-elevated text-brand-black font-body text-sm outline-none transition-colors"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={cn(
                'flex items-center gap-2 px-4 py-3 rounded-lg border-2 text-sm font-body font-semibold transition-colors',
                showFilters || activeFilterCount > 0
                  ? 'border-accent-gold bg-accent-gold/10 text-brand-black'
                  : 'border-brand-graphite/10 text-brand-graphite hover:border-brand-graphite/30'
              )}
            >
              <SlidersHorizontal size={16} />
              Filtros
              {activeFilterCount > 0 && (
                <span className="bg-accent-gold text-brand-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <select
              value={filters.sortBy || 'recommended'}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as ProductFilters['sortBy'] }))}
              className="px-4 py-3 rounded-lg border-2 border-brand-graphite/10 bg-surface-elevated text-sm font-body text-brand-black outline-none focus:border-accent-gold transition-colors"
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-surface-elevated rounded-xl p-6 border border-brand-graphite/10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-display text-lg font-semibold">Filtros</h3>
                  {activeFilterCount > 0 && (
                    <button onClick={clearFilters} className="text-sm text-accent-gold hover:underline font-body flex items-center gap-1">
                      <X size={14} /> Limpar filtros
                    </button>
                  )}
                </div>

                {/* Categories */}
                <div className="mb-5">
                  <h4 className="text-sm font-semibold text-brand-black mb-2 font-body">Categoria</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => toggleCategory(cat)}
                        className={cn(
                          'px-3 py-1.5 rounded-full text-xs font-body transition-colors',
                          filters.category?.includes(cat)
                            ? 'bg-brand-black text-brand-white'
                            : 'bg-brand-sand text-brand-graphite hover:bg-brand-graphite/10'
                        )}
                      >
                        {CATEGORY_LABELS[cat] || cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-5">
                  <h4 className="text-sm font-semibold text-brand-black mb-2 font-body">Tamanho</h4>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={cn(
                          'min-w-[40px] px-3 py-1.5 rounded text-xs font-body font-semibold transition-colors',
                          filters.sizes?.includes(size)
                            ? 'bg-brand-black text-brand-white'
                            : 'bg-brand-sand text-brand-graphite hover:bg-brand-graphite/10'
                        )}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick filters */}
                <div>
                  <h4 className="text-sm font-semibold text-brand-black mb-2 font-body">Destaque</h4>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, isBestSeller: !prev.isBestSeller }))}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-body transition-colors',
                        filters.isBestSeller ? 'bg-accent-gold text-brand-black' : 'bg-brand-sand text-brand-graphite hover:bg-brand-graphite/10'
                      )}
                    >
                      ⭐ Mais vendidos
                    </button>
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, isNew: !prev.isNew }))}
                      className={cn(
                        'px-3 py-1.5 rounded-full text-xs font-body transition-colors',
                        filters.isNew ? 'bg-accent-navy text-brand-white' : 'bg-brand-sand text-brand-graphite hover:bg-brand-graphite/10'
                      )}
                    >
                      🆕 Lançamentos
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 size={32} className="text-accent-gold animate-spin" />
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-display text-xl text-brand-graphite/50 mb-4">Nenhuma camisa encontrada</p>
            <p className="text-sm text-brand-graphite/40 font-body mb-6">
              Tente ajustar os filtros ou buscar por outro termo.
            </p>
            <button
              onClick={clearFilters}
              className="bg-brand-black text-brand-white px-6 py-3 rounded-lg text-sm font-body font-semibold hover:bg-brand-charcoal transition-colors"
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
