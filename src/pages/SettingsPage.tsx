import { useState } from 'react';
import { Trash2, KeyRound } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from '@/components/shared/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { useAuthStore } from '@/store/authStore';
import { useTransactionStore } from '@/store/transactionStore';
import { useInvestmentStore } from '@/store/investmentStore';
import { useBudgetStore } from '@/store/budgetStore';
import { useGoalStore } from '@/store/goalStore';

export function SettingsPage() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [clearing, setClearing] = useState(false);

  const clearTransactions = useTransactionStore((s) => s.clear);
  const clearInvestments = useInvestmentStore((s) => s.clear);
  const clearBudgets = useBudgetStore((s) => s.clear);
  const clearGoals = useGoalStore((s) => s.clear);

  async function handleClearAll() {
    setClearing(true);
    try {
      await Promise.all([
        clearTransactions(),
        clearInvestments(),
        clearBudgets(),
        clearGoals(),
      ]);
      toast.success('Todos os dados foram apagados com sucesso.');
    } catch {
      toast.error('Erro ao limpar os dados. Tente novamente.');
    } finally {
      setClearing(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Configurações"
        description="Gerencie as configurações da aplicação"
      />

      <ChangePasswordCard />

      <Card>
        <CardHeader>
          <CardTitle className="text-base text-red-600">
            Zona de Perigo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium">
                Limpar todos os dados
              </p>
              <p className="text-muted-foreground text-sm">
                Remove todas as transações, investimentos, orçamentos e metas.
                Esta ação não pode ser desfeita.
              </p>
            </div>
            <Button
              variant="destructive"
              className="gap-2 shrink-0"
              disabled={clearing}
              onClick={() => setConfirmOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
              {clearing ? 'Limpando...' : 'Limpar tudo'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Você tem certeza disso?"
        description="Todos os seus dados serão permanentemente apagados: transações, investimentos, orçamentos e metas. Esta ação não pode ser desfeita."
        confirmLabel="Sim, apagar tudo"
        variant="destructive"
        onConfirm={handleClearAll}
      />
    </div>
  );
}

function ChangePasswordCard() {
  const changePassword = useAuthStore((s) => s.changePassword);

  const [isOpen, setIsOpen] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  function resetForm() {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Preencha todos os campos');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('A nova senha e a confirmação não coincidem');
      return;
    }

    const result = changePassword(currentPassword, newPassword);

    if (result.success) {
      toast.success('Senha alterada com sucesso!');
      resetForm();
      setIsOpen(false);
    } else {
      setError(result.error ?? 'Erro ao alterar senha');
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="h-4 w-4" />
            Senha
          </div>

          {!isOpen && (
            <Button size="sm" onClick={() => setIsOpen(true)}>
              Alterar senha
            </Button>
          )}
        </CardTitle>
      </CardHeader>

      {isOpen && (
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
            <div className="space-y-2">
              <Label htmlFor="current-password">
                Senha atual
              </Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                placeholder="Digite a senha atual"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">
                Nova senha
              </Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                placeholder="Digite a nova senha"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">
                Confirmar nova senha
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirme a nova senha"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="flex gap-2">
              <Button type="submit" className="gap-2">
                <KeyRound className="h-4 w-4" />
                Confirmar
              </Button>

              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  resetForm();
                  setIsOpen(false);
                }}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      )}
    </Card>
  );
}
