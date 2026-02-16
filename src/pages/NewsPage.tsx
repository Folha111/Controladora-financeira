import { toast } from 'sonner';
import { PageHeader } from '@/components/shared/PageHeader';
import { NewsFeed } from '@/components/news/NewsFeed';
import { NewsInput } from '@/components/news/NewsInput';
import { useNews } from '@/hooks/useNews';
import { useAuthStore } from '@/store/authStore';

export function NewsPage() {
  const { messages, add, remove } = useNews();
  const user = useAuthStore((s) => s.user);
  const isModerator = user === 'admin';

  async function handleSend(content: string) {
    await add({ author: user ?? 'anônimo', content });
    toast.success('Notícia publicada');
  }

  async function handleDelete(id: string) {
    await remove(id);
    toast.success('Notícia removida');
  }

  return (
    <div className="flex h-full flex-col space-y-4">
      <PageHeader
        title="Notícias"
        description="Acompanhe as últimas novidades e comunicados"
      />
      <NewsFeed
        messages={messages}
        isModerator={isModerator}
        onDelete={handleDelete}
      />
      {isModerator && <NewsInput onSend={handleSend} />}
    </div>
  );
}
