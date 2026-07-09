export interface Testimonial {
  id: string;
  name: string;
  city: string;
  text: string;
  rating: number;
  productName?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Rafael M.',
    city: 'São Paulo, SP',
    text: 'Comprei a camisa social branca e o caimento é perfeito. Parece sob medida! O atendimento pelo WhatsApp foi muito atencioso. Já estou de olho nas próximas.',
    rating: 5,
    productName: 'Camisa Social Branca Classic',
  },
  {
    id: 'test-2',
    name: 'Lucas T.',
    city: 'Recife, PE',
    text: 'As camisas de linho são incríveis. Qualidade excelente, frescas e com um estilo que recebi muitos elogios. A equipe ajudou na escolha do tamanho certinho.',
    rating: 5,
    productName: 'Camisa Casual Linho Areia',
  },
  {
    id: 'test-3',
    name: 'André C.',
    city: 'Belo Horizonte, MG',
    text: 'Comprei o combo de 3 camisas e não me arrependo. Economia boa e as peças são muito versáteis. Uso no trabalho e nos finais de semana.',
    rating: 5,
    productName: 'Combo Essencial — 3 Camisas',
  },
  {
    id: 'test-4',
    name: 'Pedro H.',
    city: 'Rio de Janeiro, RJ',
    text: 'Experiência de compra muito diferente e positiva. A atendente ajudou com tudo: tamanho, cor e até sugestão de looks. Muito melhor que comprar sozinho em loja online.',
    rating: 5,
  },
  {
    id: 'test-5',
    name: 'Gustavo R.',
    city: 'Curitiba, PR',
    text: 'Estava procurando uma camisa para meu casamento civil e encontrei aqui. Qualidade impecável e chegou rápido. Nota 10!',
    rating: 5,
    productName: 'Camisa Social Azul Marinho Executive',
  },
  {
    id: 'test-6',
    name: 'Marcos V.',
    city: 'Salvador, BA',
    text: 'Achei que seria difícil comprar camisa online, mas o guia de medidas e o atendimento pelo WhatsApp tornaram tudo simples. Caimento perfeito logo de primeira.',
    rating: 4,
  },
];
