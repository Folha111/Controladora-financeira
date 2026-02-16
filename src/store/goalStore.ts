import { create } from 'zustand';
import type { Goal } from '@/types';
import { goalService } from '@/services';

interface GoalStore {
  goals: Goal[];
  loading: boolean;
  fetch: () => Promise<void>;
  add: (data: Omit<Goal, 'id' | 'createdAt'>) => Promise<void>;
  update: (id: string, data: Partial<Goal>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  clear: () => Promise<void>;
}

export const useGoalStore = create<GoalStore>((set) => ({
  goals: [],
  loading: false,

  fetch: async () => {
    set({ loading: true });
    const goals = await goalService.getAll();
    set({ goals, loading: false });
  },

  add: async (data) => {
    const goal = await goalService.create(data);
    set((state) => ({ goals: [...state.goals, goal] }));
  },

  update: async (id, data) => {
    const updated = await goalService.update(id, data);
    set((state) => ({
      goals: state.goals.map((g) => (g.id === id ? updated : g)),
    }));
  },

  remove: async (id) => {
    await goalService.delete(id);
    set((state) => ({
      goals: state.goals.filter((g) => g.id !== id),
    }));
  },

  clear: async () => {
    await goalService.clearAll();
    set({ goals: [] });
  },
}));
