import type { NewsMessage } from '@/types';

export const mockNews: NewsMessage[] = [
  {
    id: '1',
    author: 'admin',
    content:
      'Bem-vindos ao FLUXOR! Aqui você acompanha as últimas novidades e dicas financeiras.',
    createdAt: '2026-02-10T09:00:00Z',
  },
  {
    id: '2',
    author: 'admin',
    content:
      'Dica: categorize todas as suas despesas para ter uma visão clara do seu orçamento mensal.',
    createdAt: '2026-02-12T14:30:00Z',
  },
  {
    id: '3',
    author: 'admin',
    content:
      'Nova funcionalidade: agora você pode exportar seus relatórios em PDF e CSV na aba Relatórios!',
    createdAt: '2026-02-14T10:15:00Z',
  },
  {
    id: '4',
    author: 'admin',
    content:
      'Lembre-se de revisar suas metas financeiras no início de cada mês. Manter o foco é essencial!',
    createdAt: '2026-02-16T08:00:00Z',
  },
];
