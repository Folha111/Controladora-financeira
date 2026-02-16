import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { INVESTMENT_TYPES, type InvestmentTypeId } from '@/types';
import { formatCurrency } from '@/utils';

interface ReportInvestmentTableProps {
  data: Record<string, number>;
  total: number;
}

export function ReportInvestmentTable({ data, total }: ReportInvestmentTableProps) {
  const sorted = Object.entries(data)
    .filter(([key]) => key in INVESTMENT_TYPES)
    .sort(([, a], [, b]) => b - a);

  if (sorted.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Investimentos por Tipo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sorted.map(([key, value]) => {
            const meta = INVESTMENT_TYPES[key as InvestmentTypeId];
            const pct = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
            return (
              <div key={key} className="flex items-center gap-3">
                <div
                  className="h-3 w-3 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: meta.color }}
                />
                <div className="flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{meta.label}</span>
                    <span>{formatCurrency(value)}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: meta.color,
                      }}
                    />
                  </div>
                </div>
                <span className="text-xs text-muted-foreground w-12 text-right">
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
