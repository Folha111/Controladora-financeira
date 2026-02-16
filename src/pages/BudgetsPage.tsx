import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { BudgetForm } from '@/components/budgets/BudgetForm';
import { BudgetList } from '@/components/budgets/BudgetList';
import { BudgetAlertBanner } from '@/components/budgets/BudgetAlertBanner';
import { useBudgets } from '@/hooks/useBudgets';
import { useTransactions } from '@/hooks/useTransactions';
import type { Budget, ExpenseCategoryId } from '@/types';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export function BudgetsPage() {
  const { budgets, add, update, remove } = useBudgets();
  const { transactions } = useTransactions();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Budget | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const existingCategories = useMemo(
    () => budgets.map((b) => b.category),
    [budgets]
  );

  async function handleSubmit(data: Omit<Budget, 'id'>) {
    if (editing) {
      await update(editing.id, data);
      toast.success('Orçamento atualizado');
      setEditing(null);
    } else {
      await add(data);
      toast.success('Orçamento adicionado');
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    await remove(deleteId);
    toast.success('Orçamento excluído');
    setDeleteId(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orçamentos"
        description="Defina limites de gastos por categoria"
        action={
          <Button onClick={() => { setEditing(null); setFormOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Orçamento
          </Button>
        }
      />

      <BudgetAlertBanner budgets={budgets} transactions={transactions} />

      <BudgetList
        budgets={budgets}
        transactions={transactions}
        onEdit={(b) => {
          setEditing(b);
          setFormOpen(true);
        }}
        onDelete={setDeleteId}
      />

      <BudgetForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleSubmit}
        initialData={editing}
        existingCategories={existingCategories as ExpenseCategoryId[]}
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Excluir orçamento"
        description="Tem certeza que deseja excluir este orçamento?"
        onConfirm={handleDelete}
        confirmLabel="Excluir"
      />
    </div>
  );
}
