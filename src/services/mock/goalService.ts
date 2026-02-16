import { v4 as uuid } from 'uuid';
import type { Goal } from '@/types';
import type { IGoalService } from '../interfaces';
import { mockGoals } from '@/mocks';

let data = [...mockGoals];

export const mockGoalService: IGoalService = {
  async getAll() {
    return [...data];
  },

  async create(input) {
    const goal: Goal = {
      ...input,
      id: uuid(),
      createdAt: new Date().toISOString(),
    };
    data.push(goal);
    return goal;
  },

  async update(id, updates) {
    const idx = data.findIndex((g) => g.id === id);
    if (idx === -1) throw new Error('Meta não encontrada');
    data[idx] = { ...data[idx], ...updates };
    return data[idx];
  },

  async delete(id) {
    data = data.filter((g) => g.id !== id);
  },

  async clearAll() {
    data = [];
  },
};
