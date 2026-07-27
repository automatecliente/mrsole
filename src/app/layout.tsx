import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import StoreLayoutProvider from '@/components/layout/StoreLayoutProvider';
import Toast from '@/components/shared/Toast';
import UTMCapture from '@/components/shared/UTMCapture';
import CustomCursor from '@/components/shared/CustomCursor';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
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
    <html lang="pt-BR" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-body antialiased" style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        <UTMCapture />
        <CustomCursor />
        <StoreLayoutProvider>
          {children}
        </StoreLayoutProvider>
        <Toast />
      </body>
    </html>
  );
}
