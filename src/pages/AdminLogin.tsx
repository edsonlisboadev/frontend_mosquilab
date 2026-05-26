import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import Logo from '../components/Logo';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token } = await login(email, password);
      localStorage.setItem('jwt', token);
      navigate('/admin/dashboard');
    } catch {
      setError('Credenciais inválidas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #0d3318 0%, #1a5c2a 60%, #2d7a3a 100%)' }}
    >
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full opacity-5 border-2 border-green-light" />
      <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full opacity-5 border border-green-light" />

      <div
        className="relative w-full max-w-md rounded-3xl p-10 shadow-2xl"
        style={{ background: '#fff' }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo size={56} dark={true} />
        </div>

        <h1 className="font-bebas text-green-dark text-3xl tracking-widest text-center mb-1">
          Painel Administrativo
        </h1>
        <p className="font-body text-green-dark/50 text-sm text-center mb-8">
          Acesso restrito — credenciais necessárias
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-body font-700 text-green-dark text-sm block mb-2">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="admin@univille.br"
              className="w-full font-body rounded-xl px-4 py-3 text-green-dark border outline-none transition-all focus:ring-2"
              style={{
                background: '#f0ead6',
                border: '1.5px solid #6abf3e30',
                fontSize: '15px',
              }}
            />
          </div>

          <div>
            <label className="font-body font-700 text-green-dark text-sm block mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full font-body rounded-xl px-4 py-3 text-green-dark border outline-none transition-all focus:ring-2"
              style={{
                background: '#f0ead6',
                border: '1.5px solid #6abf3e30',
                fontSize: '15px',
              }}
            />
          </div>

          {error && (
            <div
              className="rounded-xl px-4 py-3 font-body text-sm"
              style={{ background: '#d32f2f10', color: '#d32f2f', border: '1px solid #d32f2f30' }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full font-bebas tracking-widest text-xl text-white rounded-xl px-4 py-4 transition-all duration-300 hover:opacity-90 hover:shadow-lg disabled:opacity-60"
            style={{ background: 'linear-gradient(135deg, #1a5c2a, #2d7a3a)' }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
