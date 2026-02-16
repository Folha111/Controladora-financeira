import { PageHeader } from '@/components/shared/PageHeader';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { ExpensePieChart } from '@/components/dashboard/ExpensePieChart';
import { InvestmentPieChart } from '@/components/dashboard/InvestmentPieChart';
import { MonthlyLineChart } from '@/components/dashboard/MonthlyLineChart';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { useDashboard } from '@/hooks/useDashboard';

export function DashboardPage() {
  const {
    totalIncome,
    totalExpenses,
    balance,
    totalInvested,
    expensesByCategory,
    investmentsByType,
    monthlyTotals,
    recentTransactions,
    loading,
  } = useDashboard();

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Dashboard" description="Visão geral das suas finanças" />
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard" description="Visão geral das suas finanças" />

      <SummaryCards
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        balance={balance}
        totalInvested={totalInvested}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ExpensePieChart data={expensesByCategory} />
        <InvestmentPieChart data={investmentsByType} />
      </div>

      <MonthlyLineChart data={monthlyTotals} />

      <RecentTransactions transactions={recentTransactions} />
    </div>
  );
}
