'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';
import WhatsAppFloatingButton from './WhatsAppFloatingButton';

export default function StoreLayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const isAdmin = pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Header />}
      <main className={isAdmin ? "" : "min-h-screen"}>{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppFloatingButton />}
    </>
  );
}
