import type { Transaction, Investment } from '@/types';
import {
  ALL_CATEGORIES,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  INVESTMENT_TYPES,
  type ExpenseCategoryId,
  type IncomeCategoryId,
  type InvestmentTypeId,
} from '@/types';
import {
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateBalance,
  calculateTotalInvested,
  calculateTotalCurrentValue,
} from '@/utils/calculations';
import type { ReportData, CategorySummary, InvestmentSummary } from './types';

function groupByCategory(
  transactions: Transaction[],
  type: 'income' | 'expense',
): CategorySummary[] {
  const filtered = transactions.filter((t) => t.type === type);
  const total = filtered.reduce((sum, t) => sum + t.amountCents, 0);
  const map = new Map<string, number>();

  for (const t of filtered) {
    map.set(t.category, (map.get(t.category) || 0) + t.amountCents);
  }

  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  return Array.from(map.entries())
    .filter(([key]) => key in categories)
    .sort(([, a], [, b]) => b - a)
    .map(([id, cents]) => {
      const meta = ALL_CATEGORIES[id as ExpenseCategoryId | IncomeCategoryId];
      return {
        id,
        label: meta?.label ?? id,
        totalCents: cents,
        percentage: total > 0 ? (cents / total) * 100 : 0,
        color: meta?.color ?? '#6b7280',
      };
    });
}

function buildInvestmentsByType(investments: Investment[]): CategorySummary[] {
  const total = calculateTotalCurrentValue(investments);
  const map = new Map<string, number>();

  for (const inv of investments) {
    map.set(inv.type, (map.get(inv.type) || 0) + inv.currentValueCents);
  }

  return Array.from(map.entries())
    .filter(([key]) => key in INVESTMENT_TYPES)
    .sort(([, a], [, b]) => b - a)
    .map(([id, cents]) => {
      const meta = INVESTMENT_TYPES[id as InvestmentTypeId];
      return {
        id,
        label: meta?.label ?? id,
        totalCents: cents,
        percentage: total > 0 ? (cents / total) * 100 : 0,
        color: meta?.color ?? '#6b7280',
      };
    });
}

function buildInvestmentSummaries(investments: Investment[]): InvestmentSummary[] {
  return investments.map((inv) => {
    const meta = INVESTMENT_TYPES[inv.type as InvestmentTypeId];
    const returnCents = inv.currentValueCents - inv.amountCents;
    return {
      id: inv.id,
      name: inv.name,
      type: inv.type,
      typeLabel: meta?.label ?? inv.type,
      amountCents: inv.amountCents,
      currentValueCents: inv.currentValueCents,
      returnCents,
      returnPercent: inv.amountCents > 0 ? (returnCents / inv.amountCents) * 100 : 0,
    };
  });
}

export function buildReportData(
  transactions: Transaction[],
  investments: Investment[],
  periodLabel: string,
): ReportData {
  const totalInvested = calculateTotalInvested(investments);
  const totalCurrentValue = calculateTotalCurrentValue(investments);

  return {
    appName: 'Monetix',
    periodLabel,
    generatedAt: new Date(),
    totalIncomeCents: calculateTotalIncome(transactions),
    totalExpensesCents: calculateTotalExpenses(transactions),
    balanceCents: calculateBalance(transactions),
    transactionCount: transactions.length,
    expenseCategories: groupByCategory(transactions, 'expense'),
    incomeCategories: groupByCategory(transactions, 'income'),
    transactions: [...transactions].sort(
      (a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt),
    ),
    investments: buildInvestmentSummaries(investments),
    totalInvestedCents: totalInvested,
    totalCurrentValueCents: totalCurrentValue,
    investmentReturnCents: totalCurrentValue - totalInvested,
    investmentsByType: buildInvestmentsByType(investments),
  };
}
