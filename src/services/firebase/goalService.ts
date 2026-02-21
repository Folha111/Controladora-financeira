import { addDoc, getDoc, getDocs, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { getUserCollection, getUserDoc, clearCollection } from './helpers';
import type { Goal } from '@/types';
import type { IGoalService } from '../interfaces';

export const firestoreGoalService: IGoalService = {
  async getAll() {
    const q = query(getUserCollection('goals'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Goal));
  },

  async create(input) {
    const data = { ...input, createdAt: new Date().toISOString() };
    const ref = await addDoc(getUserCollection('goals'), data);
    return { ...data, id: ref.id };
  },

  async update(id, updates) {
    const ref = getUserDoc('goals', id);
    await updateDoc(ref, updates as Record<string, unknown>);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error('Meta não encontrada');
    return { id: snap.id, ...snap.data() } as Goal;
  },

  async delete(id) {
    await deleteDoc(getUserDoc('goals', id));
  },

  async clearAll() {
    await clearCollection('goals');
  },
};
