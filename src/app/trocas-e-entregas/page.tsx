import { Metadata } from 'next';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { MessageCircle, Package, RefreshCcw, Truck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Trocas e Entregas | MRSOLE Outfit',
  description: 'Política de trocas, entregas e atendimento da MRSOLE Outfit.',
};

export default function TrocasEEntregasPage() {
  return (
    <div className="pt-24 md:pt-28 pb-16 bg-surface-primary">
      <div className="container-custom max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl text-brand-black mb-8">
          Trocas e <span className="text-accent-gold">Entregas</span>
        </h1>

        <div className="space-y-10">
          {/* Delivery */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Truck size={24} className="text-accent-gold" />
              <h2 className="font-display text-xl font-semibold text-brand-black">Entregas</h2>
            </div>
            <div className="text-sm text-brand-graphite/70 font-body space-y-3 pl-9">
              <p>Realizamos entregas para todo o Brasil via Correios e transportadoras parceiras.</p>
              <p>O prazo e o valor do frete são confirmados pela atendente no momento do atendimento pelo WhatsApp, antes do pagamento.</p>
              <p>Após a confirmação do pagamento, o prazo estimado de entrega é de 3 a 10 dias úteis, dependendo da sua região.</p>
              <p>Você receberá o código de rastreamento assim que o pedido for enviado.</p>
            </div>
          </section>

          {/* Exchanges */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <RefreshCcw size={24} className="text-accent-gold" />
              <h2 className="font-display text-xl font-semibold text-brand-black">Trocas</h2>
            </div>
            <div className="text-sm text-brand-graphite/70 font-body space-y-3 pl-9">
              <p>Aceitamos trocas em até 7 dias após o recebimento do produto.</p>
              <p>O produto deve estar sem uso, com etiquetas e na embalagem original.</p>
              <p>Para solicitar uma troca, entre em contato pelo WhatsApp informando o código do pedido.</p>
              <p>O custo de envio da troca será combinado com a atendente.</p>
            </div>
          </section>

          {/* Returns */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <Package size={24} className="text-accent-gold" />
              <h2 className="font-display text-xl font-semibold text-brand-black">Devoluções</h2>
            </div>
            <div className="text-sm text-brand-graphite/70 font-body space-y-3 pl-9">
              <p>Se o produto apresentar defeito de fabricação, faremos a troca ou devolução sem custo adicional.</p>
              <p>Desistências devem ser comunicadas em até 7 dias corridos após o recebimento, conforme o Código de Defesa do Consumidor.</p>
              <p>O reembolso será realizado pela mesma forma de pagamento utilizada na compra.</p>
            </div>
          </section>

          {/* Contact */}
          <div className="bg-brand-sand/50 rounded-xl p-6 text-center mt-8">
            <p className="text-sm text-brand-graphite/70 font-body mb-4">
              Qualquer dúvida sobre trocas, entregas ou devoluções, fale com nossa equipe:
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Preciso de ajuda com uma troca/entrega.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <MessageCircle size={16} /> Falar sobre trocas/entregas
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
