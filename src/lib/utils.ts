import { CartItem } from '@/types';

/**
 * Formata um número como moeda brasileira (BRL)
 */
export function formatCurrencyBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Gera código único de pedido: MRS-YYYYMMDD-HHMM-XXXX
 */
export function generateOrderCode(): string {
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, '');
  const time = `${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}`;
  const random = Math.random().toString(16).substring(2, 6).toUpperCase();
  return `MRS-${date}-${time}-${random}`;
}

/**
 * Codifica mensagem para URL do WhatsApp
 */
export function encodeWhatsAppMessage(message: string): string {
  return encodeURIComponent(message);
}

/**
 * Constrói URL do WhatsApp com mensagem pré-preenchida
 */
export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeWhatsAppMessage(message)}`;
}

/**
 * Calcula os totais do carrinho
 */
export function calculateCartTotals(items: CartItem[], discount: number = 0) {
  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const totalEstimated = Math.max(0, subtotal - discount);
  return { subtotal, totalEstimated };
}

/**
 * Recupera UTMs salvos do sessionStorage
 */
export function getStoredUTMs(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const stored = sessionStorage.getItem('mrsole-utm');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Captura UTMs da URL e salva no sessionStorage
 */
export function captureAndStoreUTMs(): void {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(window.location.search);
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid'];
  const utms: Record<string, string> = {};

  utmKeys.forEach(key => {
    const value = params.get(key);
    if (value) utms[key] = value;
  });

  if (Object.keys(utms).length > 0) {
    sessionStorage.setItem('mrsole-utm', JSON.stringify(utms));
  }
}

/**
 * Formata número de telefone para exibição
 */
export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  return phone;
}

/**
 * Gera slug a partir de texto
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Classname helper (sem dependência externa)
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
