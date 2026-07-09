'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { productService } from '@/services/productService';
import { isSupabaseConfigured } from '@/lib/supabase';

export default function NovoProdutoPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  
  // Basic state for the form
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    short_description: '',
    price: '',
    category: 'casual',
    stock_status: 'in_stock',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (!isSupabaseConfigured()) {
      alert('Supabase não configurado. Este é um teste com mock data. O produto não será salvo permanentemente.');
      setTimeout(() => {
        setSaving(false);
        router.push('/admin/produtos');
      }, 1000);
      return;
    }

    try {
      await productService.createProduct({
        ...formData,
        price: Number(formData.price) || 0,
        images: [],
        sizes: ['P', 'M', 'G'],
        colors: [],
        tags: [],
        sleeve_type: 'longa',
        active: true,
      } as any);
      
      router.push('/admin/produtos');
    } catch (error) {
      console.error(error);
      alert('Erro ao salvar produto');
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/produtos" className="p-2 bg-white border border-brand-graphite/10 rounded-lg hover:bg-brand-sand transition-colors">
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-black">Novo Produto</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-brand-graphite/10 rounded-xl p-6 space-y-6 shadow-sm">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-brand-black mb-1">Nome do Produto</label>
            <input 
              required
              type="text" 
              className="w-full px-3 py-2 border border-brand-graphite/20 rounded-md outline-none focus:border-accent-gold"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-black mb-1">Slug (URL)</label>
            <input 
              required
              type="text" 
              className="w-full px-3 py-2 border border-brand-graphite/20 rounded-md outline-none focus:border-accent-gold"
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-black mb-1">Descrição Curta</label>
            <textarea 
              required
              className="w-full px-3 py-2 border border-brand-graphite/20 rounded-md outline-none focus:border-accent-gold resize-none h-20"
              value={formData.short_description}
              onChange={(e) => setFormData({...formData, short_description: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-brand-black mb-1">Preço (R$)</label>
              <input 
                required
                type="number" 
                step="0.01"
                className="w-full px-3 py-2 border border-brand-graphite/20 rounded-md outline-none focus:border-accent-gold"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-black mb-1">Categoria</label>
              <select 
                className="w-full px-3 py-2 border border-brand-graphite/20 rounded-md outline-none focus:border-accent-gold"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="casual">Casual</option>
                <option value="social">Social</option>
                <option value="linho">Linho</option>
                <option value="combo">Combo</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-brand-black mb-1">Estoque</label>
            <select 
              className="w-full px-3 py-2 border border-brand-graphite/20 rounded-md outline-none focus:border-accent-gold"
              value={formData.stock_status}
              onChange={(e) => setFormData({...formData, stock_status: e.target.value})}
            >
              <option value="in_stock">Em Estoque</option>
              <option value="low_stock">Baixo Estoque</option>
              <option value="out_of_stock">Esgotado</option>
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-brand-graphite/10 flex justify-end gap-3">
          <Link href="/admin/produtos" className="px-4 py-2 border border-brand-graphite/20 rounded-lg text-brand-graphite hover:bg-brand-sand transition-colors font-medium">
            Cancelar
          </Link>
          <button 
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-brand-black text-white rounded-lg flex items-center gap-2 font-medium hover:bg-brand-charcoal transition-colors disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? 'Salvando...' : 'Salvar Produto'}
          </button>
        </div>
      </form>
    </div>
  );
}
