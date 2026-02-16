import { useMemo } from 'react';
import { useTransactions } from './useTransactions';
import { useInvestments } from './useInvestments';
import {
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateBalance,
  calculateTotalInvested,
  calculateTotalCurrentValue,
  groupExpensesByCategory,
  groupInvestmentsByType,
  getMonthlyTotals,
} from '@/utils';

export function useDashboard() {
  const { transactions, loading: loadingTx } = useTransactions();
  const { investments, loading: loadingInv } = useInvestments();

  const data = useMemo(() => {
    const totalIncome = calculateTotalIncome(transactions);
    const totalExpenses = calculateTotalExpenses(transactions);
    const balance = calculateBalance(transactions);
    const totalInvested = calculateTotalInvested(investments);
    const totalCurrentValue = calculateTotalCurrentValue(investments);
    const expensesByCategory = groupExpensesByCategory(transactions);
    const investmentsByType = groupInvestmentsByType(investments);
    const monthlyTotals = getMonthlyTotals(transactions);
    const recentTransactions = [...transactions]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5);

    return {
      totalIncome,
      totalExpenses,
      balance,
      totalInvested,
      totalCurrentValue,
      expensesByCategory,
      investmentsByType,
      monthlyTotals,
      recentTransactions,
    };
  }, [transactions, investments]);

  return { ...data, loading: loadingTx || loadingInv };
}
