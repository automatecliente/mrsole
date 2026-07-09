import { WhatsAppOrder } from '@/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

/**
 * Salva pedido no Supabase (se configurado) e localStorage
 */
export async function saveOrder(order: WhatsAppOrder): Promise<void> {
  // Always save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('mrsole-last-order', JSON.stringify(order));
  }

  // Save to Supabase if configured
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from('whatsapp_orders').insert({
        order_code: order.orderCode,
        customer_name: order.customer.name,
        customer_phone: order.customer.phone,
        customer_city: order.customer.city,
        customer_state: order.customer.state,
        delivery_preference: order.customer.deliveryPreference,
        notes: order.customer.notes || '',
        items: order.items.map((i) => ({
          product_id: i.product.id,
          product_name: i.product.name,
          size: i.selectedSize,
          color: i.selectedColor,
          quantity: i.quantity,
          unit_price: i.unitPrice,
          subtotal: i.subtotal,
        })),
        subtotal: order.subtotal,
        discount: order.discount,
        total_estimated: order.totalEstimated,
        status: order.status,
        whatsapp_sent_at: order.whatsappSentAt,
        utm_source: order.utmSource,
        utm_medium: order.utmMedium,
        utm_campaign: order.utmCampaign,
        utm_content: order.utmContent,
        utm_term: order.utmTerm,
        page_origin: order.pageOrigin,
      });

      if (error) {
        console.error('[OrderService] Error saving order:', error);
      }
    } catch (err) {
      console.error('[OrderService] Failed to save order to Supabase:', err);
    }
  }
}

/**
 * Salva lead no Supabase
 */
export async function saveLead(
  name: string,
  phone: string,
  source?: string,
  campaign?: string,
  orderCode?: string
): Promise<void> {
  if (!isSupabaseConfigured() || !supabase) return;

  try {
    await supabase.from('leads').insert({
      name,
      phone,
      source: source || 'site',
      campaign: campaign || '',
      first_order_code: orderCode || '',
    });
  } catch (err) {
    console.error('[OrderService] Failed to save lead:', err);
  }
}

/**
 * Salva carrinho abandonado
 */
export async function saveAbandonedCart(
  name: string,
  phone: string,
  items: any[],
  subtotal: number,
  source?: string,
  campaign?: string
): Promise<void> {
  if (!isSupabaseConfigured() || !supabase) return;
  
  try {
    // Para MVP, salvamos como um lead com orderCode provisório
    await supabase.from('whatsapp_orders').insert({
      order_code: `ABD-${new Date().getTime()}`,
      customer_name: name,
      customer_phone: phone,
      customer_city: '',
      customer_state: '',
      delivery_preference: 'home',
      notes: 'Carrinho Abandonado',
      items: items.map(i => ({
        product_id: i.product.id,
        product_name: i.product.name,
        size: i.selectedSize,
        color: i.selectedColor,
        quantity: i.quantity,
        unit_price: i.unitPrice,
        subtotal: i.subtotal,
      })),
      subtotal,
      discount: 0,
      total_estimated: subtotal,
      status: 'abandoned',
      utm_source: source,
      utm_campaign: campaign
    });
  } catch (err) {
    console.error('[OrderService] Failed to save abandoned cart:', err);
  }
}

/**
 * Funções Administrativas
 */

export async function getOrders(): Promise<WhatsAppOrder[]> {
  if (!isSupabaseConfigured() || !supabase) return [];
  
  try {
    const { data, error } = await supabase
      .from('whatsapp_orders')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    
    // Map snake_case from DB to camelCase for the frontend if needed, 
    // but the DB schema is different from the WhatsAppOrder interface in structure for `customer` 
    // We need to map it back
    return data.map((row: any) => ({
      id: row.id,
      orderCode: row.order_code,
      customer: {
        name: row.customer_name,
        phone: row.customer_phone,
        city: row.customer_city,
        state: row.customer_state,
        deliveryPreference: row.delivery_preference,
        notes: row.notes,
      },
      items: row.items.map((i: any) => ({
        product: { id: i.product_id, name: i.product_name } as any,
        selectedSize: i.size,
        selectedColor: i.color,
        quantity: i.quantity,
        unitPrice: i.unit_price,
        subtotal: i.subtotal,
      })),
      subtotal: row.subtotal,
      discount: row.discount,
      totalEstimated: row.total_estimated,
      status: row.status,
      whatsappSentAt: row.whatsapp_sent_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    })) as WhatsAppOrder[];
  } catch (err) {
    console.error('[OrderService] Failed to get orders:', err);
    return [];
  }
}

export async function getOrderStats(): Promise<{ totalOrders: number, totalRevenue: number, totalLeads: number }> {
  if (!isSupabaseConfigured() || !supabase) return { totalOrders: 0, totalRevenue: 0, totalLeads: 0 };
  
  try {
    const { count: ordersCount, data: ordersData } = await supabase.from('whatsapp_orders').select('total_estimated', { count: 'exact' });
    const { count: leadsCount } = await supabase.from('leads').select('*', { count: 'exact', head: true });
    
    const revenue = ordersData ? ordersData.reduce((acc, order) => acc + Number(order.total_estimated), 0) : 0;
    
    return {
      totalOrders: ordersCount || 0,
      totalRevenue: revenue,
      totalLeads: leadsCount || 0,
    };
  } catch (err) {
    console.error('[OrderService] Failed to get stats:', err);
    return { totalOrders: 0, totalRevenue: 0, totalLeads: 0 };
  }
}

export async function updateOrderStatus(id: string, status: string): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) return false;
  
  try {
    const { error } = await supabase
      .from('whatsapp_orders')
      .update({ status })
      .eq('id', id);
      
    return !error;
  } catch (err) {
    console.error('[OrderService] Failed to update order status:', err);
    return false;
  }
}

export async function getLeads(): Promise<any[]> {
  if (!isSupabaseConfigured() || !supabase) return [];
  
  try {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('[OrderService] Failed to get leads:', err);
    return [];
  }
}
