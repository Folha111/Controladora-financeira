import { create } from 'zustand';
import type { RecurringTransaction } from '@/types';
import { recurringTransactionService } from '@/services';

interface RecurringTransactionStore {
  recurringTransactions: RecurringTransaction[];
  loading: boolean;
  fetch: () => Promise<void>;
  add: (data: Omit<RecurringTransaction, 'id' | 'createdAt'>) => Promise<void>;
  update: (id: string, data: Partial<RecurringTransaction>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  markApplied: (id: string, date: string) => Promise<void>;
}

export const useRecurringTransactionStore = create<RecurringTransactionStore>((set) => ({
  recurringTransactions: [],
  loading: false,

  fetch: async () => {
    set({ loading: true });
    const recurringTransactions = await recurringTransactionService.getAll();
    set({ recurringTransactions, loading: false });
  },

  add: async (data) => {
    const record = await recurringTransactionService.create(data);
    set((state) => ({
      recurringTransactions: [...state.recurringTransactions, record],
    }));
  },

  update: async (id, data) => {
    const updated = await recurringTransactionService.update(id, data);
    set((state) => ({
      recurringTransactions: state.recurringTransactions.map((r) =>
        r.id === id ? updated : r
      ),
    }));
  },

  remove: async (id) => {
    await recurringTransactionService.delete(id);
    set((state) => ({
      recurringTransactions: state.recurringTransactions.filter((r) => r.id !== id),
    }));
  },

  markApplied: async (id, date) => {
    const updated = await recurringTransactionService.update(id, { lastAppliedDate: date });
    set((state) => ({
      recurringTransactions: state.recurringTransactions.map((r) =>
        r.id === id ? updated : r
      ),
    }));
  },
}));
