import { CartItem } from './cart';

export type DeliveryPreference = 'home' | 'pickup' | 'discuss';

export type OrderStatus =
  | 'draft'
  | 'whatsapp_started'
  | 'awaiting_attendant'
  | 'awaiting_payment'
  | 'paid'
  | 'shipped'
  | 'completed'
  | 'canceled';

export interface CustomerData {
  name: string;
  phone: string;
  city: string;
  state: string;
  neighborhood?: string;
  deliveryPreference: DeliveryPreference;
  notes?: string;
}

export interface WhatsAppOrder {
  id: string;
  orderCode: string;
  customer: CustomerData;
  items: CartItem[];
  subtotal: number;
  discount: number;
  totalEstimated: number;
  status: OrderStatus;
  whatsappSentAt: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  pageOrigin: string;
  createdAt: string;
  updatedAt: string;
}
