import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { formatCurrencyBRL } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminAbandonedCartsPage() {
  const configured = isSupabaseConfigured();
  let abandoned: any[] = [];

  if (configured && supabase) {
    const { data } = await supabase
      .from('whatsapp_orders')
      .select('*')
      .eq('status', 'abandoned')
      .order('created_at', { ascending: false });
    
    if (data) abandoned = data;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-brand-black">Carrinhos Abandonados</h1>
        <p className="text-brand-graphite/70 text-sm mt-1">
          Leads capturados durante o checkout que não clicaram em "Enviar pelo WhatsApp".
        </p>
      </div>

      {!configured && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg mb-8 text-sm">
          <strong>Aviso:</strong> O Supabase não está configurado. Configure as variáveis de ambiente para visualizar os carrinhos abandonados reais.
        </div>
      )}

      <div className="bg-white border border-brand-graphite/10 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-sand/50 text-brand-graphite font-semibold border-b border-brand-graphite/10">
              <tr>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">WhatsApp</th>
                <th className="py-3 px-4">Total Abandonado</th>
                <th className="py-3 px-4">Data / Hora</th>
                <th className="py-3 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-graphite/5">
              {abandoned.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-brand-graphite/50">
                    <ShoppingCart size={32} className="mx-auto mb-3 text-brand-graphite/20" />
                    <p>Nenhum carrinho abandonado encontrado.</p>
                  </td>
                </tr>
              ) : (
                abandoned.map((cart) => (
                  <tr key={cart.id} className="hover:bg-brand-sand/10 transition-colors">
                    <td className="py-3 px-4 font-medium text-brand-black">{cart.customer_name}</td>
                    <td className="py-3 px-4 text-brand-graphite">{cart.customer_phone}</td>
                    <td className="py-3 px-4 font-medium">{formatCurrencyBRL(cart.total_estimated)}</td>
                    <td className="py-3 px-4 text-brand-graphite/70">
                      {new Date(cart.created_at).toLocaleString('pt-BR')}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <a 
                        href={`https://wa.me/${cart.customer_phone}?text=Olá ${cart.customer_name}, vimos que você quase finalizou seu pedido na MRSOLE Outfit. Ficou alguma dúvida sobre tamanho ou frete?`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs bg-green-50 text-green-700 hover:bg-green-100 font-semibold px-3 py-1.5 rounded-lg transition-colors border border-green-200"
                      >
                        Recuperar via WhatsApp
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
