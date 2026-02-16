import { create } from 'zustand';
import type { Transaction } from '@/types';
import { transactionService } from '@/services';

interface TransactionStore {
  transactions: Transaction[];
  loading: boolean;
  fetch: () => Promise<void>;
  add: (data: Omit<Transaction, 'id' | 'createdAt'>) => Promise<void>;
  update: (id: string, data: Partial<Transaction>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  clear: () => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  loading: false,

  fetch: async () => {
    set({ loading: true });
    const transactions = await transactionService.getAll();
    set({ transactions, loading: false });
  },

  add: async (data) => {
    const transaction = await transactionService.create(data);
    set((state) => ({
      transactions: [transaction, ...state.transactions],
    }));
  },

  update: async (id, data) => {
    const updated = await transactionService.update(id, data);
    set((state) => ({
      transactions: state.transactions.map((t) => (t.id === id ? updated : t)),
    }));
  },

  remove: async (id) => {
    await transactionService.delete(id);
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    }));
  },

  clear: async () => {
    await transactionService.clearAll();
    set({ transactions: [] });
  },
}));
