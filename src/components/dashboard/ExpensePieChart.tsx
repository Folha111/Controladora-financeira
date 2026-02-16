import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EXPENSE_CATEGORIES, type ExpenseCategoryId } from '@/types';
import { formatCurrency } from '@/utils';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpensePieChartProps {
  data: Record<string, number>;
}

export function ExpensePieChart({ data }: ExpensePieChartProps) {
  const entries = Object.entries(data)
    .filter(([key]) => key in EXPENSE_CATEGORIES)
    .sort(([, a], [, b]) => b - a);

  if (entries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Despesas por Categoria</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
            Nenhuma despesa registrada
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = {
    labels: entries.map(([key]) => EXPENSE_CATEGORIES[key as ExpenseCategoryId].label),
    datasets: [
      {
        data: entries.map(([, value]) => value),
        backgroundColor: entries.map(([key]) => EXPENSE_CATEGORIES[key as ExpenseCategoryId].color),
        borderWidth: 0,
        spacing: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { font: { size: 12 }, padding: 16 },
      },
      tooltip: {
        callbacks: {
          label: (ctx: { label: string; raw: unknown }) =>
            `${ctx.label}: ${formatCurrency(Number(ctx.raw ?? 0))}`,
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Despesas por Categoria</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Doughnut data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
