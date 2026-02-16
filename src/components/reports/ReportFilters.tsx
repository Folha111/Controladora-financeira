import { Button } from '@/components/ui/button';
import type { PeriodFilter } from '@/types';

interface ReportFiltersProps {
  period: PeriodFilter;
  onPeriodChange: (period: PeriodFilter) => void;
}

const periods: { value: PeriodFilter; label: string }[] = [
  { value: 'week', label: 'Semana' },
  { value: 'month', label: 'Mês' },
  { value: 'year', label: 'Ano' },
];

export function ReportFilters({ period, onPeriodChange }: ReportFiltersProps) {
  return (
    <div className="flex gap-2">
      {periods.map((p) => (
        <Button
          key={p.value}
          variant={period === p.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => onPeriodChange(p.value)}
        >
          {p.label}
        </Button>
      ))}
    </div>
  );
}
