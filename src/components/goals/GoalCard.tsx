import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Goal } from '@/types';
import { formatCurrency, formatDate } from '@/utils';
import { getGoalProgress } from '@/utils/calculations';
import { MoreHorizontal, Pencil, Trash2, CheckCircle2, Clock } from 'lucide-react';

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
}

export function GoalCard({ goal, onEdit, onDelete }: GoalCardProps) {
  const progress = getGoalProgress(goal);
  const isComplete = progress >= 100;
  const isOverdue = new Date(goal.deadline) < new Date() && !isComplete;

  return (
    <Card className={isComplete ? 'border-emerald-500' : isOverdue ? 'border-amber-500' : ''}>
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div>
          <CardTitle className="text-base">{goal.title}</CardTitle>
          <div className="mt-1 flex items-center gap-2">
            {isComplete ? (
              <Badge className="bg-emerald-100 text-emerald-800 text-xs">
                <CheckCircle2 className="mr-1 h-3 w-3" />
                Concluída
              </Badge>
            ) : isOverdue ? (
              <Badge variant="outline" className="border-amber-500 text-amber-600 text-xs">
                <Clock className="mr-1 h-3 w-3" />
                Atrasada
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs">
                <Clock className="mr-1 h-3 w-3" />
                Prazo: {formatDate(goal.deadline)}
              </Badge>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(goal)}>
              <Pencil className="mr-2 h-4 w-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-destructive"
              onClick={() => onDelete(goal.id)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className={`h-2 ${isComplete ? '[&>div]:bg-emerald-500' : ''}`} />
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          <span>{formatCurrency(goal.currentCents)}</span>
          <span>{progress.toFixed(0)}%</span>
          <span>{formatCurrency(goal.targetCents)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
