import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloatingButton from '@/components/layout/WhatsAppFloatingButton';
import Toast from '@/components/shared/Toast';
import UTMCapture from '@/components/shared/UTMCapture';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MRSOLE Outfit | Camisaria Masculina Premium',
  description: 'Camisas masculinas elegantes, modernas e versáteis. Escolha seus modelos, monte seu pedido e finalize com atendimento personalizado pelo WhatsApp.',
  keywords: 'camisas masculinas, camisaria premium, camisa social, camisa casual, camisa linho, moda masculina',
  openGraph: {
    type: 'website',
    siteName: 'MRSOLE Outfit',
    locale: 'pt_BR',
    title: 'MRSOLE Outfit | Camisaria Masculina Premium',
    description: 'Camisas masculinas elegantes, modernas e versáteis. Escolha seus modelos, monte seu pedido e finalize com atendimento personalizado pelo WhatsApp.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-body antialiased" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        <UTMCapture />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <WhatsAppFloatingButton />
        <Toast />
      </body>
    </html>
  );
}
