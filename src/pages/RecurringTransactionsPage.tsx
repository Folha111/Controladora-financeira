import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/PageHeader';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { RecurringForm } from '@/components/recurring/RecurringForm';
import { RecurringList } from '@/components/recurring/RecurringList';
import { useRecurringTransactions } from '@/hooks/useRecurringTransactions';
import { isDue } from '@/utils/recurringUtils';
import type { RecurringTransaction } from '@/types';
import { Plus, RefreshCw, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export function RecurringTransactionsPage() {
  const { recurringTransactions, add, update, remove, applyRecurring } =
    useRecurringTransactions();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<RecurringTransaction | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const pendingCount = useMemo(
    () => recurringTransactions.filter(isDue).length,
    [recurringTransactions]
  );

  const activeCount = useMemo(
    () => recurringTransactions.filter((r) => r.active).length,
    [recurringTransactions]
  );

  async function handleSubmit(data: Omit<RecurringTransaction, 'id' | 'createdAt'>) {
    if (editing) {
      await update(editing.id, data);
      toast.success('Recorrência atualizada');
      setEditing(null);
    } else {
      await add(data);
      toast.success('Recorrência adicionada');
    }
  }

  async function handleApply(id: string) {
    await applyRecurring(id);
    toast.success('Transação aplicada com sucesso');
  }

  async function handleToggleActive(rt: RecurringTransaction) {
    await update(rt.id, { active: !rt.active });
    toast.success(rt.active ? 'Recorrência pausada' : 'Recorrência ativada');
  }

  async function handleDelete() {
    if (!deleteId) return;
    await remove(deleteId);
    toast.success('Recorrência excluída');
    setDeleteId(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Recorrências"
        description="Gerencie despesas e receitas que se repetem periodicamente"
        action={
          <Button
            onClick={() => {
              setEditing(null);
              setFormOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Nova Recorrência
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="h-4 w-4" />
              <span className="text-sm">Total ativas</span>
            </div>
            <p className="mt-1 text-2xl font-bold">{activeCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-orange-500">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">Pendentes hoje</span>
            </div>
            <p className="mt-1 text-2xl font-bold text-orange-500">{pendingCount}</p>
          </CardContent>
        </Card>
      </div>

      <RecurringList
        recurringTransactions={recurringTransactions}
        onApply={handleApply}
        onEdit={(rt) => {
          setEditing(rt);
          setFormOpen(true);
        }}
        onToggleActive={handleToggleActive}
        onDelete={setDeleteId}
      />

      <RecurringForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleSubmit}
        initialData={editing}
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Excluir recorrência"
        description="Tem certeza que deseja excluir esta recorrência? Esta ação não pode ser desfeita."
        onConfirm={handleDelete}
        confirmLabel="Excluir"
      />
    </div>
  );
}
