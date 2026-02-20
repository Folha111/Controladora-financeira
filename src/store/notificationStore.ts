import { create } from 'zustand';
import type { AppNotification } from '@/types';

const STORAGE_KEY = 'notifications_dismissed';

function loadDismissed(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return new Set(JSON.parse(raw) as string[]);
  } catch {
    // ignore
  }
  return new Set();
}

function saveDismissed(ids: Set<string>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
}

interface NotificationStore {
  dismissed: Set<string>;
  dismiss: (id: string) => void;
  dismissAll: (ids: string[]) => void;
  restore: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  dismissed: loadDismissed(),

  dismiss: (id) =>
    set((state) => {
      const next = new Set(state.dismissed);
      next.add(id);
      saveDismissed(next);
      return { dismissed: next };
    }),

  dismissAll: (ids) =>
    set((state) => {
      const next = new Set(state.dismissed);
      ids.forEach((id) => next.add(id));
      saveDismissed(next);
      return { dismissed: next };
    }),

  restore: () => {
    const dismissed = loadDismissed();
    set({ dismissed });
  },
}));

export function useActiveNotifications(all: AppNotification[]) {
  const dismissed = useNotificationStore((s) => s.dismissed);
  return all.filter((n) => !dismissed.has(n.id));
}
