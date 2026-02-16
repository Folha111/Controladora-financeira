import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ALL_CATEGORIES, type Transaction } from '@/types';
import { formatCurrency, formatDate } from '@/utils';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Últimas Transações</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma transação recente</p>
        ) : (
        <div className="space-y-3">
          {transactions.map((t) => {
            const cat = ALL_CATEGORIES[t.category];
            const isIncome = t.type === 'income';
            return (
              <div
                key={t.id}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <div>
                    <p className="text-sm font-medium">{t.description}</p>
                    <p className="text-muted-foreground text-xs">
                      {cat.label} &middot; {formatDate(t.date)}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={isIncome ? 'default' : 'destructive'}
                  className="font-mono text-xs"
                >
                  {isIncome ? '+' : '-'} {formatCurrency(t.amountCents)}
                </Badge>
              </div>
            );
          })}
        </div>
        )}
      </CardContent>
    </Card>
  );
}
