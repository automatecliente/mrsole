import Link from 'next/link';
import { AtSign, MessageCircle } from 'lucide-react';
import { BRAND_NAME, WHATSAPP_NUMBER } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-white/70 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-bold text-brand-white mb-4">
              MR<span className="text-accent-gold">SOLE</span>
              <span className="text-sm font-body tracking-widest text-brand-white/40 ml-2">Outfit</span>
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              Camisaria masculina premium para homens que se vestem com presença e sofisticação.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-brand-white/10 hover:bg-accent-gold/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <AtSign size={18} />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-brand-white/10 hover:bg-green-600/30 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-brand-white uppercase tracking-wider mb-4 font-body">
              Navegação
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Home' },
                { href: '/colecao', label: 'Coleção' },
                { href: '/sobre', label: 'Sobre' },
                { href: '/guia-de-medidas', label: 'Guia de Medidas' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-accent-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-sm font-semibold text-brand-white uppercase tracking-wider mb-4 font-body">
              Informações
            </h4>
            <ul className="space-y-2.5">
              {[
                { href: '/trocas-e-entregas', label: 'Trocas e Entregas' },
                { href: '/privacidade', label: 'Política de Privacidade' },
                { href: '/meu-pedido', label: 'Meu Pedido' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-accent-gold transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-brand-white uppercase tracking-wider mb-4 font-body">
              Atendimento
            </h4>
            <p className="text-sm mb-3">
              Compra 100% assistida pelo WhatsApp. Nossa equipe ajuda você a escolher o tamanho, cor e modelo ideal.
            </p>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded text-sm font-semibold transition-colors"
            >
              <MessageCircle size={16} /> Falar com atendente
            </a>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-brand-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-brand-white/40">
          <p>© {new Date().getFullYear()} {BRAND_NAME}. Todos os direitos reservados.</p>
          <p>
            Pagamento e entrega confirmados pela atendente via WhatsApp.
          </p>
        </div>
      </div>
    </footer>
  );
}
