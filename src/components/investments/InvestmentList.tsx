import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { INVESTMENT_TYPES, type Investment } from '@/types';
import { formatCurrency, formatDate } from '@/utils';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { EmptyState } from '@/components/shared/EmptyState';

interface InvestmentListProps {
  investments: Investment[];
  onEdit: (investment: Investment) => void;
  onDelete: (id: string) => void;
}

export function InvestmentList({
  investments,
  onEdit,
  onDelete,
}: InvestmentListProps) {
  if (investments.length === 0) {
    return (
      <EmptyState
        title="Nenhum investimento encontrado"
        description="Adicione um investimento ou altere os filtros"
      />
    );
  }

  return (
    <div className="space-y-2">
      {investments.map((inv) => {
        const meta = INVESTMENT_TYPES[inv.type];
        const returnCents = inv.currentValueCents - inv.amountCents;
        const returnPct =
          inv.amountCents > 0
            ? ((returnCents / inv.amountCents) * 100).toFixed(1)
            : '0.0';
        const isPositive = returnCents >= 0;

        return (
          <div
            key={inv.id}
            className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-accent/50"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="hidden h-3 w-3 flex-shrink-0 rounded-full sm:block"
                style={{ backgroundColor: meta.color }}
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{inv.name}</p>
                <p className="text-muted-foreground text-xs">
                  {meta.label} &middot; {formatDate(inv.date)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-medium">
                  {formatCurrency(inv.currentValueCents)}
                </p>
                <Badge
                  variant={isPositive ? 'default' : 'destructive'}
                  className="text-xs font-mono"
                >
                  {isPositive ? '+' : ''}
                  {returnPct}%
                </Badge>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(inv)}>
                    <Pencil className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => onDelete(inv.id)}
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
