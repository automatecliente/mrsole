import { TrackingEventName, TrackingEventParams } from '@/types';
import { META_PIXEL_ID, GTM_ID } from '@/lib/constants';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

/**
 * Dispara evento de tracking para Meta Pixel e GTM
 */
export function trackEvent(eventName: TrackingEventName, params?: TrackingEventParams): void {
  // Meta Pixel
  if (META_PIXEL_ID && typeof window !== 'undefined' && window.fbq) {
    const metaEventMap: Record<string, string> = {
      PageView: 'PageView',
      ViewContent: 'ViewContent',
      AddToCart: 'AddToCart',
      InitiateCheckout: 'InitiateCheckout',
      Lead: 'Lead',
      WhatsAppCheckoutStarted: 'Lead',
      WhatsAppClick: 'Lead',
    };

    const metaEvent = metaEventMap[eventName];
    if (metaEvent) {
      window.fbq('track', metaEvent, {
        ...params,
        currency: 'BRL',
      });
    } else {
      window.fbq('trackCustom', eventName, params);
    }
  }

  // Google Tag Manager
  if (GTM_ID && typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...params,
    });
  }

  // Dev logging
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Tracking] ${eventName}`, params);
  }
}

export const trackingService = {
  trackPageView: () => trackEvent('PageView'),
  trackViewContent: (params: TrackingEventParams) => trackEvent('ViewContent', params),
  trackAddToCart: (params: TrackingEventParams) => trackEvent('AddToCart', params),
  trackInitiateCheckout: (params: TrackingEventParams) => trackEvent('InitiateCheckout', params),
  trackLead: (params: TrackingEventParams) => trackEvent('Lead', params),
  trackWhatsAppClick: (orderCode: string) =>
    trackEvent('WhatsAppClick', { order_code: orderCode }),
  trackSizeGuideOpened: () => trackEvent('SizeGuideOpened'),
  trackProductFilterUsed: (params: TrackingEventParams) =>
    trackEvent('ProductFilterUsed', params),
};
