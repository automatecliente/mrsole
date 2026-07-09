import { productService } from '@/services/productService';
import { formatCurrencyBRL } from '@/lib/utils';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function AdminProdutosPage() {
  const products = await productService.getAllProducts();
  const configured = isSupabaseConfigured();

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-black">Produtos</h1>
          <p className="text-brand-graphite/70 text-sm mt-1">Gerencie os produtos da sua vitrine</p>
        </div>
        <Link 
          href="/admin/produtos/novo" 
          className="bg-brand-black text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-brand-charcoal transition-colors"
        >
          <Plus size={16} /> Novo Produto
        </Link>
      </div>

      {!configured && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg mb-8 text-sm">
          <strong>Aviso:</strong> O Supabase não está configurado. A lista abaixo exibe os produtos mockados para testes. Ações de criação/edição não serão persistidas permanentemente.
        </div>
      )}

      <div className="bg-white border border-brand-graphite/10 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-sand/50 text-brand-graphite font-semibold border-b border-brand-graphite/10">
              <tr>
                <th className="py-3 px-4">Produto</th>
                <th className="py-3 px-4">Categoria</th>
                <th className="py-3 px-4">Preço</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-graphite/5">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-brand-graphite/50">
                    Nenhum produto cadastrado.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-brand-sand/10 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-brand-sand overflow-hidden">
                          {product.images[0] && (
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-brand-black">{product.name}</p>
                          <p className="text-xs text-brand-graphite/50 truncate max-w-[200px]">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 capitalize">{product.category}</td>
                    <td className="py-3 px-4">
                      {product.promotional_price ? (
                        <div>
                          <span className="font-medium">{formatCurrencyBRL(product.promotional_price)}</span>
                          <span className="text-xs text-brand-graphite/40 line-through block">{formatCurrencyBRL(product.price)}</span>
                        </div>
                      ) : (
                        <span className="font-medium">{formatCurrencyBRL(product.price)}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${product.stock_status === 'in_stock' ? 'bg-green-100 text-green-800' : product.stock_status === 'out_of_stock' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'}`}>
                        {product.stock_status === 'in_stock' ? 'Em estoque' : product.stock_status === 'low_stock' ? 'Baixo estoque' : 'Esgotado'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/produtos/${product.id}`} className="p-1.5 text-brand-graphite hover:text-accent-gold transition-colors">
                          <Edit size={16} />
                        </Link>
                        <button className="p-1.5 text-brand-graphite hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
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
