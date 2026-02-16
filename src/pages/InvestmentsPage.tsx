import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { InvestmentForm } from '@/components/investments/InvestmentForm';
import { InvestmentFilters } from '@/components/investments/InvestmentFilters';
import { InvestmentList } from '@/components/investments/InvestmentList';
import { useInvestments } from '@/hooks/useInvestments';
import type { Investment } from '@/types';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

export function InvestmentsPage() {
  const { investments, add, update, remove } = useInvestments();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Investment | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const filtered = useMemo(() => {
    return investments.filter((inv) => {
      if (typeFilter !== 'all' && inv.type !== typeFilter) return false;
      if (search && !inv.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [investments, search, typeFilter]);

  async function handleSubmit(data: Omit<Investment, 'id' | 'createdAt'>) {
    if (editing) {
      await update(editing.id, data);
      toast.success('Investimento atualizado');
      setEditing(null);
    } else {
      await add(data);
      toast.success('Investimento adicionado');
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    await remove(deleteId);
    toast.success('Investimento excluído');
    setDeleteId(null);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Investimentos"
        description="Acompanhe seus investimentos"
        action={
          <Button onClick={() => { setEditing(null); setFormOpen(true); }}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Investimento
          </Button>
        }
      />

      <InvestmentFilters
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeChange={setTypeFilter}
      />

      <InvestmentList
        investments={filtered}
        onEdit={(inv) => {
          setEditing(inv);
          setFormOpen(true);
        }}
        onDelete={setDeleteId}
      />

      <InvestmentForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleSubmit}
        initialData={editing}
      />

      <ConfirmDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
        title="Excluir investimento"
        description="Tem certeza que deseja excluir este investimento? Esta ação não pode ser desfeita."
        onConfirm={handleDelete}
        confirmLabel="Excluir"
      />
    </div>
  );
}
