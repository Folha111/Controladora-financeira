import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { INVESTMENT_TYPES, type InvestmentTypeId } from '@/types';
import { formatCurrency } from '@/utils';

ChartJS.register(ArcElement, Tooltip, Legend);

interface InvestmentPieChartProps {
  data: Record<string, number>;
}

export function InvestmentPieChart({ data }: InvestmentPieChartProps) {
  const entries = Object.entries(data)
    .filter(([key]) => key in INVESTMENT_TYPES)
    .sort(([, a], [, b]) => b - a);

  if (entries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Investimentos por Tipo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
            Nenhum investimento registrado
          </div>
        </CardContent>
      </Card>
    );
  }

  const chartData = {
    labels: entries.map(([key]) => INVESTMENT_TYPES[key as InvestmentTypeId].label),
    datasets: [
      {
        data: entries.map(([, value]) => value),
        backgroundColor: entries.map(([key]) => INVESTMENT_TYPES[key as InvestmentTypeId].color),
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
        <CardTitle className="text-base">Investimentos por Tipo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Doughnut data={chartData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
}
