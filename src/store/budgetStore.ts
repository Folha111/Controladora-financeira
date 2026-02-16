import { create } from 'zustand';
import type { Budget } from '@/types';
import { budgetService } from '@/services';

interface BudgetStore {
  budgets: Budget[];
  loading: boolean;
  fetch: () => Promise<void>;
  add: (data: Omit<Budget, 'id'>) => Promise<void>;
  update: (id: string, data: Partial<Budget>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  clear: () => Promise<void>;
}

export const useBudgetStore = create<BudgetStore>((set) => ({
  budgets: [],
  loading: false,

  fetch: async () => {
    set({ loading: true });
    const budgets = await budgetService.getAll();
    set({ budgets, loading: false });
  },

  add: async (data) => {
    const budget = await budgetService.create(data);
    set((state) => ({ budgets: [...state.budgets, budget] }));
  },

  update: async (id, data) => {
    const updated = await budgetService.update(id, data);
    set((state) => ({
      budgets: state.budgets.map((b) => (b.id === id ? updated : b)),
    }));
  },

  remove: async (id) => {
    await budgetService.delete(id);
    set((state) => ({
      budgets: state.budgets.filter((b) => b.id !== id),
    }));
  },

  clear: async () => {
    await budgetService.clearAll();
    set({ budgets: [] });
  },
}));
