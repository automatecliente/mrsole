import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidade | MRSOLE Outfit',
  description: 'Política de privacidade da MRSOLE Outfit. Saiba como tratamos seus dados pessoais.',
};

export default function PrivacidadePage() {
  return (
    <div className="pt-24 md:pt-28 pb-16 bg-surface-primary">
      <div className="container-custom max-w-3xl">
        <h1 className="font-display text-3xl md:text-4xl text-brand-black mb-8">
          Política de <span className="text-accent-gold">Privacidade</span>
        </h1>

        <div className="text-sm text-brand-graphite/70 font-body space-y-6">
          <p>Última atualização: Julho de 2026</p>

          <section>
            <h2 className="font-display text-lg font-semibold text-brand-black mb-2">1. Dados Coletados</h2>
            <p>Para processar seu pedido via WhatsApp, coletamos apenas as informações que você nos fornece voluntariamente:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Nome completo</li>
              <li>Número de WhatsApp</li>
              <li>Cidade e estado</li>
              <li>Preferência de entrega</li>
              <li>Itens do pedido (produtos, tamanhos, cores e quantidades)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-brand-black mb-2">2. Uso dos Dados</h2>
            <p>Seus dados são utilizados exclusivamente para:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Processar e confirmar seu pedido</li>
              <li>Entrar em contato sobre status de entrega</li>
              <li>Melhorar nossa experiência de atendimento</li>
              <li>Análise interna de campanhas de marketing (dados anonimizados)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-brand-black mb-2">3. Armazenamento</h2>
            <p>Os dados do seu pedido são armazenados de forma segura em nossos sistemas internos. Não compartilhamos seus dados pessoais com terceiros, exceto quando necessário para a entrega do produto (transportadoras).</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-brand-black mb-2">4. Cookies e Rastreamento</h2>
            <p>Utilizamos cookies e tecnologias de rastreamento (como Meta Pixel e Google Tag Manager) para medir a eficácia de nossas campanhas publicitárias. Esses dados são anônimos e não identificam você pessoalmente.</p>
            <p className="mt-2">O site também armazena dados no seu navegador (localStorage e sessionStorage) para:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Manter seu pedido salvo enquanto navega</li>
              <li>Registrar a origem da campanha publicitária que trouxe você</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-brand-black mb-2">5. Seus Direitos</h2>
            <p>Conforme a Lei Geral de Proteção de Dados (LGPD), você tem direito a:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Solicitar acesso aos seus dados pessoais</li>
              <li>Solicitar a correção de dados incorretos</li>
              <li>Solicitar a exclusão dos seus dados</li>
              <li>Revogar o consentimento para uso dos dados</li>
            </ul>
            <p className="mt-2">Para exercer qualquer desses direitos, entre em contato conosco pelo WhatsApp.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-brand-black mb-2">6. Segurança</h2>
            <p>Não coletamos dados sensíveis como números de cartão de crédito ou dados bancários pelo site. Todos os pagamentos são realizados diretamente com nossa atendente via WhatsApp, utilizando os meios de pagamento acordados entre as partes.</p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-brand-black mb-2">7. Contato</h2>
            <p>Para dúvidas sobre privacidade, entre em contato pelo WhatsApp ou envie um e-mail para nosso suporte.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
