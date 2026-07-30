import { create } from 'zustand';
import type { NewsMessage } from '@/types';
import { newsService } from '@/services';

interface NewsStore {
  messages: NewsMessage[];
  loading: boolean;
  error: string | null;
  fetch: () => Promise<void>;
  add: (data: Omit<NewsMessage, 'id' | 'createdAt'>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  clear: () => Promise<void>;
}

export const useNewsStore = create<NewsStore>((set) => ({
  messages: [],
  loading: false,
  error: null,

  fetch: async () => {
    set({ loading: true, error: null });
    try {
      const messages = await newsService.getAll();
      set({ messages, loading: false });
    } catch (error) {
      console.error('Falha ao buscar notícias:', error);
      set({ loading: false, error: 'Não foi possível carregar as notícias.' });
    }
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
