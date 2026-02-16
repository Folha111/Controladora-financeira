import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { CurrencyInput } from '@/components/shared/CurrencyInput';
import type { Goal } from '@/types';
import { getCurrentDateISO } from '@/utils';

interface GoalFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<Goal, 'id' | 'createdAt'>) => void;
  initialData?: Goal | null;
}

export function GoalForm({ open, onOpenChange, onSubmit, initialData }: GoalFormProps) {
  const [title, setTitle] = useState('');
  const [targetCents, setTargetCents] = useState(0);
  const [currentCents, setCurrentCents] = useState(0);
  const [deadline, setDeadline] = useState(getCurrentDateISO());

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setTargetCents(initialData.targetCents);
      setCurrentCents(initialData.currentCents);
      setDeadline(initialData.deadline);
    } else {
      setTitle('');
      setTargetCents(0);
      setCurrentCents(0);
      setDeadline(getCurrentDateISO());
    }
  }, [initialData, open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || targetCents <= 0) return;
    onSubmit({ title: title.trim(), targetCents, currentCents, deadline });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Editar Meta' : 'Nova Meta'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goal-title">Título</Label>
            <Input
              id="goal-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Reserva de emergência"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal-target">Valor Alvo</Label>
            <CurrencyInput id="goal-target" value={targetCents} onChange={setTargetCents} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal-current">Valor Atual</Label>
            <CurrencyInput id="goal-current" value={currentCents} onChange={setCurrentCents} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal-deadline">Prazo</Label>
            <Input
              id="goal-deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!title.trim() || targetCents <= 0}>
              {initialData ? 'Salvar' : 'Adicionar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
