'use client';

import { useEffect, useState } from 'react';
import { productService } from '@/services/productService';
import ProductCard from '@/components/product/ProductCard';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Product } from '@/types';

export default function FeaturedProducts() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getFeaturedProducts().then(data => {
      setFeatured(data);
      setLoading(false);
    });
  }, []);

  return (
    <section className="py-16 md:py-24 bg-brand-sand/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4"
        >
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-brand-black mb-3">
              Peças em <span className="text-accent-gold">destaque</span>
            </h2>
            <p className="text-brand-graphite/70 font-body max-w-xl">
              As camisas mais desejadas da nossa coleção, selecionadas para você.
            </p>
          </div>
          <Link
            href="/colecao"
            className="inline-flex items-center gap-2 text-sm text-accent-gold hover:text-accent-gold-dark font-semibold font-body transition-colors group"
          >
            Ver toda a coleção
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 size={32} className="text-accent-gold animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
