import { format, addMonths } from 'date-fns';
import type { Goal } from '@/types';

const future = (monthsAhead: number) => format(addMonths(new Date(), monthsAhead), 'yyyy-MM-dd');

export const mockGoals: Goal[] = [
  { id: 'goal1', title: 'Reserva de emergência', targetCents: 3000000, currentCents: 1800000, deadline: future(10), createdAt: '2024-01-01T08:00:00Z' },
  { id: 'goal2', title: 'Viagem Europa', targetCents: 1500000, currentCents: 600000, deadline: future(5), createdAt: '2024-06-01T08:00:00Z' },
  { id: 'goal3', title: 'Notebook novo', targetCents: 800000, currentCents: 350000, deadline: future(4), createdAt: '2024-09-01T08:00:00Z' },
  { id: 'goal4', title: 'Curso de inglês', targetCents: 500000, currentCents: 500000, deadline: future(1), createdAt: '2024-03-01T08:00:00Z' },
];
