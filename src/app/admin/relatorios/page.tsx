import { getOrderStats } from '@/services/orderService';
import { isSupabaseConfigured } from '@/lib/supabase';
import { TrendingUp, MousePointerClick, BarChart3, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminRelatoriosPage() {
  const stats = await getOrderStats();
  const configured = isSupabaseConfigured();

  // Mocked UTM data since we don't have real analytics backend integrated
  const utmMockData = [
    { campaign: 'meta_carrussel_camisas', clicks: 1245, leads: 84, costPerLead: 'R$ 8,40' },
    { campaign: 'meta_stories_oferta', clicks: 890, leads: 42, costPerLead: 'R$ 12,50' },
    { campaign: 'google_search_brand', clicks: 320, leads: 55, costPerLead: 'R$ 4,10' },
    { campaign: 'organico', clicks: 500, leads: 30, costPerLead: 'R$ 0,00' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-brand-black">Relatórios de Conversão</h1>
        <p className="text-brand-graphite/70 text-sm mt-1">Análise de tráfego, campanhas e funil de vendas</p>
      </div>

      {!configured && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg mb-8 text-sm">
          <strong>Aviso:</strong> O Supabase não está configurado. Estes relatórios exibem dados mockados e estatísticas zeradas.
        </div>
      )}

      {/* Funnel Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-brand-graphite/10 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <MousePointerClick size={18} className="text-blue-500" />
            <h3 className="font-medium text-brand-black text-sm">Visitas Únicas</h3>
          </div>
          <p className="text-2xl font-bold">2.955</p>
          <p className="text-xs text-green-600 mt-1">+12% vs mês anterior</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-brand-graphite/10 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCartIcon />
            <h3 className="font-medium text-brand-black text-sm">Adições ao Carrinho</h3>
          </div>
          <p className="text-2xl font-bold">482</p>
          <p className="text-xs text-brand-graphite/50 mt-1">16.3% conversão</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-brand-graphite/10 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <Users size={18} className="text-purple-500" />
            <h3 className="font-medium text-brand-black text-sm">Leads Gerados</h3>
          </div>
          <p className="text-2xl font-bold">{stats.totalLeads}</p>
          <p className="text-xs text-brand-graphite/50 mt-1">Contato via WhatsApp</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-brand-graphite/10 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp size={18} className="text-green-500" />
            <h3 className="font-medium text-brand-black text-sm">Pedidos Fechados</h3>
          </div>
          <p className="text-2xl font-bold">{stats.totalOrders}</p>
          <p className="text-xs text-brand-graphite/50 mt-1">Finalizados via Atendente</p>
        </div>
      </div>

      {/* UTM Performance Table */}
      <div className="bg-white border border-brand-graphite/10 rounded-xl overflow-hidden shadow-sm">
        <div className="p-5 border-b border-brand-graphite/10 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart3 size={20} className="text-brand-black" />
            <h2 className="font-display font-semibold text-brand-black">Performance por Campanha (UTM)</h2>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-sand/50 text-brand-graphite font-semibold border-b border-brand-graphite/10">
              <tr>
                <th className="py-3 px-4">Origem / Campanha</th>
                <th className="py-3 px-4 text-right">Cliques (Tráfego)</th>
                <th className="py-3 px-4 text-right">Leads Gerados</th>
                <th className="py-3 px-4 text-right">Custo por Lead Estimado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-graphite/5">
              {utmMockData.map((data, i) => (
                <tr key={i} className="hover:bg-brand-sand/10 transition-colors">
                  <td className="py-3 px-4 font-medium text-brand-black">{data.campaign}</td>
                  <td className="py-3 px-4 text-right text-brand-graphite/70">{data.clicks}</td>
                  <td className="py-3 px-4 text-right text-brand-black font-semibold">{data.leads}</td>
                  <td className="py-3 px-4 text-right text-brand-graphite/70">{data.costPerLead}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ShoppingCartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
      <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
    </svg>
  );
}
