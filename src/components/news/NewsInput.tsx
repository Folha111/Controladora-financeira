import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NewsInputProps {
  onSend: (content: string) => void;
}

export function NewsInput({ onSend }: NewsInputProps) {
  const [content, setContent] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setContent('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 border-t pt-4">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Escreva uma notícia..."
        className="border-input bg-background placeholder:text-muted-foreground flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-600"
      />
      <Button type="submit" size="icon" disabled={!content.trim()}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
