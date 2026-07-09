'use client';

import { useEffect } from 'react';
import { trackingService } from '@/services/trackingService';
import { Product } from '@/types';

export function usePixelEvents() {
  useEffect(() => {
    trackingService.trackPageView();
  }, []);

  return {
    trackViewContent: (product: Product) => {
      trackingService.trackViewContent({
        product_id: product.id,
        product_name: product.name,
        category: product.category,
        price: product.promotional_price || product.price,
        currency: 'BRL',
      });
    },
    trackAddToCart: (product: Product, quantity: number) => {
      trackingService.trackAddToCart({
        product_id: product.id,
        product_name: product.name,
        category: product.category,
        price: product.promotional_price || product.price,
        quantity,
        currency: 'BRL',
      });
    },
    trackInitiateCheckout: (totalEstimated: number) => {
      trackingService.trackInitiateCheckout({
        total_estimated: totalEstimated,
        currency: 'BRL',
      });
    },
    trackWhatsAppClick: (orderCode: string) => {
      trackingService.trackWhatsAppClick(orderCode);
    },
    trackSizeGuideOpened: () => {
      trackingService.trackSizeGuideOpened();
    },
  };
}
