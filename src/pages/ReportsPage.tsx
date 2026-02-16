import { PageHeader } from '@/components/shared/PageHeader';
import { ReportFilters } from '@/components/reports/ReportFilters';
import { ReportSummary } from '@/components/reports/ReportSummary';
import { ReportCategoryTable } from '@/components/reports/ReportCategoryTable';
import { ReportInvestmentTable } from '@/components/reports/ReportInvestmentTable';
import { ReportTrendChart } from '@/components/reports/ReportTrendChart';
import { ExportReportDialog } from '@/components/reports/ExportReportDialog';
import { useReports } from '@/hooks/useReports';

export function ReportsPage() {
  const {
    period,
    setPeriod,
    totalIncome,
    totalExpenses,
    balance,
    transactionCount,
    expensesByCategory,
    totalExpensesForTable,
    filteredTransactions,
    totalInvested,
    totalCurrentValue,
    investmentsByType,
    loading,
  } = useReports();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader title="Relatórios" description="Analise suas finanças por período" />
        <div className="flex items-center gap-2">
          <ReportFilters period={period} onPeriodChange={setPeriod} />
          <ExportReportDialog />
        </div>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Carregando...</p>
      ) : (
        <>
          <ReportSummary
            totalIncome={totalIncome}
            totalExpenses={totalExpenses}
            balance={balance}
            transactionCount={transactionCount}
            totalInvested={totalInvested}
            totalCurrentValue={totalCurrentValue}
          />

          <div className="grid gap-6 lg:grid-cols-2">
            <ReportCategoryTable data={expensesByCategory} total={totalExpensesForTable} />
            <ReportInvestmentTable data={investmentsByType} total={totalCurrentValue} />
          </div>

          <ReportTrendChart transactions={filteredTransactions} />
        </>
      )}
    </div>
  );
}
