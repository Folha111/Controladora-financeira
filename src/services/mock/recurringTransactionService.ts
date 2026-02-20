import { v4 as uuid } from 'uuid';
import type { RecurringTransaction } from '@/types';
import type { IRecurringTransactionService } from '../interfaces';
import { mockRecurringTransactions } from '@/mocks';

let data = [...mockRecurringTransactions];

export const mockRecurringTransactionService: IRecurringTransactionService = {
  async getAll() {
    return [...data].sort((a, b) => a.description.localeCompare(b.description));
  },

  async create(input) {
    const record: RecurringTransaction = {
      ...input,
      id: uuid(),
      createdAt: new Date().toISOString(),
    };
    data.push(record);
    return record;
  },

  async update(id, updates) {
    const idx = data.findIndex((r) => r.id === id);
    if (idx === -1) throw new Error('Recorrência não encontrada');
    data[idx] = { ...data[idx], ...updates };
    return data[idx];
  },

  async delete(id) {
    data = data.filter((r) => r.id !== id);
  },
};
