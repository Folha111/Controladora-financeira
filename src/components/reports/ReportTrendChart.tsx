import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils';
import type { Transaction } from '@/types';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface ReportTrendChartProps {
  transactions: Transaction[];
}

export function ReportTrendChart({ transactions }: ReportTrendChartProps) {
  const dailyMap = new Map<string, { income: number; expense: number }>();

  for (const t of transactions) {
    const entry = dailyMap.get(t.date) || { income: 0, expense: 0 };
    if (t.type === 'income') {
      entry.income += t.amountCents;
    } else {
      entry.expense += t.amountCents;
    }
    dailyMap.set(t.date, entry);
  }

  const sorted = Array.from(dailyMap.entries()).sort(([a], [b]) => a.localeCompare(b));

  if (sorted.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tendência do Período</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
            Nenhum dado disponível
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = {
    labels: sorted.map(([date]) => date.substring(5)),
    datasets: [
      {
        label: 'Receitas',
        data: sorted.map(([, d]) => d.income),
        backgroundColor: '#22c55e',
        borderRadius: 2,
      },
      {
        label: 'Despesas',
        data: sorted.map(([, d]) => d.expense),
        backgroundColor: '#ef4444',
        borderRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: { font: { size: 12 }, padding: 16 },
      },
      tooltip: {
        callbacks: {
          label: (ctx: { dataset: { label?: string }; raw: unknown }) =>
            `${ctx.dataset.label}: ${formatCurrency(Number(ctx.raw ?? 0))}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 12 } },
      },
      y: {
        grid: { color: '#e5e7eb' },
        ticks: {
          font: { size: 12 },
          callback: (value: string | number) => formatCurrency(Number(value)),
        },
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Tendência do Período</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Bar data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
