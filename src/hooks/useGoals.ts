import { useEffect } from 'react';
import { useGoalStore } from '@/store/goalStore';

export function useGoals() {
  const store = useGoalStore();

  useEffect(() => {
    if (store.goals.length === 0 && !store.loading) {
      store.fetch();
    }
  }, []);

  return store;
}
