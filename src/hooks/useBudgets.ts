import { useEffect } from 'react';
import { useBudgetStore } from '@/store/budgetStore';

export function useBudgets() {
  const store = useBudgetStore();

  useEffect(() => {
    if (store.budgets.length === 0 && !store.loading) {
      store.fetch();
    }
  }, []);

  return store;
}
