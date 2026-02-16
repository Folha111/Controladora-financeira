import { v4 as uuid } from 'uuid';
import type { NewsMessage } from '@/types';
import type { INewsService } from '../interfaces';
import { mockNews } from '@/mocks';

let data = [...mockNews];

export const mockNewsService: INewsService = {
  async getAll() {
    return [...data].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  },

  async create(input) {
    const message: NewsMessage = {
      ...input,
      id: uuid(),
      createdAt: new Date().toISOString(),
    };
    data.push(message);
    return message;
  },

  async delete(id) {
    data = data.filter((m) => m.id !== id);
  },

  async clearAll() {
    data = [];
  },
};
