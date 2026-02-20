import { useEffect } from 'react';
import { useRecurringTransactionStore } from '@/store/recurringTransactionStore';
import { useTransactionStore } from '@/store/transactionStore';
import { getCurrentDateISO } from '@/utils';

export function useRecurringTransactions() {
  const store = useRecurringTransactionStore();

  useEffect(() => {
    if (store.recurringTransactions.length === 0 && !store.loading) {
      store.fetch();
    }
  }, []);

  async function applyRecurring(id: string) {
    const rt = store.recurringTransactions.find((r) => r.id === id);
    if (!rt) return;

    const today = getCurrentDateISO();

    await useTransactionStore.getState().add({
      type: rt.type,
      category: rt.category,
      description: rt.description,
      amountCents: rt.amountCents,
      date: today,
    });

    await store.markApplied(id, today);
  }

  return { ...store, applyRecurring };
}
