import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EXPENSE_CATEGORIES, type Budget, type Transaction } from '@/types';
import { formatCurrency } from '@/utils';
import { getBudgetProgress } from '@/utils/calculations';
import { MoreHorizontal, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import { EmptyState } from '@/components/shared/EmptyState';

interface BudgetListProps {
  budgets: Budget[];
  transactions: Transaction[];
  onEdit: (budget: Budget) => void;
  onDelete: (id: string) => void;
}

export function BudgetList({
  budgets,
  transactions,
  onEdit,
  onDelete,
}: BudgetListProps) {
  if (budgets.length === 0) {
    return (
      <EmptyState
        title="Nenhum orçamento definido"
        description="Defina limites de gastos por categoria"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {budgets.map((budget) => {
        const cat = EXPENSE_CATEGORIES[budget.category];
        const { spent, limit, percentage } = getBudgetProgress(
          budget,
          transactions
        );
        const isOver = spent > limit;

        return (
          <Card key={budget.id} className={isOver ? 'border-destructive' : ''}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-sm font-medium">{cat.label}</span>
                </div>
                <div className="flex items-center gap-1">
                  {isOver && (
                    <Badge variant="destructive" className="text-xs">
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      Excedido
                    </Badge>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(budget)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => onDelete(budget.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <Progress
                value={percentage}
                className={`h-2 ${isOver ? '[&>div]:bg-destructive' : ''}`}
              />

              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>{formatCurrency(spent)} gasto</span>
                <span>de {formatCurrency(limit)}</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
