export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  gclid?: string;
  fbclid?: string;
}

export type TrackingEventName =
  | 'PageView'
  | 'ViewContent'
  | 'AddToCart'
  | 'InitiateCheckout'
  | 'Lead'
  | 'WhatsAppCheckoutStarted'
  | 'WhatsAppClick'
  | 'ProductFilterUsed'
  | 'SizeGuideOpened';

export interface TrackingEventParams {
  product_id?: string;
  product_name?: string;
  category?: string;
  price?: number;
  quantity?: number;
  currency?: string;
  order_code?: string;
  total_estimated?: number;
  utm_source?: string;
  utm_campaign?: string;
  [key: string]: string | number | boolean | undefined;
}
