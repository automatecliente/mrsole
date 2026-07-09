'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { productService } from '@/services/productService';
import { useCartStore } from '@/store/cartStore';
import { useUIStore } from '@/store/uiStore';
import { usePixelEvents } from '@/hooks/usePixelEvents';
import SizeSelector from '@/components/product/SizeSelector';
import ColorSelector from '@/components/product/ColorSelector';
import QuantitySelector from '@/components/product/QuantitySelector';
import ProductCard from '@/components/product/ProductCard';
import { formatCurrencyBRL, cn } from '@/lib/utils';
import { MICROCOPY, WHATSAPP_NUMBER } from '@/lib/constants';
import { ShoppingBag, MessageCircle, Ruler, ChevronLeft, Shirt, ArrowRight, Loader2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { sizeGuide } from '@/data/sizeGuide';
import { Product } from '@/types';

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const addItem = useCartStore((s) => s.addItem);
  const showToast = useUIStore((s) => s.showToast);
  const { trackAddToCart } = usePixelEvents();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [colorError, setColorError] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const [showStickyCart, setShowStickyCart] = useState(false);

  useEffect(() => {
    productService.getProductBySlug(slug).then(data => {
      if (data) {
        setProduct(data);
        productService.getRelatedProducts(data.id).then(related => setRelatedProducts(related));
      }
      setLoading(false);
    });

    const handleScroll = () => {
      // Show sticky cart after scrolling down past the main CTA
      setShowStickyCart(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-16 flex justify-center container-custom">
        <Loader2 size={40} className="text-accent-gold animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-32 pb-16 text-center container-custom">
        <h1 className="font-display text-3xl text-brand-black mb-4">Produto não encontrado</h1>
        <Link href="/colecao" className="text-accent-gold hover:underline font-body">
          Voltar para a coleção
        </Link>
      </div>
    );
  }

  const price = product.promotional_price || product.price;
  const hasPromo = !!product.promotional_price;

  const handleAddToOrder = () => {
    let hasError = false;
    if (!selectedSize && product.sizes.length > 0) {
      setSizeError(true);
      hasError = true;
    }
    if (!selectedColor && product.colors.length > 0) {
      setColorError(true);
      hasError = true;
    }
    if (hasError) return;

    addItem(product, selectedSize || product.sizes[0], selectedColor || product.colors[0]?.name, quantity);
    trackAddToCart(product, quantity);
    showToast(MICROCOPY.PRODUCT_ADDED);
  };

  return (
    <div className="pt-20 md:pt-24 pb-16 bg-surface-primary">
      <div className="container-custom">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-brand-graphite/50 font-body mb-6">
          <Link href="/" className="hover:text-accent-gold transition-colors">Home</Link>
          <span>/</span>
          <Link href="/colecao" className="hover:text-accent-gold transition-colors">Coleção</Link>
          <span>/</span>
          <span className="text-brand-black">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-product rounded-xl overflow-hidden bg-brand-charcoal relative border border-brand-white/5 shadow-md">
              {product.images && product.images.length > 0 ? (
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIndex}
                    src={product.images[activeImageIndex]}
                    alt={`${product.name} - Foto ${activeImageIndex + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-brand-graphite/20">
                  <div className="text-center">
                    <Shirt size={64} className="mx-auto mb-3 text-brand-graphite/15" />
                    <p className="text-sm font-body">{product.name}</p>
                  </div>
                </div>
              )}

              {product.is_best_seller && (
                <span className="absolute top-4 left-4 bg-accent-gold text-brand-black text-xs uppercase tracking-wider font-bold px-3 py-1 rounded z-10">
                  Mais vendida
                </span>
              )}
              {product.is_new && (
                <span className="absolute top-4 left-4 bg-accent-navy text-brand-white text-xs uppercase tracking-wider font-bold px-3 py-1 rounded z-10">
                  Lançamento
                </span>
              )}
            </div>

            {/* Thumbnail strip */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={cn(
                      "w-20 h-24 rounded-lg overflow-hidden bg-brand-charcoal border-2 transition-all flex-shrink-0 relative",
                      activeImageIndex === i 
                        ? "border-accent-gold" 
                        : "border-brand-graphite/10 hover:border-brand-graphite/30"
                    )}
                  >
                    <img 
                      src={img} 
                      alt={`Miniatura ${i + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="font-display text-2xl md:text-3xl text-brand-black mb-2">{product.name}</h1>
            <p className="text-brand-graphite/70 font-body mb-6">{product.short_description}</p>

            {/* Price */}
            <div className="mb-6">
              {hasPromo && (
                <span className="text-lg text-brand-graphite/40 line-through font-body mr-3">
                  {formatCurrencyBRL(product.price)}
                </span>
              )}
              <span className={cn('text-3xl font-bold font-body', hasPromo ? 'text-status-success' : 'text-brand-black')}>
                {formatCurrencyBRL(price)}
              </span>
            </div>

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-brand-black font-body">
                    Cor {colorError && <span className="text-status-error font-normal">— {MICROCOPY.SELECT_COLOR}</span>}
                  </label>
                </div>
                <ColorSelector
                  colors={product.colors}
                  selected={selectedColor}
                  onChange={(c) => { setSelectedColor(c); setColorError(false); }}
                />
              </div>
            )}

            {/* Size Selector */}
            {product.sizes.length > 0 && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-semibold text-brand-black font-body">
                    Tamanho {sizeError && <span className="text-status-error font-normal">— {MICROCOPY.SELECT_SIZE}</span>}
                  </label>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-xs text-accent-gold hover:underline font-body flex items-center gap-1"
                  >
                    <Ruler size={12} /> Guia de medidas
                  </button>
                </div>
                <SizeSelector
                  sizes={product.sizes}
                  selected={selectedSize}
                  onChange={(s) => { setSelectedSize(s); setSizeError(false); }}
                />
                <p className="text-xs text-brand-graphite/50 font-body mt-2">{MICROCOPY.SIZE_HELP}</p>
              </div>
            )}

            {/* Size Guide inline */}
            {showSizeGuide && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                className="mb-6 overflow-hidden"
              >
                <div className="bg-brand-sand rounded-lg p-4">
                  <h4 className="font-display text-sm font-semibold mb-3">Tabela de Medidas (cm)</h4>
                  <table className="w-full text-xs font-body">
                    <thead>
                      <tr className="border-b border-brand-graphite/10">
                        <th className="py-2 text-left">Tamanho</th>
                        <th className="py-2 text-center">Tórax</th>
                        <th className="py-2 text-center">Ombro</th>
                        <th className="py-2 text-center">Comp.</th>
                        <th className="py-2 text-center">Manga</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeGuide.map(s => (
                        <tr key={s.size} className={cn('border-b border-brand-graphite/5', selectedSize === s.size && 'bg-accent-gold/10 font-semibold')}>
                          <td className="py-2">{s.size}</td>
                          <td className="py-2 text-center">{s.chest}</td>
                          <td className="py-2 text-center">{s.shoulder}</td>
                          <td className="py-2 text-center">{s.length}</td>
                          <td className="py-2 text-center">{s.sleeve}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-brand-black font-body mb-2 block">Quantidade</label>
              <QuantitySelector value={quantity} onChange={setQuantity} />
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={handleAddToOrder}
                disabled={product.stock_status === 'out_of_stock'}
                className="flex-1 flex items-center justify-center gap-2 bg-brand-black hover:bg-brand-charcoal text-brand-white font-bold py-4 px-6 rounded-lg text-base border border-accent-gold/20 shadow-[0_0_15px_rgba(212,175,55,0.08)] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={18} />
                Adicionar ao pedido
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Olá! Gostaria de tirar uma dúvida sobre a ${product.name}.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border-2 border-brand-graphite/15 hover:border-accent-gold text-brand-graphite hover:text-brand-black hover:bg-accent-gold font-semibold py-4 px-6 rounded-lg text-base transition-all"
              >
                <MessageCircle size={18} />
                Tirar dúvida
              </a>
            </div>

            {/* Details */}
            <div className="border-t border-brand-graphite/10 pt-6 space-y-4">
              <h3 className="font-display text-lg font-semibold">Detalhes</h3>
              <p className="text-sm text-brand-graphite/70 font-body leading-relaxed">{product.full_description}</p>
              <div className="grid grid-cols-2 gap-3 text-sm font-body">
                {product.fabric && (
                  <div><span className="text-brand-graphite/50">Tecido:</span> <span className="text-brand-black font-medium">{product.fabric}</span></div>
                )}
                {product.fit && (
                  <div><span className="text-brand-graphite/50">Caimento:</span> <span className="text-brand-black font-medium">{product.fit}</span></div>
                )}
                <div><span className="text-brand-graphite/50">Manga:</span> <span className="text-brand-black font-medium">{product.sleeve_type === 'longa' ? 'Manga Longa' : 'Manga Curta'}</span></div>
                <div><span className="text-brand-graphite/50">Categoria:</span> <span className="text-brand-black font-medium capitalize">{product.category}</span></div>
              </div>

              <div className="bg-brand-sand/70 rounded-lg p-4 text-xs text-brand-graphite/60 font-body space-y-1">
                <p>📦 {MICROCOPY.SHIPPING_INFO}</p>
                <p>💳 {MICROCOPY.PAYMENT_INFO}</p>
                <p>📏 {MICROCOPY.SIZE_HELP}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 md:mt-24">
            <div className="flex justify-between items-end mb-8">
              <h2 className="font-display text-2xl md:text-3xl text-brand-black">
                Você também vai <span className="text-accent-gold">gostar</span>
              </h2>
              <Link href="/colecao" className="text-sm text-accent-gold hover:underline font-body flex items-center gap-1">
                Ver mais <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile Sticky Add to Cart */}
      <AnimatePresence>
        {showStickyCart && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-brand-white border-t border-brand-graphite/10 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] md:hidden flex items-center justify-between gap-4"
          >
            <div className="flex-1 min-w-0">
              <p className="text-xs text-brand-graphite font-body truncate">{product.name}</p>
              <p className="font-bold text-brand-black">{formatCurrencyBRL(price)}</p>
            </div>
            <button
              onClick={handleAddToOrder}
              disabled={product.stock_status === 'out_of_stock'}
              className="bg-brand-black text-brand-white font-bold py-3 px-6 rounded-lg text-sm flex-shrink-0 disabled:opacity-40"
            >
              Adicionar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
