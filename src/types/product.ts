export interface ColorOption {
  name: string;
  hex: string;
  image?: string;
}

export type SleeveType = 'curta' | 'longa';
export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock';
export type ProductCategory =
  | 'social'
  | 'casual'
  | 'linho'
  | 'manga-longa'
  | 'manga-curta'
  | 'combo'
  | 'lancamento';

export interface Product {
  id: string;
  slug: string;
  name: string;
  short_description: string;
  full_description: string;
  price: number;
  promotional_price?: number;
  category: ProductCategory;
  images: string[];
  sizes: string[];
  colors: ColorOption[];
  fabric?: string;
  fit?: string;
  sleeve_type: SleeveType;
  stock_status: StockStatus;
  tags: string[];
  is_featured: boolean;
  is_new: boolean;
  is_best_seller: boolean;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProductFilters {
  category?: ProductCategory[];
  sizes?: string[];
  colors?: string[];
  priceRange?: { min: number; max: number };
  sleeveType?: SleeveType[];
  fabric?: string[];
  stockStatus?: StockStatus[];
  isBestSeller?: boolean;
  isNew?: boolean;
  sortBy?: 'newest' | 'price_asc' | 'price_desc' | 'best_sellers' | 'recommended';
  search?: string;
}
