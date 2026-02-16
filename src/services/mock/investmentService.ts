import { v4 as uuid } from 'uuid';
import type { Investment } from '@/types';
import type { IInvestmentService } from '../interfaces';
import { mockInvestments } from '@/mocks';

let data = [...mockInvestments];

export const mockInvestmentService: IInvestmentService = {
  async getAll() {
    return [...data].sort((a, b) => b.date.localeCompare(a.date));
  },

  async create(input) {
    const investment: Investment = {
      ...input,
      id: uuid(),
      createdAt: new Date().toISOString(),
    };
    data.push(investment);
    return investment;
  },

  async update(id, updates) {
    const idx = data.findIndex((i) => i.id === id);
    if (idx === -1) throw new Error('Investimento não encontrado');
    data[idx] = { ...data[idx], ...updates };
    return data[idx];
  },

  async delete(id) {
    data = data.filter((i) => i.id !== id);
  },

  async clearAll() {
    data = [];
  },
};
