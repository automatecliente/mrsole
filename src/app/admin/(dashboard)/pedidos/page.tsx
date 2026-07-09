import { getOrders } from '@/services/orderService';
import { formatCurrencyBRL } from '@/lib/utils';
import { isSupabaseConfigured } from '@/lib/supabase';
import { ShoppingBag } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminPedidosPage() {
  const orders = await getOrders();
  const configured = isSupabaseConfigured();

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      'whatsapp_started': { label: 'Iniciado via WhatsApp', className: 'bg-amber-100 text-amber-800' },
      'awaiting_attendant': { label: 'Aguardando Atendente', className: 'bg-orange-100 text-orange-800' },
      'awaiting_payment': { label: 'Aguardando Pagamento', className: 'bg-blue-100 text-blue-800' },
      'paid': { label: 'Pago', className: 'bg-green-100 text-green-800' },
      'shipped': { label: 'Enviado', className: 'bg-purple-100 text-purple-800' },
      'completed': { label: 'Concluído', className: 'bg-gray-100 text-gray-800' },
      'canceled': { label: 'Cancelado', className: 'bg-red-100 text-red-800' },
    };
    const s = statusMap[status] || { label: status, className: 'bg-gray-100 text-gray-800' };
    return <span className={`px-2 py-1 rounded text-xs font-medium ${s.className}`}>{s.label}</span>;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-brand-black">Pedidos</h1>
        <p className="text-brand-graphite/70 text-sm mt-1">Gestão de pedidos iniciados pelo WhatsApp</p>
      </div>

      {!configured && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg mb-8 text-sm">
          <strong>Aviso:</strong> O Supabase não está configurado. Não é possível carregar os pedidos sem conexão com o banco de dados. Configure o <code>.env</code> com as chaves do Supabase.
        </div>
      )}

      <div className="bg-white border border-brand-graphite/10 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-sand/50 text-brand-graphite font-semibold border-b border-brand-graphite/10">
              <tr>
                <th className="py-3 px-4">Código / Data</th>
                <th className="py-3 px-4">Cliente</th>
                <th className="py-3 px-4">Itens</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-graphite/5">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-brand-graphite/50">
                    <ShoppingBag size={32} className="mx-auto mb-3 text-brand-graphite/20" />
                    <p>Nenhum pedido encontrado.</p>
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-brand-sand/10 transition-colors">
                    <td className="py-3 px-4">
                      <p className="font-medium text-brand-black">{order.orderCode}</p>
                      <p className="text-xs text-brand-graphite/50">{new Date(order.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-brand-black">{order.customer.name}</p>
                      <p className="text-xs text-brand-graphite/60">{order.customer.phone}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p>{order.items.reduce((acc, i) => acc + i.quantity, 0)} itens</p>
                    </td>
                    <td className="py-3 px-4 font-medium text-brand-black">
                      {formatCurrencyBRL(order.totalEstimated)}
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(order.status)}
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
