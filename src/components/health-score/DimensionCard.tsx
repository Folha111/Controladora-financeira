import { PiggyBank, Wallet, TrendingUp, Shield, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { DimensionScore } from '@/utils/healthScore';

const STATUS_COLORS: Record<DimensionScore['status'], string> = {
  excellent: '#22c55e',
  good: '#84cc16',
  regular: '#eab308',
  warning: '#f97316',
  critical: '#ef4444',
};

const ICONS: Record<string, React.FC<{ className?: string; style?: React.CSSProperties }>> = {
  savings: PiggyBank,
  budget: Wallet,
  investment: TrendingUp,
  reserve: Shield,
  goals: Target,
};

interface DimensionCardProps {
  dimension: DimensionScore;
}

export function DimensionCard({ dimension }: DimensionCardProps) {
  const color = STATUS_COLORS[dimension.status];
  const Icon = ICONS[dimension.id];
  const pct = Math.min(100, (dimension.score / dimension.weight) * 100);

  return (
    <Card>
      <CardContent className="pt-4 pb-4">
        <div className="flex items-start gap-3">
          <div
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: `${color}20` }}
          >
            <Icon className="h-4 w-4" style={{ color }} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm font-semibold">{dimension.label}</span>
              <span className="shrink-0 text-sm font-bold tabular-nums" style={{ color }}>
                {dimension.score}/{dimension.weight}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">{dimension.detail}</p>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${pct}%`, backgroundColor: color }}
              />
            </div>
            {dimension.recommendation && (
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                {dimension.recommendation}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
