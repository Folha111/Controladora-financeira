import { formatDate } from '@/utils/format';
import { ALL_CATEGORIES } from '@/types';
import type { CategoryId } from '@/types';
import type { ReportData } from './types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function fmtCSV(cents: number): string {
  return (cents / 100).toFixed(2).replace('.', ',');
}

function escapeCSV(value: string): string {
  if (value.includes(';') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function exportCsv(data: ReportData): void {
  const lines: string[] = [];
  const genDate = format(data.generatedAt, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });

  // Header
  lines.push(`${data.appName} - Relatório Financeiro`);
  lines.push(`Período: ${data.periodLabel}`);
  lines.push(`Gerado em: ${genDate}`);
  lines.push('');

  // Summary
  lines.push('=== RESUMO FINANCEIRO ===');
  lines.push(`Total de Receitas;${fmtCSV(data.totalIncomeCents)}`);
  lines.push(`Total de Despesas;${fmtCSV(data.totalExpensesCents)}`);
  lines.push(`Saldo Final;${fmtCSV(data.balanceCents)}`);
  lines.push(`Total de Transações;${data.transactionCount}`);
  lines.push('');

  // Investment Summary
  if (data.investments.length > 0) {
    lines.push('=== RESUMO DE INVESTIMENTOS ===');
    lines.push(`Total Investido;${fmtCSV(data.totalInvestedCents)}`);
    lines.push(`Valor Atual;${fmtCSV(data.totalCurrentValueCents)}`);
    lines.push(`Rendimento;${fmtCSV(data.investmentReturnCents)}`);
    lines.push(`Total de Investimentos;${data.investments.length}`);
    lines.push('');
  }

  // Expense Categories
  if (data.expenseCategories.length > 0) {
    lines.push('=== DESPESAS POR CATEGORIA ===');
    lines.push('Categoria;Valor;%');
    for (const cat of data.expenseCategories) {
      lines.push(
        `${escapeCSV(cat.label)};${fmtCSV(cat.totalCents)};${cat.percentage.toFixed(1)}%`,
      );
    }
    lines.push('');
  }

  // Income Categories
  if (data.incomeCategories.length > 0) {
    lines.push('=== RECEITAS POR CATEGORIA ===');
    lines.push('Categoria;Valor;%');
    for (const cat of data.incomeCategories) {
      lines.push(
        `${escapeCSV(cat.label)};${fmtCSV(cat.totalCents)};${cat.percentage.toFixed(1)}%`,
      );
    }
    lines.push('');
  }

  // Investments by Type
  if (data.investmentsByType.length > 0) {
    lines.push('=== INVESTIMENTOS POR TIPO ===');
    lines.push('Tipo;Valor Atual;%');
    for (const cat of data.investmentsByType) {
      lines.push(
        `${escapeCSV(cat.label)};${fmtCSV(cat.totalCents)};${cat.percentage.toFixed(1)}%`,
      );
    }
    lines.push('');
  }

  // Investment Details
  if (data.investments.length > 0) {
    lines.push('=== DETALHAMENTO DE INVESTIMENTOS ===');
    lines.push('Nome;Tipo;Aplicado;Valor Atual;Rendimento %');
    for (const inv of data.investments) {
      lines.push(
        [
          escapeCSV(inv.name),
          escapeCSV(inv.typeLabel),
          fmtCSV(inv.amountCents),
          fmtCSV(inv.currentValueCents),
          `${inv.returnPercent >= 0 ? '+' : ''}${inv.returnPercent.toFixed(1)}%`,
        ].join(';'),
      );
    }
    lines.push('');
  }

  // Transactions
  if (data.transactions.length > 0) {
    lines.push('=== TRANSAÇÕES DETALHADAS ===');
    lines.push('Data;Descrição;Categoria;Tipo;Valor');
    for (const t of data.transactions) {
      const catMeta = ALL_CATEGORIES[t.category as CategoryId];
      lines.push(
        [
          formatDate(t.date),
          escapeCSV(t.description),
          escapeCSV(catMeta?.label ?? t.category),
          t.type === 'income' ? 'Receita' : 'Despesa',
          fmtCSV(t.amountCents),
        ].join(';'),
      );
    }
  }

  const content = '\uFEFF' + lines.join('\r\n');
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `monetix-relatorio-${format(data.generatedAt, 'yyyy-MM-dd-HHmm')}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
