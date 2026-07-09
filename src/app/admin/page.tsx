import { getOrderStats } from '@/services/orderService';
import { formatCurrencyBRL } from '@/lib/utils';
import { ShoppingBag, Users, DollarSign, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const stats = await getOrderStats();
  const configured = isSupabaseConfigured();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-brand-black">Dashboard</h1>
        <p className="text-brand-graphite/70 text-sm mt-1">Visão geral do seu negócio MRSOLE Outfit</p>
      </div>

      {!configured && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg mb-8 text-sm">
          <strong>Aviso:</strong> O Supabase não está configurado. O Admin Dashboard requer variáveis de ambiente do Supabase válidas para buscar dados reais de pedidos e leads. Para testes, ele exibirá valores zerados.
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-brand-graphite/10 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <ShoppingBag size={24} />
          </div>
          <div>
            <p className="text-sm text-brand-graphite/60 font-medium">Total de Pedidos</p>
            <p className="text-2xl font-bold text-brand-black">{stats.totalOrders}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-brand-graphite/10 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm text-brand-graphite/60 font-medium">Receita Estimada</p>
            <p className="text-2xl font-bold text-brand-black">{formatCurrencyBRL(stats.totalRevenue)}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-brand-graphite/10 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-brand-graphite/60 font-medium">Leads Capturados</p>
            <p className="text-2xl font-bold text-brand-black">{stats.totalLeads}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="font-display text-lg font-semibold text-brand-black mb-4">Ações Rápidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/pedidos" className="p-4 bg-white border border-brand-graphite/10 rounded-lg hover:border-accent-gold transition-colors flex flex-col gap-2">
            <ShoppingBag size={20} className="text-brand-graphite" />
            <span className="font-medium text-brand-black">Ver Pedidos Recentes</span>
          </Link>
          <Link href="/admin/produtos/novo" className="p-4 bg-white border border-brand-graphite/10 rounded-lg hover:border-accent-gold transition-colors flex flex-col gap-2">
            <TrendingUp size={20} className="text-brand-graphite" />
            <span className="font-medium text-brand-black">Adicionar Produto</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
