import type { Transaction, Investment, Budget, Goal } from '@/types';
import {
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateBalance,
  getBudgetProgress,
  getGoalProgress,
} from '@/utils/calculations';

export interface DimensionScore {
  id: string;
  label: string;
  score: number;
  weight: number;
  percentage: number;
  status: 'critical' | 'warning' | 'regular' | 'good' | 'excellent';
  description: string;
  detail: string;
  recommendation: string | null;
}

export interface HealthScore {
  total: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  level: 'Excelente' | 'Bom' | 'Regular' | 'Preocupante' | 'Crítico';
  color: string;
  dimensions: DimensionScore[];
  topRecommendations: string[];
}

function getStatus(percentage: number): DimensionScore['status'] {
  if (percentage >= 86) return 'excellent';
  if (percentage >= 71) return 'good';
  if (percentage >= 51) return 'regular';
  if (percentage >= 31) return 'warning';
  return 'critical';
}

function calcSavingsRate(transactions: Transaction[]): DimensionScore {
  const weight = 30;
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);

  if (income === 0) {
    return {
      id: 'savings',
      label: 'Taxa de Poupança',
      score: 0,
      weight,
      percentage: 0,
      status: 'critical',
      description: 'Proporção da renda poupada após as despesas',
      detail: 'Nenhuma receita registrada',
      recommendation: 'Registre suas receitas para calcular sua taxa de poupança.',
    };
  }

  const rate = ((income - expenses) / income) * 100;

  let score: number;
  if (rate >= 30) score = 30;
  else if (rate >= 20) score = 22 + ((rate - 20) / 10) * 8;
  else if (rate >= 10) score = 15 + ((rate - 10) / 10) * 7;
  else if (rate >= 5) score = 8 + ((rate - 5) / 5) * 7;
  else if (rate > 0) score = (rate / 5) * 8;
  else score = 0;

  score = Math.max(0, Math.round(score));
  const percentage = (score / weight) * 100;

  let recommendation: string | null = null;
  if (rate <= 0) recommendation = 'Suas despesas superam a renda. Identifique cortes urgentes.';
  else if (rate < 5) recommendation = 'Tente poupar pelo menos 5% da sua renda mensalmente.';
  else if (rate < 10) recommendation = 'Bom começo! Evolua para 10% de poupança sobre a renda.';
  else if (rate < 20) recommendation = 'Ótima taxa! Busque atingir 20% de poupança.';

  const detail =
    rate <= 0
      ? 'Despesas superam a renda'
      : `${rate.toFixed(1)}% da renda está sendo poupada`;

  return {
    id: 'savings',
    label: 'Taxa de Poupança',
    score,
    weight,
    percentage,
    status: getStatus(percentage),
    description: 'Proporção da renda poupada após as despesas',
    detail,
    recommendation,
  };
}

function calcBudgetControl(transactions: Transaction[], budgets: Budget[]): DimensionScore {
  const weight = 20;

  if (budgets.length === 0) {
    return {
      id: 'budget',
      label: 'Controle de Orçamento',
      score: 10,
      weight,
      percentage: 50,
      status: 'regular',
      description: 'Capacidade de manter gastos dentro dos limites definidos',
      detail: 'Nenhum orçamento configurado',
      recommendation: 'Configure orçamentos mensais por categoria para controlar melhor seus gastos.',
    };
  }

  const results = budgets.map((b) => getBudgetProgress(b, transactions));
  const underBudget = results.filter((r) => r.percentage <= 100).length;
  const complianceRate = underBudget / budgets.length;

  const score = Math.round(complianceRate * weight);
  const percentage = (score / weight) * 100;

  let recommendation: string | null = null;
  if (complianceRate < 0.5)
    recommendation = 'Mais da metade dos orçamentos estão estourados. Revise seus hábitos de gasto.';
  else if (complianceRate < 0.8)
    recommendation = 'Alguns orçamentos estão acima do limite. Identifique as categorias problemáticas.';
  else if (complianceRate < 1)
    recommendation = 'Quase perfeito! Ajuste os orçamentos das categorias que ultrapassaram o limite.';

  return {
    id: 'budget',
    label: 'Controle de Orçamento',
    score,
    weight,
    percentage,
    status: getStatus(percentage),
    description: 'Capacidade de manter gastos dentro dos limites definidos',
    detail: `${underBudget} de ${budgets.length} orçamentos dentro do limite`,
    recommendation,
  };
}

