import { useMemo, useState } from 'react';
import { useTransactions } from './useTransactions';
import { useInvestments } from './useInvestments';
import type { PeriodFilter, Transaction } from '@/types';
import {
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateBalance,
  groupExpensesByCategory,
  calculateTotalInvested,
  calculateTotalCurrentValue,
  groupInvestmentsByType,
} from '@/utils';

function getDateRange(period: PeriodFilter): { from: Date; to: Date } {
  const now = new Date();
  const to = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

  switch (period) {
    case 'week': {
      const from = new Date(to);
      from.setDate(from.getDate() - 6);
      from.setHours(0, 0, 0, 0);
      return { from, to };
    }
    case 'month': {
      const from = new Date(now.getFullYear(), now.getMonth(), 1);
      return { from, to };
    }
    case 'year': {
      const from = new Date(now.getFullYear(), 0, 1);
      return { from, to };
    }
    default: {
      const from = new Date(now.getFullYear(), now.getMonth(), 1);
      return { from, to };
    }
  }
}

function filterByPeriod(transactions: Transaction[], period: PeriodFilter): Transaction[] {
  const { from, to } = getDateRange(period);
  return transactions.filter((t) => {
    const d = new Date(t.date + 'T12:00:00');
    return d >= from && d <= to;
  });
}

export function useReports() {
  const { transactions, loading: loadingTx } = useTransactions();
  const { investments, loading: loadingInv } = useInvestments();
  const [period, setPeriod] = useState<PeriodFilter>('month');

  const data = useMemo(() => {
    const filtered = filterByPeriod(transactions, period);
    const totalIncome = calculateTotalIncome(filtered);
    const totalExpenses = calculateTotalExpenses(filtered);
    const balance = calculateBalance(filtered);
    const expensesByCategory = groupExpensesByCategory(filtered);

    const totalInvested = calculateTotalInvested(investments);
    const totalCurrentValue = calculateTotalCurrentValue(investments);
    const investmentsByType = groupInvestmentsByType(investments);

    return {
      filteredTransactions: filtered,
      totalIncome,
      totalExpenses,
      balance,
      transactionCount: filtered.length,
      expensesByCategory,
      totalExpensesForTable: totalExpenses,
      totalInvested,
      totalCurrentValue,
      investmentsByType,
      investmentCount: investments.length,
    };
  }, [transactions, investments, period]);

  return { ...data, period, setPeriod, loading: loadingTx || loadingInv };
}
