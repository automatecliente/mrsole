'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '@/types';
import { calculateCartTotals } from '@/lib/utils';

interface CartStore {
  items: CartItem[];
  notes: string;
  coupon: string;
  discount: number;

  // Actions
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  updateSize: (productId: string, oldSize: string, color: string, newSize: string) => void;
  updateColor: (productId: string, size: string, oldColor: string, newColor: string) => void;
  setNotes: (notes: string) => void;
  clearCart: () => void;

  // Computed
  getSubtotal: () => number;
  getTotalEstimated: () => number;
  getItemCount: () => number;
  isEmpty: () => boolean;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      notes: '',
      coupon: '',
      discount: 0,

      addItem: (product, size, color, quantity = 1) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.selectedSize === size &&
              item.selectedColor === color
          );

          const price = product.promotional_price || product.price;

          if (existingIndex >= 0) {
            const updated = [...state.items];
            const newQty = updated[existingIndex].quantity + quantity;
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: newQty,
              subtotal: price * newQty,
            };
            return { items: updated };
          }

          return {
            items: [
              ...state.items,
              {
                product,
                selectedSize: size,
                selectedColor: color,
                quantity,
                unitPrice: price,
                subtotal: price * quantity,
              },
            ],
          };
        });
      },

      removeItem: (productId, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedSize === size &&
                item.selectedColor === color
              )
          ),
        }));
      },

      updateQuantity: (productId, size, color, quantity) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (
              item.product.id === productId &&
              item.selectedSize === size &&
              item.selectedColor === color
            ) {
              return {
                ...item,
                quantity,
                subtotal: item.unitPrice * quantity,
              };
            }
            return item;
          }),
        }));
      },

      updateSize: (productId, oldSize, color, newSize) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (
              item.product.id === productId &&
              item.selectedSize === oldSize &&
              item.selectedColor === color
            ) {
              return { ...item, selectedSize: newSize };
            }
            return item;
          }),
        }));
      },

      updateColor: (productId, size, oldColor, newColor) => {
        set((state) => ({
          items: state.items.map((item) => {
            if (
              item.product.id === productId &&
              item.selectedSize === size &&
              item.selectedColor === oldColor
            ) {
              return { ...item, selectedColor: newColor };
            }
            return item;
          }),
        }));
      },

      setNotes: (notes) => set({ notes }),

      clearCart: () => set({ items: [], notes: '', coupon: '', discount: 0 }),

      getSubtotal: () => {
        const { subtotal } = calculateCartTotals(get().items);
        return subtotal;
      },

      getTotalEstimated: () => {
        const { totalEstimated } = calculateCartTotals(get().items, get().discount);
        return totalEstimated;
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      isEmpty: () => get().items.length === 0,
    }),
    {
      name: 'mrsole-cart',
      version: 1,
    }
  )
);
