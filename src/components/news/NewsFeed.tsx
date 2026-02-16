import { useEffect, useRef } from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Trash2 } from 'lucide-react';
import type { NewsMessage } from '@/types';
import { Button } from '@/components/ui/button';

interface NewsFeedProps {
  messages: NewsMessage[];
  isModerator: boolean;
  onDelete: (id: string) => void;
}

export function NewsFeed({ messages, isModerator, onDelete }: NewsFeedProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length]);

  if (messages.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-muted-foreground text-sm">
          Nenhuma notícia publicada ainda.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 overflow-auto pr-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="bg-card rounded-lg border p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-sm font-bold text-white">
                {msg.author.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{msg.author}</span>
                  <span className="text-muted-foreground text-xs">
                    {format(parseISO(msg.createdAt), "dd MMM yyyy 'às' HH:mm", {
                      locale: ptBR,
                    })}
                  </span>
                </div>
                <p className="mt-1 text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
            {isModerator && (
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive h-8 w-8 shrink-0"
                onClick={() => onDelete(msg.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
