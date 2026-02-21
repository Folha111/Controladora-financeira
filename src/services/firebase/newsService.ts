import { addDoc, getDocs, deleteDoc, doc, query, orderBy, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { NewsMessage } from '@/types';
import type { INewsService } from '../interfaces';

// News is shared across all users (top-level collection)
function getNewsCollection() {
  return collection(db, 'news');
}

export const firestoreNewsService: INewsService = {
  async getAll() {
    const q = query(getNewsCollection(), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as NewsMessage));
  },

  async create(input) {
    const data = { ...input, createdAt: new Date().toISOString() };
    const ref = await addDoc(getNewsCollection(), data);
    return { ...data, id: ref.id };
  },

  async delete(id) {
    await deleteDoc(doc(db, 'news', id));
  },

  async clearAll() {
    const snapshot = await getDocs(getNewsCollection());
    await Promise.all(snapshot.docs.map((d) => deleteDoc(d.ref)));
  },
};