function calcInvestmentRate(transactions: Transaction[], investments: Investment[]): DimensionScore {
  const weight = 20;
  const income = calculateTotalIncome(transactions);
  const totalInvested = investments.reduce((sum, i) => sum + i.amountCents, 0);

  if (income === 0) {
    return {
      id: 'investment',
      label: 'Taxa de Investimento',
      score: 0,
      weight,
      percentage: 0,
      status: 'critical',
      description: 'Percentual da renda total direcionado a investimentos',
      detail: 'Nenhuma receita registrada',
      recommendation: 'Registre suas receitas para calcular a taxa de investimento.',
    };
  }

  const rate = (totalInvested / income) * 100;

  let score: number;
  if (rate >= 30) score = 20;
  else if (rate >= 20) score = 16 + ((rate - 20) / 10) * 4;
  else if (rate >= 10) score = 10 + ((rate - 10) / 10) * 6;
  else if (rate >= 5) score = 5 + ((rate - 5) / 5) * 5;
  else if (rate > 0) score = (rate / 5) * 5;
  else score = 0;

  score = Math.max(0, Math.round(score));
  const percentage = (score / weight) * 100;

  let recommendation: string | null = null;
  if (rate === 0) recommendation = 'Comece a investir! Mesmo valores pequenos fazem diferença no longo prazo.';
  else if (rate < 5) recommendation = 'Tente destinar pelo menos 5% da renda para investimentos.';
  else if (rate < 10) recommendation = 'Aumente seus investimentos para 10% da renda.';
  else if (rate < 20) recommendation = 'Excelente! Busque chegar a 20% da renda investida.';

  return {
    id: 'investment',
    label: 'Taxa de Investimento',
    score,
    weight,
    percentage,
    status: getStatus(percentage),
    description: 'Percentual da renda total direcionado a investimentos',
    detail: `${rate.toFixed(1)}% da renda em investimentos`,
    recommendation,
  };
}

function calcEmergencyReserve(transactions: Transaction[]): DimensionScore {
  const weight = 20;
  const balance = calculateBalance(transactions);

  const expenseMonths = new Set(
    transactions.filter((t) => t.type === 'expense').map((t) => t.date.substring(0, 7))
  );
  const monthCount = expenseMonths.size || 1;
  const totalExpenses = calculateTotalExpenses(transactions);
  const avgMonthlyExpenses = totalExpenses / monthCount;

  if (avgMonthlyExpenses === 0) {
    return {
      id: 'reserve',
      label: 'Reserva de Emergência',
      score: 5,
      weight,
      percentage: 25,
      status: 'warning',
      description: 'Meses de despesas cobertos pelo saldo atual',
      detail: 'Nenhuma despesa registrada',
      recommendation: 'Registre suas despesas para calcular sua reserva de emergência.',
    };
  }

  const monthsCovered = balance / avgMonthlyExpenses;

  let score: number;
  if (monthsCovered >= 6) score = 20;
  else if (monthsCovered >= 3) score = 14 + ((monthsCovered - 3) / 3) * 6;
  else if (monthsCovered >= 1) score = 8 + ((monthsCovered - 1) / 2) * 6;
  else if (monthsCovered > 0) score = 2 + monthsCovered * 6;
  else score = 0;

  score = Math.max(0, Math.round(score));
  const percentage = (score / weight) * 100;

  let recommendation: string | null = null;
  if (monthsCovered < 0) recommendation = 'Saldo negativo. Priorize quitar dívidas e construir uma reserva.';
  else if (monthsCovered < 1) recommendation = 'Construa uma reserva de emergência de pelo menos 3 meses de despesas.';
  else if (monthsCovered < 3) recommendation = 'Aumente sua reserva para cobrir 3 meses de despesas.';
  else if (monthsCovered < 6) recommendation = 'Reserva sólida! Tente chegar a 6 meses de despesas cobertas.';

  const meses = monthsCovered === 1 ? 'mês' : 'meses';
  const detail =
    monthsCovered < 0
      ? 'Saldo negativo'
      : `Cobre ${monthsCovered.toFixed(1)} ${meses} de despesas`;

  return {
    id: 'reserve',
    label: 'Reserva de Emergência',
    score,
    weight,
    percentage,
    status: getStatus(percentage),
    description: 'Meses de despesas cobertos pelo saldo atual',
    detail,
    recommendation,
  };
}

