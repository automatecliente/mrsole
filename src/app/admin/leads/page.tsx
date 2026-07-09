import { getLeads } from '@/services/orderService';
import { isSupabaseConfigured } from '@/lib/supabase';
import { Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
  const leads = await getLeads();
  const configured = isSupabaseConfigured();

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-brand-black">Leads</h1>
        <p className="text-brand-graphite/70 text-sm mt-1">Contatos capturados no checkout</p>
      </div>

      {!configured && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg mb-8 text-sm">
          <strong>Aviso:</strong> O Supabase não está configurado. Configure as variáveis de ambiente para visualizar os leads salvos no banco.
        </div>
      )}

      <div className="bg-white border border-brand-graphite/10 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-sand/50 text-brand-graphite font-semibold border-b border-brand-graphite/10">
              <tr>
                <th className="py-3 px-4">Nome</th>
                <th className="py-3 px-4">WhatsApp</th>
                <th className="py-3 px-4">Origem / Campanha</th>
                <th className="py-3 px-4">Primeiro Pedido</th>
                <th className="py-3 px-4">Data Cadastro</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-graphite/5">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-brand-graphite/50">
                    <Users size={32} className="mx-auto mb-3 text-brand-graphite/20" />
                    <p>Nenhum lead encontrado.</p>
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-brand-sand/10 transition-colors">
                    <td className="py-3 px-4 font-medium text-brand-black">{lead.name}</td>
                    <td className="py-3 px-4">{lead.phone}</td>
                    <td className="py-3 px-4">
                      {lead.source}
                      {lead.campaign && <span className="text-xs block text-brand-graphite/50">{lead.campaign}</span>}
                    </td>
                    <td className="py-3 px-4">
                      {lead.first_order_code ? (
                        <span className="font-mono text-xs bg-brand-sand px-2 py-1 rounded">{lead.first_order_code}</span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="py-3 px-4 text-brand-graphite/70">
                      {new Date(lead.created_at).toLocaleDateString('pt-BR')}
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
