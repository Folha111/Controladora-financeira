import { mockTransactionService } from './mock/transactionService';
import { mockInvestmentService } from './mock/investmentService';
import { mockBudgetService } from './mock/budgetService';
import { mockGoalService } from './mock/goalService';

export const transactionService = mockTransactionService;
export const investmentService = mockInvestmentService;
export const budgetService = mockBudgetService;
export const goalService = mockGoalService;

import { mockNewsService } from './mock/newsService';
export const newsService = mockNewsService;

import { mockRecurringTransactionService } from './mock/recurringTransactionService';
export const recurringTransactionService = mockRecurringTransactionService;
