import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { CurrencyInput } from '@/components/shared/CurrencyInput';
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  RECURRING_FREQUENCIES,
  RECURRING_FREQUENCY_LABELS,
  type RecurringTransaction,
  type RecurringFrequency,
  type TransactionType,
  type CategoryId,
} from '@/types';
import { getCurrentDateISO } from '@/utils';

interface RecurringFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<RecurringTransaction, 'id' | 'createdAt'>) => void;
  initialData?: RecurringTransaction | null;
}

export function RecurringForm({ open, onOpenChange, onSubmit, initialData }: RecurringFormProps) {
  const [type, setType] = useState<TransactionType>('expense');
  const [category, setCategory] = useState<CategoryId>('food');
  const [description, setDescription] = useState('');
  const [amountCents, setAmountCents] = useState(0);
  const [frequency, setFrequency] = useState<RecurringFrequency>('monthly');
  const [dayOfMonth, setDayOfMonth] = useState<string>('1');
  const [startDate, setStartDate] = useState(getCurrentDateISO());
  const [endDate, setEndDate] = useState('');
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setCategory(initialData.category);
      setDescription(initialData.description);
      setAmountCents(initialData.amountCents);
      setFrequency(initialData.frequency);
      setDayOfMonth(String(initialData.dayOfMonth ?? 1));
      setStartDate(initialData.startDate);
      setEndDate(initialData.endDate ?? '');
      setActive(initialData.active);
    } else {
      setType('expense');
      setCategory('food');
      setDescription('');
      setAmountCents(0);
      setFrequency('monthly');
      setDayOfMonth('1');
      setStartDate(getCurrentDateISO());
      setEndDate('');
      setActive(true);
    }
  }, [initialData, open]);

  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const isValid =
    description.trim().length > 0 &&
    amountCents > 0 &&
    startDate.length > 0 &&
    (frequency !== 'monthly' ||
      (Number(dayOfMonth) >= 1 && Number(dayOfMonth) <= 31));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    onSubmit({
      type,
      category,
      description: description.trim(),
      amountCents,
      frequency,
      dayOfMonth: frequency === 'monthly' ? Number(dayOfMonth) : undefined,
      startDate,
      endDate: endDate || undefined,
      active,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Editar Recorrência' : 'Nova Recorrência'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select
                value={type}
                onValueChange={(v) => {
                  setType(v as TransactionType);
                  setCategory(v === 'expense' ? 'food' : 'salary');
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="expense">Despesa</SelectItem>
                  <SelectItem value="income">Receita</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Frequência</Label>
              <Select
                value={frequency}
                onValueChange={(v) => setFrequency(v as RecurringFrequency)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {RECURRING_FREQUENCIES.map((f) => (
                    <SelectItem key={f} value={f}>
                      {RECURRING_FREQUENCY_LABELS[f]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select
              value={category}
              onValueChange={(v) => setCategory(v as CategoryId)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(categories).map(([id, meta]) => (
                  <SelectItem key={id} value={id}>
                    {meta.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Aluguel"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Valor</Label>
            <CurrencyInput id="amount" value={amountCents} onChange={setAmountCents} />
          </div>

          {frequency === 'monthly' && (
            <div className="space-y-2">
              <Label htmlFor="dayOfMonth">Dia do mês (vencimento)</Label>
              <Input
                id="dayOfMonth"
                type="number"
                min={1}
                max={31}
                value={dayOfMonth}
                onChange={(e) => setDayOfMonth(e.target.value)}
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Data de início</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Data de fim (opcional)</Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="active"
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="h-4 w-4 accent-primary"
            />
            <Label htmlFor="active" className="cursor-pointer">
              Recorrência ativa
            </Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!isValid}>
              {initialData ? 'Salvar' : 'Adicionar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
