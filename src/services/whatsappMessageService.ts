import { WhatsAppOrder, CartItem, CustomerData } from '@/types';
import { formatCurrencyBRL, generateOrderCode, buildWhatsAppUrl, getStoredUTMs } from '@/lib/utils';
import { DELIVERY_OPTIONS, WHATSAPP_NUMBER } from '@/lib/constants';

/**
 * Monta a mensagem estruturada do pedido para WhatsApp
 */
export function buildOrderMessage(
  customer: CustomerData,
  items: CartItem[],
  subtotal: number,
  discount: number,
  totalEstimated: number,
  orderCode: string,
  notes?: string
): string {
  const utms = getStoredUTMs();
  const deliveryLabel = DELIVERY_OPTIONS[customer.deliveryPreference] || customer.deliveryPreference;

  let message = `Olá, vim pelo site da MRSOLE Outfit e gostaria de finalizar este pedido:\n\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📋 DADOS DO CLIENTE\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Nome: ${customer.name}\n`;
  message += `WhatsApp: ${customer.phone}\n`;
  message += `Cidade/UF: ${customer.city}/${customer.state}\n`;
  if (customer.neighborhood) message += `Bairro: ${customer.neighborhood}\n`;
  message += `Entrega: ${deliveryLabel}\n`;

  message += `\n━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🛍 PEDIDO\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n\n`;

  items.forEach((item, index) => {
    message += `${index + 1}. ${item.product.name}\n`;
    message += `   Tamanho: ${item.selectedSize}\n`;
    message += `   Cor: ${item.selectedColor}\n`;
    message += `   Quantidade: ${item.quantity}\n`;
    message += `   Valor unitário: ${formatCurrencyBRL(item.unitPrice)}\n`;
    message += `   Subtotal: ${formatCurrencyBRL(item.subtotal)}\n\n`;
  });

  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 RESUMO\n`;
  message += `━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Subtotal dos produtos: ${formatCurrencyBRL(subtotal)}\n`;
  if (discount > 0) {
    message += `Cupom/desconto: -${formatCurrencyBRL(discount)}\n`;
  }
  message += `Total estimado: ${formatCurrencyBRL(totalEstimated)}\n`;

  if (notes || customer.notes) {
    message += `\n📝 Observações:\n${notes || customer.notes}\n`;
  }

  message += `\n🔖 Código do pedido: ${orderCode}\n`;
  message += `📍 Origem: Site MRSOLE Outfit\n`;

  if (utms.utm_source || utms.utm_campaign) {
    message += `📊 UTM: ${utms.utm_source || '-'} | ${utms.utm_campaign || '-'}\n`;
  }

  message += `\nAguardo a confirmação de disponibilidade, frete e forma de pagamento.`;

  return message;
}

/**
 * Processa o checkout completo e abre WhatsApp
 */
export function processWhatsAppCheckout(
  customer: CustomerData,
  items: CartItem[],
  subtotal: number,
  discount: number,
  totalEstimated: number,
  notes?: string
): { orderCode: string; whatsappUrl: string; order: WhatsAppOrder } {
  const orderCode = generateOrderCode();
  const now = new Date().toISOString();
  const utms = getStoredUTMs();

  const message = buildOrderMessage(customer, items, subtotal, discount, totalEstimated, orderCode, notes);
  const whatsappUrl = buildWhatsAppUrl(WHATSAPP_NUMBER, message);

  const order: WhatsAppOrder = {
    id: crypto.randomUUID ? crypto.randomUUID() : orderCode,
    orderCode,
    customer,
    items,
    subtotal,
    discount,
    totalEstimated,
    status: 'whatsapp_started',
    whatsappSentAt: now,
    utmSource: utms.utm_source,
    utmMedium: utms.utm_medium,
    utmCampaign: utms.utm_campaign,
    utmContent: utms.utm_content,
    utmTerm: utms.utm_term,
    pageOrigin: typeof window !== 'undefined' ? window.location.href : '',
    createdAt: now,
    updatedAt: now,
  };

  // Persist last order
  if (typeof window !== 'undefined') {
    localStorage.setItem('mrsole-last-order', JSON.stringify(order));
  }

  return { orderCode, whatsappUrl, order };
}

/**
 * Recupera o último pedido salvo
 */
export function getLastOrder(): WhatsAppOrder | null {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem('mrsole-last-order');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}
