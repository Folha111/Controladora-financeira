import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { CurrencyInput } from '@/components/shared/CurrencyInput';
import { EXPENSE_CATEGORIES, type Budget, type ExpenseCategoryId } from '@/types';
import { getCurrentMonth } from '@/utils';

interface BudgetFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<Budget, 'id'>) => void;
  initialData?: Budget | null;
  existingCategories: ExpenseCategoryId[];
}

export function BudgetForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  existingCategories,
}: BudgetFormProps) {
  const [category, setCategory] = useState<ExpenseCategoryId>('food');
  const [limitCents, setLimitCents] = useState(0);
  const [month, setMonth] = useState(getCurrentMonth());

  useEffect(() => {
    if (initialData) {
      setCategory(initialData.category);
      setLimitCents(initialData.limitCents);
      setMonth(initialData.month);
    } else {
      const available = Object.keys(EXPENSE_CATEGORIES).find(
        (k) => !existingCategories.includes(k as ExpenseCategoryId)
      ) as ExpenseCategoryId | undefined;
      setCategory(available || 'food');
      setLimitCents(0);
      setMonth(getCurrentMonth());
    }
  }, [initialData, open, existingCategories]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (limitCents <= 0) return;
    onSubmit({ category, limitCents, month });
    onOpenChange(false);
  }

  const availableCategories = initialData
    ? EXPENSE_CATEGORIES
    : Object.fromEntries(
        Object.entries(EXPENSE_CATEGORIES).filter(
          ([k]) => !existingCategories.includes(k as ExpenseCategoryId)
        )
      );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Editar Orçamento' : 'Novo Orçamento'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select
              value={category}
              onValueChange={(v) => setCategory(v as ExpenseCategoryId)}
              disabled={!!initialData}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(availableCategories).map(([id, meta]) => (
                  <SelectItem key={id} value={id}>
                    {meta.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget-limit">Limite Mensal</Label>
            <CurrencyInput id="budget-limit" value={limitCents} onChange={setLimitCents} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget-month">Mês</Label>
            <Input
              id="budget-month"
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={limitCents <= 0}>
              {initialData ? 'Salvar' : 'Adicionar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
