import { Product } from './product';

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface CartState {
  items: CartItem[];
  notes: string;
  coupon?: string;
  discount: number;
}
