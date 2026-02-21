import { firestoreTransactionService } from './firebase/transactionService';
import { firestoreInvestmentService } from './firebase/investmentService';
import { firestoreBudgetService } from './firebase/budgetService';
import { firestoreGoalService } from './firebase/goalService';
import { firestoreNewsService } from './firebase/newsService';
import { firestoreRecurringTransactionService } from './firebase/recurringTransactionService';

export const transactionService = firestoreTransactionService;
export const investmentService = firestoreInvestmentService;
export const budgetService = firestoreBudgetService;
export const goalService = firestoreGoalService;
export const newsService = firestoreNewsService;
export const recurringTransactionService = firestoreRecurringTransactionService;
