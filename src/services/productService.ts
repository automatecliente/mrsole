import { Product, ProductFilters, CartItem } from '@/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { mockProducts } from '@/data/mockProducts';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    if (!isSupabaseConfigured() || !supabase) return mockProducts;
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (!error && data && data.length > 0) return data as Product[];
    return mockProducts;
  },

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    if (!isSupabaseConfigured() || !supabase) {
      return mockProducts.find((p) => p.slug === slug);
    }
    const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
    if (!error && data) return data as Product;
    return mockProducts.find((p) => p.slug === slug);
  },

  async getFeaturedProducts(): Promise<Product[]> {
    if (!isSupabaseConfigured() || !supabase) {
      return mockProducts.filter((p) => p.is_featured && p.active);
    }
    const { data, error } = await supabase.from('products').select('*').eq('is_featured', true).eq('active', true);
    if (!error && data && data.length > 0) return data as Product[];
    return mockProducts.filter((p) => p.is_featured && p.active);
  },

  async getBestSellers(): Promise<Product[]> {
    if (!isSupabaseConfigured() || !supabase) {
      return mockProducts.filter((p) => p.is_best_seller && p.active);
    }
    const { data, error } = await supabase.from('products').select('*').eq('is_best_seller', true).eq('active', true);
    if (!error && data && data.length > 0) return data as Product[];
    return mockProducts.filter((p) => p.is_best_seller && p.active);
  },

  async getNewProducts(): Promise<Product[]> {
    if (!isSupabaseConfigured() || !supabase) {
      return mockProducts.filter((p) => p.is_new && p.active);
    }
    const { data, error } = await supabase.from('products').select('*').eq('is_new', true).eq('active', true);
    if (!error && data && data.length > 0) return data as Product[];
    return mockProducts.filter((p) => p.is_new && p.active);
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    if (!isSupabaseConfigured() || !supabase) {
      return mockProducts.filter((p) => p.category === category && p.active);
    }
    const { data, error } = await supabase.from('products').select('*').eq('category', category).eq('active', true);
    if (!error && data && data.length > 0) return data as Product[];
    return mockProducts.filter((p) => p.category === category && p.active);
  },

  async getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
    if (!isSupabaseConfigured() || !supabase) {
      const current = mockProducts.find((p) => p.id === productId);
      const cat = current?.category || 'casual';
      return mockProducts.filter((p) => p.category === cat && p.id !== productId && p.active).slice(0, limit);
    }
    
    // First, fetch the current product to know its category
    const { data: current, error: currentErr } = await supabase.from('products').select('category').eq('id', productId).single();
    if (currentErr || !current) {
      const fallbackCurrent = mockProducts.find((p) => p.id === productId);
      const cat = fallbackCurrent?.category || 'casual';
      return mockProducts.filter((p) => p.category === cat && p.id !== productId && p.active).slice(0, limit);
    }

    const { data, error } = await supabase.from('products')
      .select('*')
      .eq('category', current.category)
      .neq('id', productId)
      .eq('active', true)
      .limit(limit);

    if (!error && data && data.length > 0) return data as Product[];
    return mockProducts.filter((p) => p.category === current.category && p.id !== productId && p.active).slice(0, limit);
  },

  async getUpsellProducts(cartItems: CartItem[]): Promise<Product[]> {
    let allProducts = mockProducts;

    if (isSupabaseConfigured() && supabase) {
      const { data, error } = await supabase.from('products').select('*').eq('active', true);
      if (!error && data && data.length > 0) {
        allProducts = data as Product[];
      }
    }
    
    if (cartItems.length === 0) {
      return allProducts.filter((p) => p.is_featured).slice(0, 3);
    }

    const cartCategories = [...new Set(cartItems.map((i) => i.product.category))];
    const cartIds = cartItems.map((i) => i.product.id);

    const complementary: string[] = [];
    if (cartCategories.includes('social')) complementary.push('casual', 'linho');
    if (cartCategories.includes('casual')) complementary.push('social', 'linho');
    if (!cartCategories.includes('combo')) complementary.push('combo');

    const suggestions = allProducts
      .filter(
        (p) =>
          !cartIds.includes(p.id) &&
          (complementary.includes(p.category) || p.is_best_seller)
      )
      .slice(0, 3);

    return suggestions.length > 0
      ? suggestions
      : allProducts.filter((p) => !cartIds.includes(p.id)).slice(0, 3);
  },

  async filterProducts(filters: ProductFilters): Promise<Product[]> {
    let result = mockProducts.filter((p) => p.active);

    if (isSupabaseConfigured() && supabase) {
      let query = supabase.from('products').select('*').eq('active', true);

      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,short_description.ilike.%${filters.search}%`);
      }
      if (filters.category && filters.category.length > 0) {
        query = query.in('category', filters.category);
      }
      if (filters.sleeveType && filters.sleeveType.length > 0) {
        query = query.in('sleeve_type', filters.sleeveType);
      }
      if (filters.isBestSeller) {
        query = query.eq('is_best_seller', true);
      }
      if (filters.isNew) {
        query = query.eq('is_new', true);
      }

      switch (filters.sortBy) {
        case 'price_asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price_desc':
          query = query.order('price', { ascending: false });
          break;
        case 'newest':
          query = query.order('created_at', { ascending: false });
          break;
        case 'best_sellers':
          query = query.order('is_best_seller', { ascending: false, nullsFirst: false });
          break;
        case 'recommended':
        default:
          query = query.order('is_best_seller', { ascending: false }).order('created_at', { ascending: false });
      }

      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        result = data as Product[];
      }
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.short_description.toLowerCase().includes(searchLower)
      );
    }

    if (filters.category && filters.category.length > 0) {
      result = result.filter((p) => filters.category!.includes(p.category));
    }

    if (filters.sleeveType && filters.sleeveType.length > 0) {
      result = result.filter((p) => filters.sleeveType!.includes(p.sleeve_type));
    }

    if (filters.isBestSeller) {
      result = result.filter((p) => p.is_best_seller);
    }

    if (filters.isNew) {
      result = result.filter((p) => p.is_new);
    }

    if (filters.sizes && filters.sizes.length > 0) {
      result = result.filter((p) => p.sizes.some((s) => filters.sizes!.includes(s)));
    }

    if (filters.colors && filters.colors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => filters.colors!.includes(c.name))
      );
    }

    if (filters.fabric && filters.fabric.length > 0) {
      result = result.filter((p) =>
        filters.fabric!.some((f) => p.fabric?.toLowerCase().includes(f.toLowerCase()))
      );
    }

    if (filters.priceRange) {
      result = result.filter((p) => {
        const price = p.promotional_price || p.price;
        return price >= filters.priceRange!.min && price <= filters.priceRange!.max;
      });
    }

    return result;
  },

  // Admin methods
  async createProduct(product: Partial<Product>): Promise<Product | null> {
    if (!isSupabaseConfigured() || !supabase) return null;
    const { data, error } = await supabase.from('products').insert(product).select().single();
    if (!error && data) return data as Product;
    return null;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    if (!isSupabaseConfigured() || !supabase) return null;
    const { data, error } = await supabase.from('products').update(updates).eq('id', id).select().single();
    if (!error && data) return data as Product;
    return null;
  },

  async deleteProduct(id: string): Promise<boolean> {
    if (!isSupabaseConfigured() || !supabase) return false;
    const { error } = await supabase.from('products').delete().eq('id', id);
    return !error;
  }
};
