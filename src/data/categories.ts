export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: 'cat-1',
    slug: 'social',
    name: 'Camisas Sociais',
    description: 'Elegância para ambientes profissionais e eventos formais.',
    image: '/images/categories/social.jpg',
    productCount: 4,
  },
  {
    id: 'cat-2',
    slug: 'casual',
    name: 'Camisas Casuais',
    description: 'Estilo descontraído com personalidade e conforto.',
    image: '/images/categories/casual.jpg',
    productCount: 3,
  },
  {
    id: 'cat-3',
    slug: 'linho',
    name: 'Camisas de Linho',
    description: 'Leveza e frescor para dias quentes com muito charme.',
    image: '/images/categories/linho.jpg',
    productCount: 2,
  },
  {
    id: 'cat-4',
    slug: 'manga-longa',
    name: 'Manga Longa',
    description: 'Clássicas e versáteis para todas as estações.',
    image: '/images/categories/manga-longa.jpg',
    productCount: 8,
  },
  {
    id: 'cat-5',
    slug: 'manga-curta',
    name: 'Manga Curta',
    description: 'Frescor e modernidade para os dias quentes.',
    image: '/images/categories/manga-curta.jpg',
    productCount: 2,
  },
  {
    id: 'cat-6',
    slug: 'combo',
    name: 'Combos',
    description: 'Monte seu guarda-roupa com economia e praticidade.',
    image: '/images/categories/combo.jpg',
    productCount: 1,
  },
  {
    id: 'cat-7',
    slug: 'lancamento',
    name: 'Lançamentos',
    description: 'As novidades mais recentes da MRSOLE Outfit.',
    image: '/images/categories/lancamento.jpg',
    productCount: 4,
  },
];

export interface Occasion {
  id: string;
  title: string;
  description: string;
  icon: string;
  filterCategory?: string;
  tags?: string[];
}

export const occasions: Occasion[] = [
  {
    id: 'occ-1',
    title: 'Para trabalhar',
    description: 'Camisas que transmitem autoridade e profissionalismo.',
    icon: 'Briefcase',
    filterCategory: 'social',
    tags: ['executiva', 'formal', 'escritório'],
  },
  {
    id: 'occ-2',
    title: 'Para sair à noite',
    description: 'Elegância para jantares, bares e encontros.',
    icon: 'Moon',
    tags: ['noite', 'elegante', 'moderno'],
  },
  {
    id: 'occ-3',
    title: 'Para eventos',
    description: 'Destaque-se em casamentos, formaturas e festas.',
    icon: 'PartyPopper',
    filterCategory: 'social',
    tags: ['evento', 'formal', 'tendência'],
  },
  {
    id: 'occ-4',
    title: 'Domingo casual',
    description: 'Conforto e estilo para os momentos de lazer.',
    icon: 'Sun',
    filterCategory: 'casual',
    tags: ['casual', 'fim de semana', 'conforto'],
  },
  {
    id: 'occ-5',
    title: 'Para presente',
    description: 'Surpreenda com uma camisa premium.',
    icon: 'Gift',
    tags: ['presente', 'kit', 'combo'],
  },
  {
    id: 'occ-6',
    title: 'Guarda-roupa inteligente',
    description: 'Peças essenciais que combinam entre si.',
    icon: 'LayoutGrid',
    filterCategory: 'combo',
    tags: ['essencial', 'combo', 'versátil'],
  },
];