function calcGoalsProgress(goals: Goal[]): DimensionScore {
  const weight = 10;

  if (goals.length === 0) {
    return {
      id: 'goals',
      label: 'Progresso de Metas',
      score: 5,
      weight,
      percentage: 50,
      status: 'regular',
      description: 'Progresso médio no cumprimento das metas financeiras',
      detail: 'Nenhuma meta cadastrada',
      recommendation: 'Defina metas financeiras para se motivar a poupar com propósito.',
    };
  }

  const avgProgress = goals.reduce((sum, g) => sum + getGoalProgress(g), 0) / goals.length;
  const score = Math.round((avgProgress / 100) * weight);
  const percentage = avgProgress;

  let recommendation: string | null = null;
  if (avgProgress < 25) recommendation = 'Foque em contribuir regularmente para suas metas.';
  else if (avgProgress < 50) recommendation = 'Bom início! Mantenha consistência nas contribuições.';
  else if (avgProgress < 75) recommendation = 'Ótimo progresso! Continue assim para atingir suas metas.';

  return {
    id: 'goals',
    label: 'Progresso de Metas',
    score,
    weight,
    percentage,
    status: getStatus(percentage),
    description: 'Progresso médio no cumprimento das metas financeiras',
    detail: `Média de ${avgProgress.toFixed(0)}% das metas concluídas`,
    recommendation,
  };
}

export function calculateHealthScore(
  transactions: Transaction[],
  investments: Investment[],
  budgets: Budget[],
  goals: Goal[]
): HealthScore {
  const savings = calcSavingsRate(transactions);
  const budget = calcBudgetControl(transactions, budgets);
  const investment = calcInvestmentRate(transactions, investments);
  const reserve = calcEmergencyReserve(transactions);
  const goalsScore = calcGoalsProgress(goals);

  const dimensions = [savings, budget, investment, reserve, goalsScore];
  const total = Math.min(100, dimensions.reduce((sum, d) => sum + d.score, 0));

  let grade: HealthScore['grade'];
  let level: HealthScore['level'];
  let color: string;

  if (total >= 90) {
    grade = 'A+';
    level = 'Excelente';
    color = '#22c55e';
  } else if (total >= 80) {
    grade = 'A';
    level = 'Excelente';
    color = '#22c55e';
  } else if (total >= 71) {
    grade = 'B';
    level = 'Bom';
    color = '#84cc16';
  } else if (total >= 51) {
    grade = 'C';
    level = 'Regular';
    color = '#eab308';
  } else if (total >= 31) {
    grade = 'D';
    level = 'Preocupante';
    color = '#f97316';
  } else {
    grade = 'F';
    level = 'Crítico';
    color = '#ef4444';
  }

  const topRecommendations = dimensions
    .filter((d) => d.recommendation !== null)
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 3)
    .map((d) => d.recommendation as string);

  return { total, grade, level, color, dimensions, topRecommendations };
}
