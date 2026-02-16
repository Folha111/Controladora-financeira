import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { GoalForm } from '@/components/goals/GoalForm';
import { GoalList } from '@/components/goals/GoalList';
import { useGoals } from '@/hooks/useGoals';
import type { Goal } from '@/types';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export function GoalsPage() {
  const { goals, add, update, remove } = useGoals();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Goal | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  async function handleSubmit(data: Omit<Goal, 'id' | 'createdAt'>) {
    if (editing) {
      await update(editing.id, data);
      toast.success('Meta atualizada');
      setEditing(null);
    } else {
      await add(data);
      toast.success('Meta adicionada');
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    await remove(deleteId);
    toast.success('Meta excluída');
    setDeleteId(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Metas"
        description="Acompanhe suas metas financeiras"
        action={
          <Button onClick={() => { setEditing(null); setFormOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            Nova Meta
          </Button>
        }
      />

      <GoalList
        goals={goals}
        onEdit={(g) => {
          setEditing(g);
          setFormOpen(true);
        }}
        onDelete={setDeleteId}
      />

      <GoalForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleSubmit}
        initialData={editing}
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Excluir meta"
        description="Tem certeza que deseja excluir esta meta?"
        onConfirm={handleDelete}
        confirmLabel="Excluir"
      />
    </div>
  );
}
