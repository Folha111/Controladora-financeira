import { useMemo } from 'react';
import { useTransactions } from './useTransactions';
import { useInvestments } from './useInvestments';
import { useBudgets } from './useBudgets';
import { useGoals } from './useGoals';
import { calculateHealthScore } from '@/utils/healthScore';

export function useHealthScore() {
  const { transactions, loading: loadingTx } = useTransactions();
  const { investments, loading: loadingInv } = useInvestments();
  const { budgets, loading: loadingBudgets } = useBudgets();
  const { goals, loading: loadingGoals } = useGoals();

  const loading = loadingTx || loadingInv || loadingBudgets || loadingGoals;

  const score = useMemo(() => {
    if (loading) return null;
    return calculateHealthScore(transactions, investments, budgets, goals);
  }, [transactions, investments, budgets, goals, loading]);

  return { score, loading };
}
