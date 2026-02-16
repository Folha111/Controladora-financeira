import { format, subMonths } from 'date-fns';
import type { Transaction } from '@/types';

const now = new Date();
const thisMonth = format(now, 'yyyy-MM');
const lastMonth = format(subMonths(now, 1), 'yyyy-MM');

function d(month: string, day: number): string {
  return `${month}-${String(day).padStart(2, '0')}`;
}

function ts(month: string, day: number): string {
  return `${d(month, day)}T08:00:00Z`;
}

export const mockTransactions: Transaction[] = [
  // --- Mês anterior ---
  { id: '1', type: 'income', category: 'salary', description: 'Salário', amountCents: 850000, date: d(lastMonth, 5), createdAt: ts(lastMonth, 5) },
  { id: '2', type: 'expense', category: 'housing', description: 'Aluguel', amountCents: 200000, date: d(lastMonth, 10), createdAt: ts(lastMonth, 10) },
  { id: '3', type: 'expense', category: 'food', description: 'Supermercado', amountCents: 85000, date: d(lastMonth, 12), createdAt: ts(lastMonth, 12) },
  { id: '4', type: 'expense', category: 'transport', description: 'Uber mensal', amountCents: 35000, date: d(lastMonth, 15), createdAt: ts(lastMonth, 15) },
  { id: '5', type: 'expense', category: 'utilities', description: 'Conta de luz', amountCents: 18000, date: d(lastMonth, 18), createdAt: ts(lastMonth, 18) },
  { id: '6', type: 'expense', category: 'entertainment', description: 'Cinema + jantar', amountCents: 15000, date: d(lastMonth, 20), createdAt: ts(lastMonth, 20) },
  { id: '7', type: 'expense', category: 'health', description: 'Plano de saúde', amountCents: 45000, date: d(lastMonth, 22), createdAt: ts(lastMonth, 22) },
  { id: '8', type: 'income', category: 'freelance', description: 'Projeto freelance', amountCents: 300000, date: d(lastMonth, 25), createdAt: ts(lastMonth, 25) },
  { id: '9', type: 'expense', category: 'education', description: 'Curso online', amountCents: 19900, date: d(lastMonth, 28), createdAt: ts(lastMonth, 28) },
  { id: '10', type: 'expense', category: 'clothing', description: 'Roupas novas', amountCents: 25000, date: d(lastMonth, 28), createdAt: ts(lastMonth, 28) },

  // --- Este mês ---
  { id: '11', type: 'income', category: 'salary', description: 'Salário', amountCents: 850000, date: d(thisMonth, 5), createdAt: ts(thisMonth, 5) },
  { id: '12', type: 'expense', category: 'housing', description: 'Aluguel', amountCents: 200000, date: d(thisMonth, 5), createdAt: ts(thisMonth, 5) },
  { id: '13', type: 'expense', category: 'food', description: 'Supermercado', amountCents: 78000, date: d(thisMonth, 7), createdAt: ts(thisMonth, 7) },
  { id: '14', type: 'expense', category: 'transport', description: 'Gasolina', amountCents: 28000, date: d(thisMonth, 8), createdAt: ts(thisMonth, 8) },
  { id: '15', type: 'expense', category: 'utilities', description: 'Internet + Celular', amountCents: 22000, date: d(thisMonth, 10), createdAt: ts(thisMonth, 10) },
  { id: '16', type: 'expense', category: 'entertainment', description: 'Streaming', amountCents: 5500, date: d(thisMonth, 10), createdAt: ts(thisMonth, 10) },
  { id: '17', type: 'income', category: 'investments_income', description: 'Dividendos', amountCents: 45000, date: d(thisMonth, 12), createdAt: ts(thisMonth, 12) },
  { id: '18', type: 'expense', category: 'food', description: 'Restaurante', amountCents: 12000, date: d(thisMonth, 13), createdAt: ts(thisMonth, 13) },
  { id: '19', type: 'expense', category: 'health', description: 'Farmácia', amountCents: 8500, date: d(thisMonth, 14), createdAt: ts(thisMonth, 14) },
  { id: '20', type: 'expense', category: 'other_expense', description: 'Presente aniversário', amountCents: 15000, date: d(thisMonth, 15), createdAt: ts(thisMonth, 15) },
];
