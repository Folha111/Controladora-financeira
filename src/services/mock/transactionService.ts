import { v4 as uuid } from 'uuid';
import type { Transaction } from '@/types';
import type { ITransactionService } from '../interfaces';
import { mockTransactions } from '@/mocks';

let data = [...mockTransactions];

export const mockTransactionService: ITransactionService = {
  async getAll() {
    return [...data].sort((a, b) => b.date.localeCompare(a.date));
  },

  async create(input) {
    const transaction: Transaction = {
      ...input,
      id: uuid(),
      createdAt: new Date().toISOString(),
    };
    data.push(transaction);
    return transaction;
  },

  async update(id, updates) {
    const idx = data.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error('Transação não encontrada');
    data[idx] = { ...data[idx], ...updates };
    return data[idx];
  },

  async delete(id) {
    data = data.filter((t) => t.id !== id);
  },

  async clearAll() {
    data = [];
  },
};
