'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        // Redireciona e força recarregamento para que o middleware capte o novo cookie
        window.location.href = '/admin';
      } else {
        const data = await res.json();
        setError(data.error || 'Falha na autenticação');
      }
    } catch (err) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-black flex flex-col justify-center items-center p-4 font-body text-brand-white">
      <Link href="/" className="absolute top-8 left-8 text-brand-white/50 hover:text-accent-gold transition-colors">
        &larr; Voltar para a loja
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-brand-charcoal border border-brand-white/10 rounded-2xl shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-accent-gold/10 rounded-full flex items-center justify-center mb-4 border border-accent-gold/30">
            <Lock className="text-accent-gold" size={28} />
          </div>
          <h1 className="font-display text-3xl font-bold">MRSOLE Outfit</h1>
          <p className="text-brand-white/50 text-sm mt-1">Acesso Restrito ao Painel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="p-3 bg-status-error/10 border border-status-error/30 rounded text-status-error text-sm text-center">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-xs font-semibold text-brand-white/70 uppercase tracking-wider mb-2">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-brand-black border border-brand-white/20 rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-accent-gold transition-colors"
              placeholder="admin@mrsole.com.br"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-brand-white/70 uppercase tracking-wider mb-2">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-brand-black border border-brand-white/20 rounded-lg px-4 py-3 text-brand-white focus:outline-none focus:border-accent-gold transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent-gold text-brand-black font-bold py-3.5 rounded-lg flex justify-center items-center gap-2 hover:bg-accent-gold-light transition-all disabled:opacity-70 mt-4"
          >
            {isLoading ? 'Autenticando...' : 'Entrar no Painel'}
            {!isLoading && <ArrowRight size={18} />}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
