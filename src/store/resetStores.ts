import { useTransactionStore } from './transactionStore';
import { useInvestmentStore } from './investmentStore';
import { useBudgetStore } from './budgetStore';
import { useGoalStore } from './goalStore';
import { useNewsStore } from './newsStore';
import { useRecurringTransactionStore } from './recurringTransactionStore';

export function resetAllStores() {
  useTransactionStore.setState({ transactions: [], loading: false });
  useInvestmentStore.setState({ investments: [], loading: false });
  useBudgetStore.setState({ budgets: [], loading: false });
  useGoalStore.setState({ goals: [], loading: false });
  useNewsStore.setState({ messages: [], loading: false });
  useRecurringTransactionStore.setState({ recurringTransactions: [], loading: false });
}
