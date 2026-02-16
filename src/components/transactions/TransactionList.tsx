import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ALL_CATEGORIES, type Transaction } from '@/types';
import { formatCurrency, formatDate } from '@/utils';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { EmptyState } from '@/components/shared/EmptyState';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
}

export function TransactionList({
  transactions,
  onEdit,
  onDelete,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <EmptyState
        title="Nenhuma transação encontrada"
        description="Adicione uma transação ou altere os filtros"
      />
    );
  }

  return (
    <div className="space-y-2">
      {transactions.map((t) => {
        const cat = ALL_CATEGORIES[t.category];
        const isIncome = t.type === 'income';
        return (
          <div
            key={t.id}
            className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent/50"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="hidden h-3 w-3 flex-shrink-0 rounded-full sm:block"
                style={{ backgroundColor: cat.color }}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{t.description}</p>
                <p className="text-muted-foreground text-xs">
                  {cat.label} &middot; {formatDate(t.date)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={isIncome ? 'default' : 'destructive'}
                className="whitespace-nowrap font-mono text-xs"
              >
                {isIncome ? '+' : '-'} {formatCurrency(t.amountCents)}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(t)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => onDelete(t.id)}
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
