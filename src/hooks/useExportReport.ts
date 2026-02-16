import { useMemo, useState, useCallback } from 'react';
import { toast } from 'sonner';
import { format, startOfMonth, endOfMonth, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useTransactions } from './useTransactions';
import { useInvestments } from './useInvestments';
import {
  buildReportData,
  exportPdf,
  exportCsv,
  type ExportPeriod,
  type ExportDateRange,
} from '@/services/reportExport';
import {
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateBalance,
  calculateTotalInvested,
  calculateTotalCurrentValue,
} from '@/utils/calculations';

function getDateRange(period: ExportPeriod, custom: ExportDateRange) {
  const now = new Date();
  switch (period) {
    case 'this_month':
      return { from: startOfMonth(now), to: endOfMonth(now) };
    case 'last_month': {
      const prev = subMonths(now, 1);
      return { from: startOfMonth(prev), to: endOfMonth(prev) };
    }
    case 'custom':
      return { from: custom.from, to: custom.to };
  }
}

function getPeriodLabel(period: ExportPeriod, custom: ExportDateRange): string {
  const now = new Date();
  switch (period) {
    case 'this_month':
      return format(now, 'MMMM yyyy', { locale: ptBR });
    case 'last_month':
      return format(subMonths(now, 1), 'MMMM yyyy', { locale: ptBR });
    case 'custom': {
      if (custom.from && custom.to) {
        return `${format(custom.from, 'dd/MM/yyyy')} a ${format(custom.to, 'dd/MM/yyyy')}`;
      }
      return 'Período personalizado';
    }
  }
}

export function useExportReport() {
  const { transactions, loading: loadingTransactions } = useTransactions();
  const { investments, loading: loadingInvestments } = useInvestments();
  const [period, setPeriod] = useState<ExportPeriod>('this_month');
  const [customRange, setCustomRange] = useState<ExportDateRange>({
    from: undefined,
    to: undefined,
  });
  const [exporting, setExporting] = useState<'pdf' | 'csv' | null>(null);

  const dateRange = useMemo(() => getDateRange(period, customRange), [period, customRange]);

  const filteredTransactions = useMemo(() => {
    if (!dateRange.from || !dateRange.to) return [];
    const from = dateRange.from;
    const to = dateRange.to;
    return transactions.filter((t) => {
      const d = new Date(t.date + 'T12:00:00');
      return d >= from && d <= to;
    });
  }, [transactions, dateRange]);

  const summary = useMemo(() => {
    const totalInvested = calculateTotalInvested(investments);
    const totalCurrentValue = calculateTotalCurrentValue(investments);
    return {
      totalIncome: calculateTotalIncome(filteredTransactions),
      totalExpenses: calculateTotalExpenses(filteredTransactions),
      balance: calculateBalance(filteredTransactions),
      count: filteredTransactions.length,
      totalInvested,
      totalCurrentValue,
      investmentReturn: totalCurrentValue - totalInvested,
      investmentCount: investments.length,
    };
  }, [filteredTransactions, investments]);

  const periodLabel = useMemo(() => getPeriodLabel(period, customRange), [period, customRange]);

  const loading = loadingTransactions || loadingInvestments;

  const canExport =
    !loading &&
    (filteredTransactions.length > 0 || investments.length > 0) &&
    (period !== 'custom' || (customRange.from != null && customRange.to != null));

  const handleExport = useCallback(
    async (type: 'pdf' | 'csv') => {
      if (!canExport) return;
      setExporting(type);
      try {
        await new Promise((r) => setTimeout(r, 100));
        const data = buildReportData(filteredTransactions, investments, periodLabel);
        if (type === 'pdf') {
          exportPdf(data);
        } else {
          exportCsv(data);
        }
        toast.success(
          `Relatório ${type.toUpperCase()} exportado com sucesso!`,
        );
      } catch (err) {
        console.error('Export error:', err);
        toast.error('Erro ao exportar relatório. Tente novamente.');
      } finally {
        setExporting(null);
      }
    },
    [canExport, filteredTransactions, investments, periodLabel],
  );

  return {
    period,
    setPeriod,
    customRange,
    setCustomRange,
    summary,
    periodLabel,
    canExport,
    exporting,
    loading,
    transactionCount: filteredTransactions.length,
    handleExport,
  };
}
