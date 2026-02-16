import { useEffect } from 'react';
import { useInvestmentStore } from '@/store/investmentStore';

export function useInvestments() {
  const store = useInvestmentStore();

  useEffect(() => {
    if (store.investments.length === 0 && !store.loading) {
      store.fetch();
    }
  }, []);

  return store;
}
