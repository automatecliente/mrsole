import { products as mockProducts } from '@/data/products';
import { Product, ProductFilters, CartItem } from '@/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// Helper for local mock fallback delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data as Product[];
    }
    await delay(300);
    return mockProducts.filter((p) => p.active);
  },

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
      if (!error && data) return data as Product;
    }
    await delay(300);
    return mockProducts.find((p) => p.slug === slug && p.active);
  },

  async getFeaturedProducts(): Promise<Product[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('products').select('*').eq('is_featured', true).eq('active', true);
      if (!error && data && data.length > 0) return data as Product[];
    }
    await delay(300);
    return mockProducts.filter((p) => p.active && p.is_featured);
  },

  async getBestSellers(): Promise<Product[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('products').select('*').eq('is_best_seller', true).eq('active', true);
      if (!error && data && data.length > 0) return data as Product[];
    }
    await delay(300);
    return mockProducts.filter((p) => p.active && p.is_best_seller);
  },

  async getNewProducts(): Promise<Product[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('products').select('*').eq('is_new', true).eq('active', true);
      if (!error && data && data.length > 0) return data as Product[];
    }
    await delay(300);
    return mockProducts.filter((p) => p.active && p.is_new);
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('products').select('*').eq('category', category).eq('active', true);
      if (!error && data && data.length > 0) return data as Product[];
    }
    await delay(300);
    return mockProducts.filter((p) => p.active && p.category === category);
  },

  async getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
    // Para simplificar, usamos a lista mockada se o Supabase não retornar, mas no Supabase buscaríamos a categoria primeiro
    await delay(300);
    const product = mockProducts.find((p) => p.id === productId);
    if (!product) return [];
    
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('products').select('*').eq('category', product.category).neq('id', productId).eq('active', true).limit(limit);
      if (!error && data && data.length > 0) return data as Product[];
    }

    return mockProducts
      .filter((p) => p.active && p.id !== productId && p.category === product.category)
      .slice(0, limit);
  },

  async getUpsellProducts(cartItems: CartItem[]): Promise<Product[]> {
    await delay(300);
    if (cartItems.length === 0) {
       return this.getFeaturedProducts().then(res => res.slice(0, 3));
    }

    const cartCategories = [...new Set(cartItems.map((i) => i.product.category))];
    const cartIds = cartItems.map((i) => i.product.id);

    const complementary: string[] = [];
    if (cartCategories.includes('social')) complementary.push('casual', 'linho');
    if (cartCategories.includes('casual')) complementary.push('social', 'linho');
    if (!cartCategories.includes('combo')) complementary.push('combo');

    let allProducts = mockProducts;
    if (isSupabaseConfigured() && supabase) {
      const { data } = await supabase.from('products').select('*').eq('active', true);
      if (data && data.length > 0) allProducts = data as Product[];
    }

    const suggestions = allProducts
      .filter(
        (p) =>
          p.active &&
          !cartIds.includes(p.id) &&
          (complementary.includes(p.category) || p.is_best_seller)
      )
      .slice(0, 3);

    return suggestions.length > 0
      ? suggestions
      : allProducts.filter((p) => p.active && !cartIds.includes(p.id)).slice(0, 3);
  },

  async filterProducts(filters: ProductFilters): Promise<Product[]> {
    await delay(300);
    let result = mockProducts.filter((p) => p.active);

    if (isSupabaseConfigured() && supabase) {
      const { data } = await supabase.from('products').select('*').eq('active', true);
      if (data && data.length > 0) result = data as Product[];
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.short_description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (filters.category && filters.category.length > 0) {
      result = result.filter((p) => filters.category!.includes(p.category));
    }

    if (filters.sizes && filters.sizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => filters.sizes!.includes(s)));
    }

    if (filters.colors && filters.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => filters.colors!.includes(c.name))
      );
    }

    if (filters.priceRange) {
      result = result.filter((p) => {
        const price = p.promotional_price || p.price;
        return price >= filters.priceRange!.min && price <= filters.priceRange!.max;
      });
    }

    if (filters.sleeveType && filters.sleeveType.length > 0) {
      result = result.filter((p) => filters.sleeveType!.includes(p.sleeve_type));
    }

    if (filters.fabric && filters.fabric.length > 0) {
      result = result.filter((p) =>
        filters.fabric!.some((f) => p.fabric?.toLowerCase().includes(f.toLowerCase()))
      );
    }

    if (filters.isBestSeller) {
      result = result.filter((p) => p.is_best_seller);
    }

    if (filters.isNew) {
      result = result.filter((p) => p.is_new);
    }

    // Sort
    switch (filters.sortBy) {
      case 'price_asc':
        result.sort((a, b) => (a.promotional_price || a.price) - (b.promotional_price || b.price));
        break;
      case 'price_desc':
        result.sort((a, b) => (b.promotional_price || b.price) - (a.promotional_price || a.price));
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case 'best_sellers':
        result.sort((a, b) => (b.is_best_seller ? 1 : 0) - (a.is_best_seller ? 1 : 0));
        break;
      case 'recommended':
      default:
        result.sort((a, b) => {
          const scoreA = (a.is_featured ? 3 : 0) + (a.is_best_seller ? 2 : 0) + (a.is_new ? 1 : 0);
          const scoreB = (b.is_featured ? 3 : 0) + (b.is_best_seller ? 2 : 0) + (b.is_new ? 1 : 0);
          return scoreB - scoreA;
        });
    }

    return result;
  },

  // Admin methods
  async createProduct(product: Partial<Product>): Promise<Product | null> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('products').insert(product).select().single();
      if (!error && data) return data as Product;
    }
    return null; // Not implemented for mock data persistence across reloads
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('products').update(updates).eq('id', id).select().single();
      if (!error && data) return data as Product;
    }
    return null;
  },

  async deleteProduct(id: string): Promise<boolean> {
    if (isSupabaseConfigured() && supabase) {
      const { error } = await supabase.from('products').delete().eq('id', id);
      return !error;
    }
    return false;
  }
};
