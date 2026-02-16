import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign, LineChart } from 'lucide-react';
import { formatCurrency } from '@/utils';

interface SummaryCardsProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  totalInvested: number;
}

export function SummaryCards({
  totalIncome,
  totalExpenses,
  balance,
  totalInvested,
}: SummaryCardsProps) {
  const cards = [
    {
      title: 'Receitas',
      value: totalIncome,
      icon: TrendingUp,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Despesas',
      value: totalExpenses,
      icon: TrendingDown,
      color: 'text-red-600',
      bg: 'bg-red-50',
    },
    {
      title: 'Saldo',
      value: balance,
      icon: DollarSign,
      color: balance >= 0 ? 'text-emerald-600' : 'text-red-600',
      bg: balance >= 0 ? 'bg-emerald-50' : 'bg-red-50',
    },
    {
      title: 'Investido',
      value: totalInvested,
      icon: LineChart,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <div className={`rounded-md p-2 ${card.bg}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{formatCurrency(card.value)}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
