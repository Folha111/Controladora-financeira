import { v4 as uuid } from 'uuid';
import type { Budget } from '@/types';
import type { IBudgetService } from '../interfaces';
import { mockBudgets } from '@/mocks';

let data = [...mockBudgets];

export const mockBudgetService: IBudgetService = {
  async getAll() {
    return [...data];
  },

  async create(input) {
    const budget: Budget = { ...input, id: uuid() };
    data.push(budget);
    return budget;
  },

  async update(id, updates) {
    const idx = data.findIndex((b) => b.id === id);
    if (idx === -1) throw new Error('Orçamento não encontrado');
    data[idx] = { ...data[idx], ...updates };
    return data[idx];
  },

  async delete(id) {
    data = data.filter((b) => b.id !== id);
  },

  async clearAll() {
    data = [];
  },
};
