export const TRANSACTION_TYPES = ['income', 'expense'] as const;
export type TransactionType = (typeof TRANSACTION_TYPES)[number];

export const EXPENSE_CATEGORY_IDS = [
  'food',
  'transport',
  'housing',
  'health',
  'education',
  'entertainment',
  'clothing',
  'utilities',
  'other_expense',
] as const;
export type ExpenseCategoryId = (typeof EXPENSE_CATEGORY_IDS)[number];

export const INCOME_CATEGORY_IDS = [
  'salary',
  'freelance',
  'investments_income',
  'other_income',
] as const;
export type IncomeCategoryId = (typeof INCOME_CATEGORY_IDS)[number];

export type CategoryId = ExpenseCategoryId | IncomeCategoryId;

export interface CategoryMeta {
  label: string;
  icon: string;
  color: string;
}

export const EXPENSE_CATEGORIES: Record<ExpenseCategoryId, CategoryMeta> = {
  food: { label: 'Alimentação', icon: 'UtensilsCrossed', color: '#ef4444' },
  transport: { label: 'Transporte', icon: 'Car', color: '#f97316' },
  housing: { label: 'Moradia', icon: 'Home', color: '#eab308' },
  health: { label: 'Saúde', icon: 'Heart', color: '#22c55e' },
  education: { label: 'Educação', icon: 'GraduationCap', color: '#3b82f6' },
  entertainment: { label: 'Lazer', icon: 'Gamepad2', color: '#8b5cf6' },
  clothing: { label: 'Vestuário', icon: 'Shirt', color: '#ec4899' },
  utilities: { label: 'Contas', icon: 'Zap', color: '#14b8a6' },
  other_expense: { label: 'Outros', icon: 'MoreHorizontal', color: '#6b7280' },
};

export const INCOME_CATEGORIES: Record<IncomeCategoryId, CategoryMeta> = {
  salary: { label: 'Salário', icon: 'Briefcase', color: '#22c55e' },
  freelance: { label: 'Freelance', icon: 'Laptop', color: '#3b82f6' },
  investments_income: { label: 'Rendimentos', icon: 'TrendingUp', color: '#8b5cf6' },
  other_income: { label: 'Outros', icon: 'MoreHorizontal', color: '#6b7280' },
};

export const ALL_CATEGORIES: Record<CategoryId, CategoryMeta> = {
  ...EXPENSE_CATEGORIES,
  ...INCOME_CATEGORIES,
};

export interface Transaction {
  id: string;
  type: TransactionType;
  category: CategoryId;
  description: string;
  amountCents: number;
  date: string; // ISO date string YYYY-MM-DD
  createdAt: string; // ISO datetime
}

export const INVESTMENT_TYPE_IDS = [
  'stocks',
  'fixed_income',
  'funds',
  'crypto',
  'real_estate',
  'other_investment',
] as const;
export type InvestmentTypeId = (typeof INVESTMENT_TYPE_IDS)[number];

export interface InvestmentTypeMeta {
  label: string;
  icon: string;
  color: string;
}

export const INVESTMENT_TYPES: Record<InvestmentTypeId, InvestmentTypeMeta> = {
  stocks: { label: 'Ações', icon: 'LineChart', color: '#3b82f6' },
  fixed_income: { label: 'Renda Fixa', icon: 'Lock', color: '#22c55e' },
  funds: { label: 'Fundos', icon: 'PieChart', color: '#8b5cf6' },
  crypto: { label: 'Cripto', icon: 'Bitcoin', color: '#f97316' },
  real_estate: { label: 'Imóveis', icon: 'Building', color: '#eab308' },
  other_investment: { label: 'Outros', icon: 'MoreHorizontal', color: '#6b7280' },
};

export interface Investment {
  id: string;
  type: InvestmentTypeId;
  name: string;
  amountCents: number;
  currentValueCents: number;
  date: string;
  createdAt: string;
}

export interface Budget {
  id: string;
  category: ExpenseCategoryId;
  limitCents: number;
  month: string; // YYYY-MM
}

export interface Goal {
  id: string;
  title: string;
  targetCents: number;
  currentCents: number;
  deadline: string; // ISO date YYYY-MM-DD
  createdAt: string;
}

export interface NewsMessage {
  id: string;
  author: string;
  content: string;
  createdAt: string; // ISO datetime
}

export type PeriodFilter = 'week' | 'month' | 'year' | 'custom';

export interface DateRange {
  from: Date;
  to: Date;
}
