import { useNavigate } from 'react-router-dom';
import {
  Wallet,
  LayoutDashboard,
  ArrowLeftRight,
  RefreshCw,
  TrendingUp,
  Target,
  FileBarChart,
  Newspaper,
  HeartPulse,
  ArrowLeft,
  LogIn,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: LayoutDashboard,
    title: 'Dashboard',
    description:
      'Painel com resumo completo das suas finanças. Veja receitas, despesas, saldo e gráficos de evolução mensal em um só lugar.',
    highlights: ['Gráficos interativos', 'Resumo mensal', 'Transações recentes'],
    color: 'emerald',
  },
  {
    icon: ArrowLeftRight,
    title: 'Transações',
    description:
      'Registre e categorize todas as suas entradas e saídas. Filtre por data, tipo, categoria e muito mais.',
    highlights: ['Categorias personalizadas', 'Filtros avançados', 'Histórico completo'],
    color: 'blue',
  },
  {
    icon: RefreshCw,
    title: 'Recorrências',
    description:
      'Cadastre despesas e receitas fixas que se repetem todo mês, como aluguel, salário e assinaturas.',
    highlights: ['Lançamento automático', 'Controle de parcelas', 'Alertas de vencimento'],
    color: 'violet',
  },
  {
    icon: TrendingUp,
    title: 'Investimentos',
    description:
      'Acompanhe toda a sua carteira de investimentos — renda fixa, variável, fundos e mais. Veja o desempenho em tempo real.',
    highlights: ['Carteira consolidada', 'Rentabilidade', 'Diversificação'],
    color: 'amber',
  },
  {
    icon: Wallet,
    title: 'Orçamentos',
    description:
      'Defina limites de gastos por categoria e receba alertas quando estiver próximo do limite mensal.',
    highlights: ['Limites por categoria', 'Alertas de estouro', 'Progresso visual'],
    color: 'rose',
  },
  {
    icon: Target,
    title: 'Metas',
    description:
      'Crie objetivos financeiros — viagem, reserva de emergência, imóvel — e acompanhe o progresso até realizá-los.',
    highlights: ['Objetivos personalizados', 'Prazo e valor-alvo', 'Acompanhamento visual'],
    color: 'teal',
  },
  {
    icon: HeartPulse,
    title: 'Saúde Financeira',
    description:
      'Receba um score calculado com base nos seus hábitos financeiros e veja recomendações para melhorar.',
    highlights: ['Score 0–100', 'Dimensões avaliadas', 'Dicas personalizadas'],
    color: 'pink',
  },
  {
    icon: FileBarChart,
    title: 'Relatórios',
    description:
      'Gere relatórios detalhados de gastos, receitas e investimentos. Exporte em PDF ou CSV para controle externo.',
    highlights: ['Exportação PDF e CSV', 'Análise por período', 'Gráficos de tendência'],
    color: 'indigo',
  },
  {
    icon: Newspaper,
    title: 'Notícias',
    description:
      'Fique por dentro do mercado financeiro com notícias e atualizações relevantes para seus investimentos.',
    highlights: ['Atualizações do mercado', 'Curadoria financeira', 'Leitura rápida'],
    color: 'orange',
  },
];

const colorMap: Record<string, { bg: string; border: string; icon: string; badge: string; dot: string }> = {
  emerald: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
    border: 'border-emerald-100 dark:border-emerald-900/50',
    icon: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300',
    dot: 'bg-emerald-500',
  },
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    border: 'border-blue-100 dark:border-blue-900/50',
    icon: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300',
    dot: 'bg-blue-500',
  },
  violet: {
    bg: 'bg-violet-50 dark:bg-violet-950/30',
    border: 'border-violet-100 dark:border-violet-900/50',
    icon: 'bg-violet-100 dark:bg-violet-900/50 text-violet-600 dark:text-violet-400',
    badge: 'bg-violet-100 dark:bg-violet-900/60 text-violet-700 dark:text-violet-300',
    dot: 'bg-violet-500',
  },
  amber: {
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    border: 'border-amber-100 dark:border-amber-900/50',
    icon: 'bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400',
    badge: 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300',
    dot: 'bg-amber-500',
  },
  rose: {
    bg: 'bg-rose-50 dark:bg-rose-950/30',
    border: 'border-rose-100 dark:border-rose-900/50',
    icon: 'bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400',
    badge: 'bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300',
    dot: 'bg-rose-500',
  },
  teal: {
    bg: 'bg-teal-50 dark:bg-teal-950/30',
    border: 'border-teal-100 dark:border-teal-900/50',
    icon: 'bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400',
    badge: 'bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300',
    dot: 'bg-teal-500',
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-950/30',
    border: 'border-pink-100 dark:border-pink-900/50',
    icon: 'bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400',
    badge: 'bg-pink-100 dark:bg-pink-900/60 text-pink-700 dark:text-pink-300',
    dot: 'bg-pink-500',
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-950/30',
    border: 'border-indigo-100 dark:border-indigo-900/50',
    icon: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400',
    badge: 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300',
    dot: 'bg-indigo-500',
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-950/30',
    border: 'border-orange-100 dark:border-orange-900/50',
    icon: 'bg-orange-100 dark:bg-orange-900/50 text-orange-600 dark:text-orange-400',
    badge: 'bg-orange-100 dark:bg-orange-900/60 text-orange-700 dark:text-orange-300',
    dot: 'bg-orange-500',
  },
};

