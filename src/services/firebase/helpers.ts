import { collection, doc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function getCurrentUser(): string {
  const stored = localStorage.getItem('auth');
  if (stored) {
    try {
      return JSON.parse(stored).user ?? 'anonymous';
    } catch {
      return 'anonymous';
    }
  }
  return 'anonymous';
}

export function getUserCollection(collectionName: string) {
  return collection(db, 'users', getCurrentUser(), collectionName);
}

export function getUserDoc(collectionName: string, id: string) {
  return doc(db, 'users', getCurrentUser(), collectionName, id);
}

export async function clearCollection(collectionName: string) {
  const snapshot = await getDocs(getUserCollection(collectionName));
  const batch = writeBatch(db);
  snapshot.docs.forEach((d) => batch.delete(d.ref));
  await batch.commit();
}
