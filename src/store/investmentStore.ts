import { create } from 'zustand';
import type { Investment } from '@/types';
import { investmentService } from '@/services';

interface InvestmentStore {
  investments: Investment[];
  loading: boolean;
  fetch: () => Promise<void>;
  add: (data: Omit<Investment, 'id' | 'createdAt'>) => Promise<void>;
  update: (id: string, data: Partial<Investment>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  clear: () => Promise<void>;
}

export const useInvestmentStore = create<InvestmentStore>((set) => ({
  investments: [],
  loading: false,

  fetch: async () => {
    set({ loading: true });
    const investments = await investmentService.getAll();
    set({ investments, loading: false });
  },

  add: async (data) => {
    const investment = await investmentService.create(data);
    set((state) => ({
      investments: [investment, ...state.investments],
    }));
  },

  update: async (id, data) => {
    const updated = await investmentService.update(id, data);
    set((state) => ({
      investments: state.investments.map((i) => (i.id === id ? updated : i)),
    }));
  },

  remove: async (id) => {
    await investmentService.delete(id);
    set((state) => ({
      investments: state.investments.filter((i) => i.id !== id),
    }));
  },

  clear: async () => {
    await investmentService.clearAll();
    set({ investments: [] });
  },
}));
