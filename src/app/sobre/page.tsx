import { Metadata } from 'next';
import Link from 'next/link';
import { Shirt, Users, Heart, Award, ArrowRight, MessageCircle } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Sobre a MRSOLE Outfit | Camisaria Masculina Premium',
  description: 'Conheça a MRSOLE Outfit: camisaria masculina premium com atendimento personalizado pelo WhatsApp.',
};

export default function SobrePage() {
  return (
    <div className="pt-24 md:pt-28 pb-16 bg-surface-primary">
      <div className="container-custom max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl text-brand-black mb-6">
          Sobre a <span className="text-accent-gold">MRSOLE Outfit</span>
        </h1>

        <div className="prose font-body text-brand-graphite/80 space-y-6">
          <p className="text-lg leading-relaxed">
            A <strong>MRSOLE Outfit</strong> nasceu com uma missão clara: oferecer camisas masculinas que combinam elegância, qualidade e praticidade — tudo com um atendimento personalizado que faz a diferença.
          </p>

          <p>
            Acreditamos que se vestir bem não precisa ser complicado. Por isso, criamos uma experiência de compra diferente: você navega pela nossa coleção, escolhe suas peças favoritas e finaliza com a ajuda de uma atendente real pelo WhatsApp. Sem formulários complexos, sem pagamento impessoal — só uma conversa direta para garantir que tudo chegue perfeito até você.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10 not-prose">
            {[
              { icon: Shirt, title: 'Curadoria Premium', desc: 'Cada peça é selecionada com critérios rigorosos de qualidade, caimento e versatilidade.' },
              { icon: Users, title: 'Atendimento Humano', desc: 'Nossa equipe conhece cada produto e ajuda você a encontrar o tamanho e modelo ideal.' },
              { icon: Heart, title: 'Paixão por Moda Masculina', desc: 'Somos movidos pela vontade de ajudar homens a se vestirem com presença e confiança.' },
              { icon: Award, title: 'Qualidade Garantida', desc: 'Trabalhamos com tecidos premium e caimentos modernos que vestem bem de verdade.' },
            ].map(item => (
              <div key={item.title} className="bg-brand-sand/50 rounded-xl p-6">
                <item.icon size={28} className="text-accent-gold mb-3" />
                <h3 className="font-display text-base font-semibold text-brand-black mb-1">{item.title}</h3>
                <p className="text-sm text-brand-graphite/60 font-body">{item.desc}</p>
              </div>
            ))}
          </div>

          <p>
            Nossa coleção é pensada para o homem moderno: do escritório ao fim de semana, de eventos formais a momentos casuais. Camisas sociais, casuais, de linho, manga curta e combos inteligentes — tudo em um só lugar.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 not-prose">
            <Link href="/colecao" className="inline-flex items-center justify-center gap-2 bg-brand-black text-brand-white font-semibold px-6 py-3 rounded-lg transition-colors hover:bg-brand-charcoal">
              Ver coleção <ArrowRight size={16} />
            </Link>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border-2 border-green-600 text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-green-50 transition-colors">
              <MessageCircle size={16} /> Falar conosco
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
