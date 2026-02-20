import { Bell, X, CheckCheck, AlertTriangle, AlertCircle, Target, Clock, TrendingDown, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotifications } from '@/hooks/useNotifications';
import type { AppNotification, NotificationType } from '@/types';
import { cn } from '@/lib/utils';

const TYPE_CONFIG: Record<
  NotificationType,
  { icon: React.ElementType; color: string; bg: string }
> = {
  budget_exceeded: {
    icon: AlertCircle,
    color: 'text-red-500',
    bg: 'bg-red-50 dark:bg-red-950/40',
  },
  budget_warning: {
    icon: AlertTriangle,
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
  },
  goal_deadline: {
    icon: Clock,
    color: 'text-orange-500',
    bg: 'bg-orange-50 dark:bg-orange-950/40',
  },
  goal_completed: {
    icon: Trophy,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
  },
  recurring_due: {
    icon: Target,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
  },
  health_critical: {
    icon: TrendingDown,
    color: 'text-red-600',
    bg: 'bg-red-50 dark:bg-red-950/40',
  },
};

function NotificationItem({
  notification,
  onDismiss,
  onNavigate,
}: {
  notification: AppNotification;
  onDismiss: () => void;
  onNavigate: () => void;
}) {
  const config = TYPE_CONFIG[notification.type];
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'group relative flex items-start gap-3 rounded-lg p-3 transition-colors',
        config.bg,
        notification.link && 'cursor-pointer hover:opacity-80'
      )}
      onClick={notification.link ? onNavigate : undefined}
    >
      <div className={cn('mt-0.5 shrink-0', config.color)}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium leading-tight">{notification.title}</p>
        <p className="text-muted-foreground mt-0.5 text-xs leading-snug">{notification.message}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          onDismiss();
        }}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}

export function NotificationPanel() {
  const { notifications, count, dismiss, dismissAll } = useNotifications();
  const navigate = useNavigate();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {count > 9 ? '9+' : count}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex items-center gap-2">
            <Bell className="text-muted-foreground h-4 w-4" />
            <span className="font-semibold">Notificações</span>
            {count > 0 && (
              <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </div>
          {count > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground h-7 gap-1 text-xs"
              onClick={dismissAll}
            >
              <CheckCheck className="h-3 w-3" />
              Limpar tudo
            </Button>
          )}
        </div>

        {count === 0 ? (
          <div className="text-muted-foreground flex flex-col items-center gap-2 py-10 text-center">
            <Bell className="h-8 w-8 opacity-30" />
            <p className="text-sm">Nenhuma notificação</p>
            <p className="text-xs opacity-70">Tudo em ordem por aqui!</p>
          </div>
        ) : (
          <ScrollArea className="max-h-96">
            <div className="flex flex-col gap-2 p-3">
              {notifications.map((n) => (
                <NotificationItem
                  key={n.id}
                  notification={n}
                  onDismiss={() => dismiss(n.id)}
                  onNavigate={() => {
                    if (n.link) navigate(n.link);
                  }}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </PopoverContent>
    </Popover>
  );
}
