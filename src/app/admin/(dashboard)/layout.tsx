'use client';

import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, Users, Package, Settings, LogOut } from 'lucide-react';
import { BRAND_NAME } from '@/lib/constants';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Pedidos', href: '/admin/pedidos', icon: ShoppingBag },
    { label: 'Carrinhos', href: '/admin/carrinhos-abandonados', icon: ShoppingBag },
    { label: 'Produtos', href: '/admin/produtos', icon: Package },
    { label: 'Leads', href: '/admin/leads', icon: Users },
    { label: 'Relatórios', href: '/admin/relatorios', icon: LayoutDashboard },
  ];

  return (
    <div className="min-h-screen bg-brand-sand/30 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface-primary border-r border-brand-graphite/10 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-brand-graphite/10">
          <Link href="/admin" className="font-display text-xl font-bold tracking-tight text-brand-black">
            {BRAND_NAME} <span className="text-accent-gold text-sm font-body font-normal">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-brand-graphite hover:text-brand-black hover:bg-brand-graphite/5 transition-colors"
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-brand-graphite/10 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-brand-graphite hover:text-brand-black hover:bg-brand-graphite/5 transition-colors">
            <Settings size={18} /> Ver Loja
          </Link>
          <button 
            onClick={async () => {
              await fetch('/api/auth/logout', { method: 'POST' });
              window.location.href = '/admin/login';
            }}
            className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-status-error hover:text-status-error hover:bg-status-error/5 transition-colors"
          >
            <LogOut size={18} /> Sair
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header className="md:hidden bg-surface-primary border-b border-brand-graphite/10 p-4 flex justify-between items-center">
          <Link href="/admin" className="font-display text-lg font-bold text-brand-black">
            Admin
          </Link>
        </header>

        <div className="flex-1 p-6 md:p-8 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
