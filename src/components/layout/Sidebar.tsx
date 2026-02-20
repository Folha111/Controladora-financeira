import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  ArrowLeftRight,
  RefreshCw,
  TrendingUp,
  Wallet,
  Target,
  FileBarChart,
  Newspaper,
  Settings,
  LogOut,
  HeartPulse,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/authStore';

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/transacoes', label: 'Transações', icon: ArrowLeftRight },
  { to: '/recorrentes', label: 'Recorrências', icon: RefreshCw },
  { to: '/investimentos', label: 'Investimentos', icon: TrendingUp },
  { to: '/orcamentos', label: 'Orçamentos', icon: Wallet },
  { to: '/metas', label: 'Metas', icon: Target },
  { to: '/saude-financeira', label: 'Saúde Financeira', icon: HeartPulse },
  { to: '/relatorios', label: 'Relatórios', icon: FileBarChart },
  { to: '/noticias', label: 'Notícias', icon: Newspaper },
  { to: '/configuracoes', label: 'Configurações', icon: Settings },
];

export function Sidebar() {
  const logout = useAuthStore((s) => s.logout);

  return (
    <aside className="bg-card hidden h-screen w-64 flex-col border-r md:flex">
      <div className="flex h-14 items-center border-b px-6">
        <Wallet className="mr-2 h-6 w-6 text-emerald-600" />
        <span className="text-lg font-bold">Monetix</span>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )
            }
          >
            <link.icon className="h-4 w-4" />
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t p-3">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}

export { links };
