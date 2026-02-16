import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatCurrency(cents: number): string {
  const value = cents / 100;
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), 'dd/MM/yyyy', { locale: ptBR });
}

export function formatMonth(monthStr: string): string {
  const date = parseISO(`${monthStr}-01`);
  return format(date, 'MMMM yyyy', { locale: ptBR });
}

export function formatDateShort(dateStr: string): string {
  return format(parseISO(dateStr), 'dd MMM', { locale: ptBR });
}

export function parseCurrencyInput(value: string): number {
  const cleaned = value.replace(/[^\d,]/g, '').replace(',', '.');
  const num = parseFloat(cleaned);
  if (isNaN(num)) return 0;
  return Math.round(num * 100);
}

export function centsToDecimal(cents: number): string {
  return (cents / 100).toFixed(2).replace('.', ',');
}

export function getCurrentMonth(): string {
  return format(new Date(), 'yyyy-MM');
}

export function getCurrentDateISO(): string {
  return format(new Date(), 'yyyy-MM-dd');
}
