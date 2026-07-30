import { create } from 'zustand';
import type { Transaction } from '@/types';
import { transactionService } from '@/services';

interface TransactionStore {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  fetch: () => Promise<void>;
  add: (data: Omit<Transaction, 'id' | 'createdAt'>) => Promise<void>;
  update: (id: string, data: Partial<Transaction>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  clear: () => Promise<void>;
}

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  loading: false,
  error: null,

  fetch: async () => {
    set({ loading: true, error: null });
    try {
      const transactions = await transactionService.getAll();
      set({ transactions, loading: false });
    } catch (error) {
      console.error('Falha ao buscar transações:', error);
      set({ loading: false, error: 'Não foi possível carregar as transações.' });
    }
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
