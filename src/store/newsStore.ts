import { create } from 'zustand';
import type { NewsMessage } from '@/types';
import { newsService } from '@/services';

interface NewsStore {
  messages: NewsMessage[];
  loading: boolean;
  fetch: () => Promise<void>;
  add: (data: Omit<NewsMessage, 'id' | 'createdAt'>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  clear: () => Promise<void>;
}

export const useNewsStore = create<NewsStore>((set) => ({
  messages: [],
  loading: false,

  fetch: async () => {
    set({ loading: true });
    const messages = await newsService.getAll();
    set({ messages, loading: false });
  },

  add: async (data) => {
    const message = await newsService.create(data);
    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  remove: async (id) => {
    await newsService.delete(id);
    set((state) => ({
      messages: state.messages.filter((m) => m.id !== id),
    }));
  },

  clear: async () => {
    await newsService.clearAll();
    set({ messages: [] });
  },
}));
