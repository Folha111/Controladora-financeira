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
import { INVESTMENT_TYPES, type Investment, type InvestmentTypeId } from '@/types';
import { getCurrentDateISO } from '@/utils';

interface InvestmentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<Investment, 'id' | 'createdAt'>) => void;
  initialData?: Investment | null;
}

export function InvestmentForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: InvestmentFormProps) {
  const [type, setType] = useState<InvestmentTypeId>('stocks');
  const [name, setName] = useState('');
  const [amountCents, setAmountCents] = useState(0);
  const [currentValueCents, setCurrentValueCents] = useState(0);
  const [date, setDate] = useState(getCurrentDateISO());

  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setName(initialData.name);
      setAmountCents(initialData.amountCents);
      setCurrentValueCents(initialData.currentValueCents);
      setDate(initialData.date);
    } else {
      setType('stocks');
      setName('');
      setAmountCents(0);
      setCurrentValueCents(0);
      setDate(getCurrentDateISO());
    }
  }, [initialData, open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || amountCents <= 0) return;
    onSubmit({
      type,
      name: name.trim(),
      amountCents,
      currentValueCents: currentValueCents || amountCents,
      date,
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Editar Investimento' : 'Novo Investimento'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Tipo</Label>
            <Select value={type} onValueChange={(v) => setType(v as InvestmentTypeId)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(INVESTMENT_TYPES).map(([id, meta]) => (
                  <SelectItem key={id} value={id}>
                    {meta.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="inv-name">Nome</Label>
            <Input
              id="inv-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: PETR4, CDB 120% CDI"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inv-amount">Valor Investido</Label>
            <CurrencyInput id="inv-amount" value={amountCents} onChange={setAmountCents} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inv-current">Valor Atual</Label>
            <CurrencyInput
              id="inv-current"
              value={currentValueCents}
              onChange={setCurrentValueCents}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inv-date">Data</Label>
            <Input
              id="inv-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!name.trim() || amountCents <= 0}>
              {initialData ? 'Salvar' : 'Adicionar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
