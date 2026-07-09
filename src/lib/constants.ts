// === BRAND ===
export const BRAND_NAME = 'MRSOLE Outfit';
export const BRAND_TAGLINE = 'Camisaria Masculina Premium';
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5581999999999';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mrsoleoutfit.com.br';

// === DELIVERY OPTIONS ===
export const DELIVERY_OPTIONS = {
  home: 'Receber em casa',
  pickup: 'Retirar na loja',
  discuss: 'Combinar com atendente',
} as const;

// === BRAZILIAN STATES ===
export const BRAZILIAN_STATES = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO',
] as const;

// === MICROCOPY ===
export const MICROCOPY = {
  EMPTY_CART: 'Seu pedido ainda está vazio. Escolha suas camisas favoritas e finalize pelo WhatsApp com atendimento personalizado.',
  PRODUCT_ADDED: 'Produto adicionado ao seu pedido.',
  PRODUCT_REMOVED: 'Produto removido do pedido.',
  BEFORE_WHATSAPP: 'Você está quase lá. Envie seu pedido para nossa equipe confirmar disponibilidade, entrega e pagamento.',
  SIZE_HELP: 'Não sabe seu tamanho? Nossa equipe te ajuda pelo WhatsApp.',
  SHIPPING_INFO: 'O frete será confirmado pela atendente antes do pagamento.',
  PAYMENT_INFO: 'O pagamento será combinado diretamente com nossa equipe pelo WhatsApp.',
  SELECT_SIZE: 'Selecione o tamanho',
  SELECT_COLOR: 'Selecione a cor',
  ORDER_SENT: 'Seu pedido foi enviado para o WhatsApp. Nossa atendente vai continuar seu atendimento por lá.',
  STOCK_WARNING: 'Disponibilidade confirmada pela atendente.',
  SHIPPING_NOTE: 'Frete e disponibilidade serão confirmados pela atendente.',
} as const;

// === SORT OPTIONS ===
export const SORT_OPTIONS = [
  { value: 'recommended', label: 'Recomendados' },
  { value: 'newest', label: 'Mais recentes' },
  { value: 'price_asc', label: 'Menor preço' },
  { value: 'price_desc', label: 'Maior preço' },
  { value: 'best_sellers', label: 'Mais vendidos' },
] as const;

// === CATEGORY LABELS ===
export const CATEGORY_LABELS: Record<string, string> = {
  social: 'Camisas Sociais',
  casual: 'Camisas Casuais',
  linho: 'Camisas de Linho',
  'manga-longa': 'Manga Longa',
  'manga-curta': 'Manga Curta',
  combo: 'Combos',
  lancamento: 'Lançamentos',
};

// === SIZE ORDER ===
export const SIZE_ORDER = ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XXG'];

// === TRACKING ===
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || '';
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';
