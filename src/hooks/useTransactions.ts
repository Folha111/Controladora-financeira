import { useEffect } from 'react';
import { useTransactionStore } from '@/store/transactionStore';

export function useTransactions() {
  const store = useTransactionStore();

  useEffect(() => {
    if (store.transactions.length === 0 && !store.loading) {
      store.fetch();
    }
  }, []);

  return store;
}
