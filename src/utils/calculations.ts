import type { Transaction, Investment, Budget, ExpenseCategoryId } from '@/types';

export function calculateTotalIncome(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amountCents, 0);
}

export function calculateTotalExpenses(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amountCents, 0);
}

export function calculateBalance(transactions: Transaction[]): number {
  return calculateTotalIncome(transactions) - calculateTotalExpenses(transactions);
}

export function calculateTotalInvested(investments: Investment[]): number {
  return investments.reduce((sum, i) => sum + i.amountCents, 0);
}

export function calculateTotalCurrentValue(investments: Investment[]): number {
  return investments.reduce((sum, i) => sum + i.currentValueCents, 0);
}

export function groupExpensesByCategory(
  transactions: Transaction[]
): Record<string, number> {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce(
      (acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amountCents;
        return acc;
      },
      {} as Record<string, number>
    );
}

export function groupInvestmentsByType(
  investments: Investment[]
): Record<string, number> {
  return investments.reduce(
    (acc, i) => {
      acc[i.type] = (acc[i.type] || 0) + i.currentValueCents;
      return acc;
    },
    {} as Record<string, number>
  );
}

export function getBudgetSpent(
  category: ExpenseCategoryId,
  transactions: Transaction[],
  month: string
): number {
  return transactions
    .filter(
      (t) =>
        t.type === 'expense' &&
        t.category === category &&
        t.date.startsWith(month)
    )
    .reduce((sum, t) => sum + t.amountCents, 0);
}

export function getBudgetProgress(
  budget: Budget,
  transactions: Transaction[]
): { spent: number; limit: number; percentage: number } {
  const spent = getBudgetSpent(budget.category, transactions, budget.month);
  const percentage = budget.limitCents > 0 ? (spent / budget.limitCents) * 100 : 0;
  return { spent, limit: budget.limitCents, percentage: Math.min(percentage, 100) };
}

export function getGoalProgress(goal: { currentCents: number; targetCents: number }): number {
  if (goal.targetCents === 0) return 0;
  return Math.min((goal.currentCents / goal.targetCents) * 100, 100);
}

export interface MonthlyTotal {
  month: string;
  income: number;
  expense: number;
}

export function getMonthlyTotals(transactions: Transaction[]): MonthlyTotal[] {
  const map = new Map<string, { income: number; expense: number }>();

  for (const t of transactions) {
    const month = t.date.substring(0, 7);
    const entry = map.get(month) || { income: 0, expense: 0 };
    if (t.type === 'income') {
      entry.income += t.amountCents;
    } else {
      entry.expense += t.amountCents;
    }
    map.set(month, entry);
  }

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, data]) => ({ month, ...data }));
}
