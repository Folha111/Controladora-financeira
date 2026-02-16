import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { EXPENSE_CATEGORIES, type Budget, type Transaction } from '@/types';
import { getBudgetProgress } from '@/utils/calculations';
import { formatCurrency } from '@/utils';

interface BudgetAlertBannerProps {
  budgets: Budget[];
  transactions: Transaction[];
}

export function BudgetAlertBanner({ budgets, transactions }: BudgetAlertBannerProps) {
  const overBudgets = budgets.filter((b) => {
    const { spent, limit } = getBudgetProgress(b, transactions);
    return spent > limit;
  });

  if (overBudgets.length === 0) return null;

  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        {overBudgets.length === 1 ? (
          <>
            O orçamento de{' '}
            <strong>
              {EXPENSE_CATEGORIES[overBudgets[0].category].label}
            </strong>{' '}
            foi excedido! Gasto:{' '}
            {formatCurrency(
              getBudgetProgress(overBudgets[0], transactions).spent
            )}{' '}
            / Limite: {formatCurrency(overBudgets[0].limitCents)}
          </>
        ) : (
          <>
            {overBudgets.length} orçamentos foram excedidos:{' '}
            {overBudgets
              .map((b) => EXPENSE_CATEGORIES[b.category].label)
              .join(', ')}
          </>
        )}
      </AlertDescription>
    </Alert>
  );
}
