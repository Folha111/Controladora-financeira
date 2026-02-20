import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { DashboardPage } from '@/pages/DashboardPage';
import { TransactionsPage } from '@/pages/TransactionsPage';
import { InvestmentsPage } from '@/pages/InvestmentsPage';
import { BudgetsPage } from '@/pages/BudgetsPage';
import { GoalsPage } from '@/pages/GoalsPage';
import { ReportsPage } from '@/pages/ReportsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { NewsPage } from '@/pages/NewsPage';
import { HealthScorePage } from '@/pages/HealthScorePage';
import { RecurringTransactionsPage } from '@/pages/RecurringTransactionsPage';
import { LoginPage } from '@/pages/LoginPage';
import { FeaturesPage } from '@/pages/FeaturesPage';
import { useAuthStore } from '@/store/authStore';

function App() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return (
    <BrowserRouter>
      <Routes>
        {/* ── Rotas públicas ─────────────────────────────── */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />}
        />
        <Route path="/conhecer" element={<FeaturesPage />} />

        {/* ── Rotas autenticadas ─────────────────────────── */}
        {isAuthenticated ? (
          <Route element={<AppShell />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/transacoes" element={<TransactionsPage />} />
            <Route path="/recorrentes" element={<RecurringTransactionsPage />} />
            <Route path="/investimentos" element={<InvestmentsPage />} />
            <Route path="/orcamentos" element={<BudgetsPage />} />
            <Route path="/metas" element={<GoalsPage />} />
            <Route path="/relatorios" element={<ReportsPage />} />
            <Route path="/noticias" element={<NewsPage />} />
            <Route path="/saude-financeira" element={<HealthScorePage />} />
            <Route path="/configuracoes" element={<SettingsPage />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
