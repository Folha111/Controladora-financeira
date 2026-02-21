import { addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { getUserCollection, getUserDoc, clearCollection } from './helpers';
import type { Budget } from '@/types';
import type { IBudgetService } from '../interfaces';

export const firestoreBudgetService: IBudgetService = {
  async getAll() {
    const snapshot = await getDocs(getUserCollection('budgets'));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Budget));
  },

  async create(input) {
    const ref = await addDoc(getUserCollection('budgets'), input);
    return { ...input, id: ref.id };
  },

  async update(id, updates) {
    const ref = getUserDoc('budgets', id);
    await updateDoc(ref, updates as Record<string, unknown>);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error('Orçamento não encontrado');
    return { id: snap.id, ...snap.data() } as Budget;
  },

  async delete(id) {
    await deleteDoc(getUserDoc('budgets', id));
  },

  async clearAll() {
    await clearCollection('budgets');
  },
};
