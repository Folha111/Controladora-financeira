import { useMemo } from 'react';
import { useTransactionStore } from '@/store/transactionStore';
import { useBudgetStore } from '@/store/budgetStore';
import { useGoalStore } from '@/store/goalStore';
import { useRecurringTransactionStore } from '@/store/recurringTransactionStore';
import { useNotificationStore, useActiveNotifications } from '@/store/notificationStore';
import { generateNotifications } from '@/utils/notifications';
import { calculateHealthScore } from '@/utils/healthScore';
import { useInvestmentStore } from '@/store/investmentStore';

export function useNotifications() {
  const transactions = useTransactionStore((s) => s.transactions);
  const budgets = useBudgetStore((s) => s.budgets);
  const goals = useGoalStore((s) => s.goals);
  const recurrings = useRecurringTransactionStore((s) => s.recurringTransactions);
  const investments = useInvestmentStore((s) => s.investments);

  const { dismiss, dismissAll } = useNotificationStore();

  const healthScore = useMemo(() => {
    if (!transactions.length && !investments.length && !budgets.length && !goals.length) return null;
    return calculateHealthScore(transactions, investments, budgets, goals);
  }, [transactions, investments, budgets, goals]);

  const allNotifications = useMemo(
    () => generateNotifications(transactions, budgets, goals, recurrings, healthScore),
    [transactions, budgets, goals, recurrings, healthScore]
  );

  const active = useActiveNotifications(allNotifications);

  return {
    notifications: active,
    count: active.length,
    dismiss,
    dismissAll: () => dismissAll(active.map((n) => n.id)),
  };
}
