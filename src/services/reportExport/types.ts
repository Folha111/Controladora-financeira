import type { Transaction } from '@/types';

export interface CategorySummary {
  id: string;
  label: string;
  totalCents: number;
  percentage: number;
  color: string;
}

export interface InvestmentSummary {
  id: string;
  name: string;
  type: string;
  typeLabel: string;
  amountCents: number;
  currentValueCents: number;
  returnCents: number;
  returnPercent: number;
}

export interface ReportData {
  appName: string;
  periodLabel: string;
  generatedAt: Date;
  totalIncomeCents: number;
  totalExpensesCents: number;
  balanceCents: number;
  transactionCount: number;
  expenseCategories: CategorySummary[];
  incomeCategories: CategorySummary[];
  transactions: Transaction[];
  // Investments
  investments: InvestmentSummary[];
  totalInvestedCents: number;
  totalCurrentValueCents: number;
  investmentReturnCents: number;
  investmentsByType: CategorySummary[];
}

export type ExportPeriod = 'this_month' | 'last_month' | 'custom';

export interface ExportPeriodOption {
  value: ExportPeriod;
  label: string;
}

export interface ExportDateRange {
  from: Date | undefined;
  to: Date | undefined;
}
