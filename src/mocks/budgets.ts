import { format } from 'date-fns';
import type { Budget } from '@/types';

const currentMonth = format(new Date(), 'yyyy-MM');

export const mockBudgets: Budget[] = [
  { id: 'bud1', category: 'food', limitCents: 100000, month: currentMonth },
  { id: 'bud2', category: 'transport', limitCents: 40000, month: currentMonth },
  { id: 'bud3', category: 'entertainment', limitCents: 20000, month: currentMonth },
  { id: 'bud4', category: 'housing', limitCents: 250000, month: currentMonth },
  { id: 'bud5', category: 'utilities', limitCents: 30000, month: currentMonth },
  { id: 'bud6', category: 'health', limitCents: 50000, month: currentMonth },
];
