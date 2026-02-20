import { useState } from 'react';
import {
  Wallet,
  TrendingUp,
  Shield,
  Eye,
  EyeOff,
  ArrowRight,
  Target,
  BarChart3,
  Sparkles,
  Lock,
  User,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuthStore } from '@/store/authStore';

const stats = [
  { label: 'Economia este mês', value: 'R$ 1.240', trend: '+12%' },
  { label: 'Patrimônio total', value: 'R$ 45.800', trend: '+8,3%' },
  { label: 'Metas concluídas', value: '3 de 5', trend: '60%' },
];

const features = [
  { icon: TrendingUp, text: 'Acompanhe investimentos em tempo real' },
  { icon: Target, text: 'Defina e alcance suas metas financeiras' },
  { icon: BarChart3, text: 'Relatórios detalhados de gastos' },
  { icon: Shield, text: 'Seus dados protegidos e seguros' },
];

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((s) => s.login);
  const error = useAuthStore((s) => s.error);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login(username, password);
  }

  return (
    <div className="flex min-h-screen">
      {/* ── Left decorative panel ─────────────────────────── */}
      <div className="hidden lg:flex lg:w-[55%] relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900">
        {/* Dot-grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Decorative blobs */}
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-emerald-400/20 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-teal-500/20 blur-3xl animate-pulse"
          style={{ animationDelay: '1.5s' }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-emerald-300/10 blur-2xl animate-pulse"
          style={{ animationDelay: '0.8s' }}
        />

        <div className="relative z-10 flex flex-col justify-between p-14 w-full">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 shadow-lg shadow-black/20">
              <Wallet className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">Monetix</span>
          </div>

          {/* Hero text */}
          <div className="space-y-10">
            <div className="space-y-5">
              <div className="flex items-center gap-2 w-fit px-3 py-1.5 bg-emerald-400/15 border border-emerald-400/25 rounded-full">
                <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
                <span className="text-xs font-medium text-emerald-200 tracking-wide uppercase">
                  Controle financeiro inteligente
                </span>
              </div>
              <h2 className="text-5xl font-bold text-white leading-tight">
                Sua vida financeira,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
                  simplificada.
                </span>
              </h2>
              <p className="text-emerald-100/70 text-base leading-relaxed max-w-sm">
                Gerencie receitas, despesas, investimentos e metas financeiras em um único lugar, com clareza e segurança.
              </p>
            </div>

            {/* Feature list */}
            <div className="grid grid-cols-1 gap-3">
              {features.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 group">
                  <div className="p-1.5 bg-emerald-400/15 border border-emerald-400/20 rounded-lg group-hover:bg-emerald-400/25 transition-colors">
                    <Icon className="h-4 w-4 text-emerald-300" />
                  </div>
                  <span className="text-emerald-100/80 text-sm">{text}</span>
                </div>
              ))}
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-3 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-1 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-colors"
                >
                  <p className="text-[11px] text-emerald-200/60 leading-tight">{stat.label}</p>
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <span className="text-xs font-semibold text-emerald-300 bg-emerald-400/15 w-fit px-2 py-0.5 rounded-full">
                    {stat.trend}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-emerald-200/30 text-xs">
            © 2024 Monetix · Todos os direitos reservados
          </p>
        </div>
      </div>

      {/* ── Right form panel ──────────────────────────────── */}
      <div className="flex w-full lg:w-[45%] items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-[400px] space-y-8">

          {/* Mobile logo */}
          <div className="flex lg:hidden items-center justify-center gap-3">
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950 rounded-2xl border border-emerald-100 dark:border-emerald-800">
              <Wallet className="h-7 w-7 text-emerald-600" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Monetix</span>
          </div>

          {/* Header */}
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tight">Bem-vindo de volta</h1>
            <p className="text-muted-foreground text-sm">
              Entre com suas credenciais para acessar sua conta
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">
                Usuário
              </Label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="username"
                  placeholder="Digite seu usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                  className="pl-10 h-12 rounded-xl border-border/80 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-11 h-12 rounded-xl border-border/80 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2.5 p-3.5 bg-destructive/10 border border-destructive/20 rounded-xl">
                <div className="h-2 w-2 rounded-full bg-destructive flex-shrink-0" />
                <p className="text-sm text-destructive font-medium">{error}</p>
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold gap-2 transition-all shadow-lg shadow-emerald-600/25 hover:shadow-emerald-700/30"
            >
              Entrar na conta
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">credenciais de acesso</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Credentials hint */}
          <div className="p-4 bg-muted/40 rounded-2xl border border-border/60">
            <p className="text-xs text-muted-foreground text-center leading-relaxed">
              Use{' '}
              <code className="px-1.5 py-0.5 bg-background border border-border rounded-md font-mono text-[11px] text-foreground">
                admin
              </code>{' '}
              como usuário e{' '}
              <code className="px-1.5 py-0.5 bg-background border border-border rounded-md font-mono text-[11px] text-foreground">
                123
              </code>{' '}
              como senha para entrar
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