const pillars = [
  { icon: Zap, title: 'Rápido', description: 'Interface ágil para uso diário sem fricção' },
  { icon: ShieldCheck, title: 'Seguro', description: 'Seus dados ficam apenas no seu dispositivo' },
  { icon: Sparkles, title: 'Inteligente', description: 'Score e insights para decisões melhores' },
];

export function FeaturesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* ── Navbar ────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950 p-2 border border-emerald-100 dark:border-emerald-800">
              <Wallet className="h-5 w-5 text-emerald-600" />
            </div>
            <span className="text-lg font-bold tracking-tight">FLUXOR</span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/login')}
              className="gap-2 text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <Button
              size="sm"
              onClick={() => navigate('/login')}
              className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
            >
              <LogIn className="h-4 w-4" />
              Entrar
            </Button>
          </div>
        </div>
      </header>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border/40">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl" />
          <div className="absolute -top-10 right-0 w-72 h-72 bg-teal-400/8 rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-6 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-full">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
              Tudo que você precisa em um só app
            </span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight leading-tight mb-5">
            Conheça o{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
              FLUXOR
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed mb-10">
            Uma plataforma completa para gerenciar suas finanças pessoais — do controle diário de gastos
            até o planejamento de longo prazo.
          </p>

          {/* Pillars */}
          <div className="inline-grid grid-cols-3 gap-4 text-left">
            {pillars.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="flex items-start gap-3 p-4 bg-card border border-border/60 rounded-2xl shadow-sm"
              >
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-lg border border-emerald-100 dark:border-emerald-900">
                  <Icon className="h-4 w-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature count ────────────────────────────────── */}
      <section className="border-b border-border/40 bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-6 flex items-center justify-center gap-10">
          {[
            { value: '9', label: 'módulos completos' },
            { value: '100%', label: 'gratuito' },
            { value: '0', label: 'dados enviados à nuvem' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-emerald-600">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features grid ────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-3">Funcionalidades</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Cada módulo foi pensado para cobrir um aspecto importante da sua saúde financeira.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature) => {
            const c = colorMap[feature.color];
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`flex flex-col gap-4 p-5 rounded-2xl border transition-shadow hover:shadow-md ${c.bg} ${c.border}`}
              >
                {/* Icon + title */}
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${c.icon}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-base">{feature.title}</h3>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {feature.description}
                </p>

                {/* Highlights */}
                <div className="flex flex-wrap gap-1.5">
                  {feature.highlights.map((h) => (
                    <span
                      key={h}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${c.badge}`}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA final ────────────────────────────────────── */}
      <section className="border-t border-border/40 bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 bg-emerald-400/15 border border-emerald-400/25 rounded-full">
            <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
            <span className="text-xs font-medium text-emerald-200">Pronto para começar?</span>
          </div>
          <h2 className="text-4xl font-bold mb-4 leading-tight">
            Tome o controle das suas finanças{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
              hoje mesmo.
            </span>
          </h2>
          <p className="text-emerald-100/70 max-w-md mx-auto mb-8">
            Acesse agora e comece a organizar sua vida financeira de forma simples e eficiente.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/login')}
            className="gap-2 bg-white text-emerald-900 hover:bg-emerald-50 font-semibold shadow-xl shadow-black/20 h-12 px-8 rounded-xl active:scale-[0.98] transition-all"
          >
            <LogIn className="h-5 w-5" />
            Acessar o FLUXOR
          </Button>
        </div>
      </section>
    </div>
  );
}
