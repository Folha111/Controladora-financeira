import { format, subMonths } from 'date-fns';
import type { Investment } from '@/types';

const m = (monthsAgo: number) => format(subMonths(new Date(), monthsAgo), 'yyyy-MM-dd');
const ts = (monthsAgo: number) => `${m(monthsAgo)}T08:00:00Z`;

export const mockInvestments: Investment[] = [
  { id: 'inv1', type: 'stocks', name: 'PETR4', amountCents: 500000, currentValueCents: 550000, date: m(8), createdAt: ts(8) },
  { id: 'inv2', type: 'stocks', name: 'VALE3', amountCents: 300000, currentValueCents: 280000, date: m(7), createdAt: ts(7) },
  { id: 'inv3', type: 'fixed_income', name: 'CDB 120% CDI', amountCents: 1000000, currentValueCents: 1065000, date: m(13), createdAt: ts(13) },
  { id: 'inv4', type: 'fixed_income', name: 'Tesouro Selic', amountCents: 500000, currentValueCents: 528000, date: m(11), createdAt: ts(11) },
  { id: 'inv5', type: 'funds', name: 'Fundo Multimercado XP', amountCents: 200000, currentValueCents: 215000, date: m(6), createdAt: ts(6) },
  { id: 'inv6', type: 'crypto', name: 'Bitcoin', amountCents: 150000, currentValueCents: 195000, date: m(5), createdAt: ts(5) },
  { id: 'inv7', type: 'real_estate', name: 'FII HGLG11', amountCents: 400000, currentValueCents: 420000, date: m(9), createdAt: ts(9) },
];
