import { useEffect } from 'react';
import { useNewsStore } from '@/store/newsStore';

export function useNews() {
  const store = useNewsStore();

  useEffect(() => {
    if (store.messages.length === 0 && !store.loading) {
      store.fetch();
    }
  }, []);

  return store;
}
