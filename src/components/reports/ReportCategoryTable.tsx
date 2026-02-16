import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EXPENSE_CATEGORIES, type ExpenseCategoryId } from '@/types';
import { formatCurrency } from '@/utils';

interface ReportCategoryTableProps {
  data: Record<string, number>;
  total: number;
}

export function ReportCategoryTable({ data, total }: ReportCategoryTableProps) {
  const sorted = Object.entries(data)
    .filter(([key]) => key in EXPENSE_CATEGORIES)
    .sort(([, a], [, b]) => b - a);

  if (sorted.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Despesas por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {sorted.map(([key, value]) => {
            const cat = EXPENSE_CATEGORIES[key as ExpenseCategoryId];
            const pct = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
            return (
              <div key={key} className="flex items-center gap-3">
                <div
                  className="h-3 w-3 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
                <div className="flex-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{cat.label}</span>
                    <span>{formatCurrency(value)}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full rounded-full bg-muted">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: cat.color,
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
