import { Product, ProductFilters, CartItem } from '@/types';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    if (!isSupabaseConfigured() || !supabase) return [];
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (!error && data) return data as Product[];
    return [];
  },

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    if (!isSupabaseConfigured() || !supabase) return undefined;
    const { data, error } = await supabase.from('products').select('*').eq('slug', slug).single();
    if (!error && data) return data as Product;
    return undefined;
  },

  async getFeaturedProducts(): Promise<Product[]> {
    if (!isSupabaseConfigured() || !supabase) return [];
    const { data, error } = await supabase.from('products').select('*').eq('is_featured', true).eq('active', true);
    if (!error && data) return data as Product[];
    return [];
  },

  async getBestSellers(): Promise<Product[]> {
    if (!isSupabaseConfigured() || !supabase) return [];
    const { data, error } = await supabase.from('products').select('*').eq('is_best_seller', true).eq('active', true);
    if (!error && data) return data as Product[];
    return [];
  },

  async getNewProducts(): Promise<Product[]> {
    if (!isSupabaseConfigured() || !supabase) return [];
    const { data, error } = await supabase.from('products').select('*').eq('is_new', true).eq('active', true);
    if (!error && data) return data as Product[];
    return [];
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    if (!isSupabaseConfigured() || !supabase) return [];
    const { data, error } = await supabase.from('products').select('*').eq('category', category).eq('active', true);
    if (!error && data) return data as Product[];
    return [];
  },

  async getRelatedProducts(productId: string, limit = 4): Promise<Product[]> {
    if (!isSupabaseConfigured() || !supabase) return [];
    
    // First, fetch the current product to know its category
    const { data: current, error: currentErr } = await supabase.from('products').select('category').eq('id', productId).single();
    if (currentErr || !current) return [];

    const { data, error } = await supabase.from('products')
      .select('*')
      .eq('category', current.category)
      .neq('id', productId)
      .eq('active', true)
      .limit(limit);

    if (!error && data) return data as Product[];
    return [];
  },

  async getUpsellProducts(cartItems: CartItem[]): Promise<Product[]> {
    if (!isSupabaseConfigured() || !supabase) return [];
    
    if (cartItems.length === 0) {
       return this.getFeaturedProducts().then(res => res.slice(0, 3));
    }

    const cartCategories = [...new Set(cartItems.map((i) => i.product.category))];
    const cartIds = cartItems.map((i) => i.product.id);

    const complementary: string[] = [];
    if (cartCategories.includes('social')) complementary.push('casual', 'linho');
    if (cartCategories.includes('casual')) complementary.push('social', 'linho');
    if (!cartCategories.includes('combo')) complementary.push('combo');

    let query = supabase.from('products').select('*').eq('active', true);
    
    // Se tiver categorias complementares, priorizamos elas ou best sellers, 
    // mas devido à limitação do PostgREST para queries OR complexas de array, 
    // faremos uma filtragem local complementar dos resultados ativos
    const { data, error } = await query;
    if (error || !data) return [];

    let allProducts = data as Product[];
    
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
    if (!isSupabaseConfigured() || !supabase) return [];
    
    let query = supabase.from('products').select('*').eq('active', true);

    if (filters.search) {
      // Usando ilike para buscar em name ou short_description
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

    // Sort mappings
    switch (filters.sortBy) {
      case 'price_asc':
        query = query.order('price', { ascending: true }); // Aproximação, já que tem promotional_price
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
        // Ordem padrão, misturando best seller e created_at
        query = query.order('is_best_seller', { ascending: false }).order('created_at', { ascending: false });
    }

    const { data, error } = await query;
    if (error || !data) return [];

    let result = data as Product[];

    // Arrays no jsonb de sizes/colors/fabric são difíceis de filtrar diretamente no RPC simples do Supabase sem configurações extras.
    // Como a base de produtos não costuma ser gigante no front, aplicamos o refinamento de json em memória aqui:
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
