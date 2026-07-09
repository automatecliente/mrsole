import { Metadata } from 'next';
import { sizeGuide, measurementInstructions } from '@/data/sizeGuide';
import { MICROCOPY, WHATSAPP_NUMBER } from '@/lib/constants';
import { MessageCircle, Ruler } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Guia de Medidas | MRSOLE Outfit',
  description: 'Encontre o tamanho perfeito para suas camisas masculinas MRSOLE Outfit. Tabela de medidas e instruções.',
};

export default function GuiaDeMedidasPage() {
  return (
    <div className="pt-24 md:pt-28 pb-16 bg-surface-primary">
      <div className="container-custom max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <Ruler size={28} className="text-accent-gold" />
          <h1 className="font-display text-3xl md:text-4xl text-brand-black">
            Guia de <span className="text-accent-gold">Medidas</span>
          </h1>
        </div>

        <p className="text-brand-graphite/70 font-body mb-8 text-lg">
          Use esta tabela como referência para escolher o melhor tamanho. Em caso de dúvida, nossa equipe ajuda você pelo WhatsApp.
        </p>

        {/* Size Table */}
        <div className="bg-surface-elevated rounded-xl border border-brand-graphite/10 overflow-hidden mb-10">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="bg-brand-black text-brand-white">
                <th className="py-4 px-4 text-left font-semibold">Tamanho</th>
                <th className="py-4 px-4 text-center font-semibold">Tórax</th>
                <th className="py-4 px-4 text-center font-semibold">Ombro</th>
                <th className="py-4 px-4 text-center font-semibold">Comprimento</th>
                <th className="py-4 px-4 text-center font-semibold">Manga</th>
              </tr>
            </thead>
            <tbody>
              {sizeGuide.map((s, i) => (
                <tr key={s.size} className={i % 2 === 0 ? 'bg-brand-sand/30' : ''}>
                  <td className="py-3.5 px-4 font-bold text-brand-black">{s.size}</td>
                  <td className="py-3.5 px-4 text-center">{s.chest}</td>
                  <td className="py-3.5 px-4 text-center">{s.shoulder}</td>
                  <td className="py-3.5 px-4 text-center">{s.length}</td>
                  <td className="py-3.5 px-4 text-center">{s.sleeve}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* How to measure */}
        <h2 className="font-display text-2xl text-brand-black mb-6">Como medir</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {measurementInstructions.map(m => (
            <div key={m.label} className="bg-brand-sand/50 rounded-xl p-5">
              <h3 className="font-display text-base font-semibold text-brand-black mb-1">{m.label}</h3>
              <p className="text-sm text-brand-graphite/60 font-body">{m.instruction}</p>
            </div>
          ))}
        </div>

        {/* Help */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
          <p className="text-sm text-green-800 font-body mb-4">
            {MICROCOPY.SIZE_HELP}
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Preciso de ajuda para escolher o tamanho ideal da camisa.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <MessageCircle size={16} /> Pedir ajuda com tamanho
          </a>
        </div>
      </div>
    </div>
  );
}
