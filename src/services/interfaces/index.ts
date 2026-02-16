import type { Transaction, Investment, Budget, Goal } from '@/types';

export interface ITransactionService {
  getAll(): Promise<Transaction[]>;
  create(data: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction>;
  update(id: string, data: Partial<Transaction>): Promise<Transaction>;
  delete(id: string): Promise<void>;
  clearAll(): Promise<void>;
}

export interface IInvestmentService {
  getAll(): Promise<Investment[]>;
  create(data: Omit<Investment, 'id' | 'createdAt'>): Promise<Investment>;
  update(id: string, data: Partial<Investment>): Promise<Investment>;
  delete(id: string): Promise<void>;
  clearAll(): Promise<void>;
}

export interface IBudgetService {
  getAll(): Promise<Budget[]>;
  create(data: Omit<Budget, 'id'>): Promise<Budget>;
  update(id: string, data: Partial<Budget>): Promise<Budget>;
  delete(id: string): Promise<void>;
  clearAll(): Promise<void>;
}

export interface IGoalService {
  getAll(): Promise<Goal[]>;
  create(data: Omit<Goal, 'id' | 'createdAt'>): Promise<Goal>;
  update(id: string, data: Partial<Goal>): Promise<Goal>;
  delete(id: string): Promise<void>;
  clearAll(): Promise<void>;
}
