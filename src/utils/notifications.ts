import type {
  Transaction,
  Budget,
  Goal,
  RecurringTransaction,
  AppNotification,
  ExpenseCategoryId,
} from '@/types';
import { EXPENSE_CATEGORIES } from '@/types';
import { getBudgetSpent } from './calculations';
import type { HealthScore } from './healthScore';

function budgetNotifications(
  budgets: Budget[],
  transactions: Transaction[]
): AppNotification[] {
  const notifications: AppNotification[] = [];
  const currentMonth = new Date().toISOString().substring(0, 7);

  for (const budget of budgets) {
    if (budget.month !== currentMonth) continue;

    const spent = getBudgetSpent(budget.category as ExpenseCategoryId, transactions, budget.month);
    const percentage = budget.limitCents > 0 ? (spent / budget.limitCents) * 100 : 0;
    const categoryLabel = EXPENSE_CATEGORIES[budget.category as ExpenseCategoryId]?.label ?? budget.category;

    if (percentage > 100) {
      notifications.push({
        id: `budget_exceeded_${budget.id}`,
        type: 'budget_exceeded',
        title: 'Orçamento ultrapassado',
        message: `Você gastou ${percentage.toFixed(0)}% do limite em ${categoryLabel} este mês.`,
        link: '/orcamentos',
        createdAt: new Date().toISOString(),
      });
    } else if (percentage >= 80) {
      notifications.push({
        id: `budget_warning_${budget.id}`,
        type: 'budget_warning',
        title: 'Orçamento próximo do limite',
        message: `${categoryLabel}: ${percentage.toFixed(0)}% do limite mensal utilizado.`,
        link: '/orcamentos',
        createdAt: new Date().toISOString(),
      });
    }
  }

  return notifications;
}

function goalNotifications(goals: Goal[]): AppNotification[] {
  const notifications: AppNotification[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const goal of goals) {
    const progress = goal.targetCents > 0 ? (goal.currentCents / goal.targetCents) * 100 : 0;

    if (progress >= 100) {
      notifications.push({
        id: `goal_completed_${goal.id}`,
        type: 'goal_completed',
        title: 'Meta concluída!',
        message: `Parabéns! Você atingiu a meta "${goal.title}".`,
        link: '/metas',
        createdAt: new Date().toISOString(),
      });
      continue;
    }

    const deadline = new Date(goal.deadline + 'T00:00:00');
    const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysLeft >= 0 && daysLeft <= 14) {
      const daysText = daysLeft === 0 ? 'hoje' : daysLeft === 1 ? 'amanhã' : `em ${daysLeft} dias`;
      notifications.push({
        id: `goal_deadline_${goal.id}`,
        type: 'goal_deadline',
        title: 'Prazo de meta se aproximando',
        message: `A meta "${goal.title}" vence ${daysText} com ${progress.toFixed(0)}% concluída.`,
        link: '/metas',
        createdAt: new Date().toISOString(),
      });
    }
  }

  return notifications;
}

function recurringNotifications(recurrings: RecurringTransaction[]): AppNotification[] {
  const notifications: AppNotification[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (const rt of recurrings) {
    if (!rt.active) continue;

    if (rt.endDate) {
      const end = new Date(rt.endDate + 'T00:00:00');
      if (end < today) continue;
    }

    if (rt.frequency !== 'monthly' || !rt.dayOfMonth) continue;

    const currentDay = today.getDate();
    const targetDay = rt.dayOfMonth;
    const daysUntil = targetDay >= currentDay ? targetDay - currentDay : 0;

    if (daysUntil <= 3 && daysUntil >= 0) {
      const dayText = daysUntil === 0 ? 'hoje' : daysUntil === 1 ? 'amanhã' : `em ${daysUntil} dias`;
      const typeLabel = rt.type === 'expense' ? 'despesa' : 'receita';
      notifications.push({
        id: `recurring_due_${rt.id}_${today.toISOString().substring(0, 7)}`,
        type: 'recurring_due',
        title: 'Transação recorrente próxima',
        message: `${rt.description}: ${typeLabel} recorrente vence ${dayText}.`,
        link: '/recorrentes',
        createdAt: new Date().toISOString(),
      });
    }
  }

  return notifications;
}

function healthNotification(score: HealthScore | null): AppNotification[] {
  if (!score) return [];

  if (score.total <= 40) {
    return [
      {
        id: `health_critical_${score.total}`,
        type: 'health_critical',
        title: 'Saúde financeira crítica',
        message: `Seu score é ${score.total}/100 (${score.level}). Confira as recomendações.`,
        link: '/saude-financeira',
        createdAt: new Date().toISOString(),
      },
    ];
  }

  return [];
}

export function generateNotifications(
  transactions: Transaction[],
  budgets: Budget[],
  goals: Goal[],
  recurrings: RecurringTransaction[],
  healthScore: HealthScore | null
): AppNotification[] {
  return [
    ...budgetNotifications(budgets, transactions),
    ...goalNotifications(goals),
    ...recurringNotifications(recurrings),
    ...healthNotification(healthScore),
  ];
}
