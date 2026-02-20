import { addDoc, getDoc, getDocs, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { getUserCollection, getUserDoc, clearCollection } from './helpers';
import type { Investment } from '@/types';
import type { IInvestmentService } from '../interfaces';

export const firestoreInvestmentService: IInvestmentService = {
  async getAll() {
    const q = query(getUserCollection('investments'), orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Investment));
  },

  async create(input) {
    const data = { ...input, createdAt: new Date().toISOString() };
    const ref = await addDoc(getUserCollection('investments'), data);
    return { ...data, id: ref.id };
  },

  async update(id, updates) {
    const ref = getUserDoc('investments', id);
    await updateDoc(ref, updates as Record<string, unknown>);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error('Investimento não encontrado');
    return { id: snap.id, ...snap.data() } as Investment;
  },

  async delete(id) {
    await deleteDoc(getUserDoc('investments', id));
  },

  async clearAll() {
    await clearCollection('investments');
  },
};
