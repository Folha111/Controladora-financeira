import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ALL_CATEGORIES, type RecurringTransaction } from '@/types';
import { formatCurrency } from '@/utils';
import { isDue, getFrequencyLabel, getNextDueDateFormatted } from '@/utils/recurringUtils';
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Check,
  PauseCircle,
  PlayCircle,
} from 'lucide-react';
import { EmptyState } from '@/components/shared/EmptyState';

interface RecurringListProps {
  recurringTransactions: RecurringTransaction[];
  onApply: (id: string) => void;
  onEdit: (rt: RecurringTransaction) => void;
  onToggleActive: (rt: RecurringTransaction) => void;
  onDelete: (id: string) => void;
}

export function RecurringList({
  recurringTransactions,
  onApply,
  onEdit,
  onToggleActive,
  onDelete,
}: RecurringListProps) {
  if (recurringTransactions.length === 0) {
    return (
      <EmptyState
        title="Nenhuma recorrência cadastrada"
        description="Adicione uma recorrência para não esquecer de lançar despesas ou receitas fixas"
      />
    );
  }

  return (
    <div className="space-y-2">
      {recurringTransactions.map((rt) => {
        const cat = ALL_CATEGORIES[rt.category];
        const isIncome = rt.type === 'income';
        const pending = isDue(rt);

        return (
          <div
            key={rt.id}
            className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent/50"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="hidden h-3 w-3 flex-shrink-0 rounded-full sm:block"
                style={{ backgroundColor: rt.active ? cat.color : '#d1d5db' }}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium">{rt.description}</p>
                  {!rt.active && (
                    <Badge variant="outline" className="text-xs text-muted-foreground">
                      Pausada
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground text-xs">
                  {cat.label} &middot; {getFrequencyLabel(rt.frequency)}
                  {rt.active && (
                    <>
                      {' '}
                      &middot;{' '}
                      <span className={pending ? 'text-orange-500 font-medium' : 'text-emerald-600'}>
                        {pending ? 'Pendente' : `Próx. ${getNextDueDateFormatted(rt)}`}
                      </span>
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge
                variant={isIncome ? 'default' : 'destructive'}
                className="whitespace-nowrap font-mono text-xs"
              >
                {isIncome ? '+' : '-'} {formatCurrency(rt.amountCents)}
              </Badge>

              {rt.active && pending && (
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1 border-orange-400 text-orange-600 hover:bg-orange-50 hover:text-orange-700"
                  onClick={() => onApply(rt.id)}
                >
                  <Check className="h-3.5 w-3.5" />
                  Aplicar
                </Button>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(rt)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onToggleActive(rt)}>
                    {rt.active ? (
                      <>
                        <PauseCircle className="mr-2 h-4 w-4" />
                        Pausar
                      </>
                    ) : (
                      <>
                        <PlayCircle className="mr-2 h-4 w-4" />
                        Ativar
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => onDelete(rt.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        );
      })}
    </div>
  );
}
