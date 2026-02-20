import type { RecurringTransaction, RecurringFrequency } from '@/types';
import { format, parseISO, startOfWeek, addWeeks, setDate, setMonth, setYear, isBefore, isEqual } from 'date-fns';

export function getFrequencyLabel(freq: RecurringFrequency): string {
  const labels: Record<RecurringFrequency, string> = {
    weekly: 'Semanal',
    monthly: 'Mensal',
    yearly: 'Anual',
  };
  return labels[freq];
}

/** Retorna a data da próxima ocorrência a partir de hoje (inclusive). */
export function getNextDueDate(rt: RecurringTransaction): Date {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (rt.frequency === 'monthly') {
    const day = rt.dayOfMonth ?? parseISO(rt.startDate).getDate();
    let candidate = setDate(today, day);
    candidate.setHours(0, 0, 0, 0);
    if (isBefore(candidate, today)) {
      // Este mês já passou, avança para o próximo
      candidate = setDate(new Date(today.getFullYear(), today.getMonth() + 1, 1), day);
    }
    return candidate;
  }

  if (rt.frequency === 'weekly') {
    const startWeek = startOfWeek(today, { weekStartsOn: 1 });
    const start = parseISO(rt.startDate);
    const dayOfWeek = start.getDay(); // 0 = domingo
    let candidate = new Date(startWeek);
    candidate.setDate(startWeek.getDate() + ((dayOfWeek - 1 + 7) % 7));
    candidate.setHours(0, 0, 0, 0);
    if (isBefore(candidate, today)) {
      candidate = addWeeks(candidate, 1);
    }
    return candidate;
  }

  // yearly
  const start = parseISO(rt.startDate);
  let candidate = setYear(setMonth(setDate(today, start.getDate()), start.getMonth()), today.getFullYear());
  candidate.setHours(0, 0, 0, 0);
  if (isBefore(candidate, today)) {
    candidate = setYear(candidate, today.getFullYear() + 1);
  }
  return candidate;
}

/** Verifica se a recorrência está pendente de aplicação para o período atual. */
export function isDue(rt: RecurringTransaction): boolean {
  if (!rt.active) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Verifica se passou da data de fim
  if (rt.endDate) {
    const end = parseISO(rt.endDate);
    if (isBefore(end, today)) return false;
  }

  const nextDue = getNextDueDate(rt);

  // Se a próxima data de vencimento é no futuro, ainda não está pendente
  if (isBefore(today, nextDue) && !isEqual(today, nextDue)) return false;

  if (!rt.lastAppliedDate) return true;

  const last = parseISO(rt.lastAppliedDate);
  last.setHours(0, 0, 0, 0);

  if (rt.frequency === 'monthly') {
    // Pendente se não foi aplicada neste mês
    return !(
      last.getMonth() === today.getMonth() &&
      last.getFullYear() === today.getFullYear()
    );
  }

  if (rt.frequency === 'weekly') {
    const currentWeekStart = startOfWeek(today, { weekStartsOn: 1 });
    const lastWeekStart = startOfWeek(last, { weekStartsOn: 1 });
    return isBefore(lastWeekStart, currentWeekStart);
  }

  // yearly
  return last.getFullYear() < today.getFullYear();
}

export function getNextDueDateFormatted(rt: RecurringTransaction): string {
  return format(getNextDueDate(rt), 'dd/MM/yyyy');
}
