import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils';

interface ReportSummaryProps {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  transactionCount: number;
  totalInvested?: number;
  totalCurrentValue?: number;
}

export function ReportSummary({
  totalIncome,
  totalExpenses,
  balance,
  transactionCount,
  totalInvested,
  totalCurrentValue,
}: ReportSummaryProps) {
  const hasInvestments = totalInvested != null && totalInvested > 0;
  const investmentReturn = hasInvestments ? totalCurrentValue! - totalInvested! : 0;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Receitas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-bold text-emerald-600">
            {formatCurrency(totalIncome)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Despesas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-bold text-red-600">
            {formatCurrency(totalExpenses)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Saldo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`text-lg font-bold ${balance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {formatCurrency(balance)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Transações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-bold">{transactionCount}</p>
        </CardContent>
      </Card>
      {hasInvestments && (
        <>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Patrimônio Investido
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold text-blue-600">
                {formatCurrency(totalCurrentValue!)}
              </p>
              <p className="text-xs text-muted-foreground">
                Aplicado: {formatCurrency(totalInvested!)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Rendimento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-lg font-bold ${investmentReturn >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {formatCurrency(investmentReturn)}
              </p>
              <p className="text-xs text-muted-foreground">
                {totalInvested! > 0 ? ((investmentReturn / totalInvested!) * 100).toFixed(1) : '0.0'}%
              </p>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
