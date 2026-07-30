import { addDoc, getDoc, getDocs, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { getUserCollection, getUserDoc, clearCollection } from './helpers';
import type { Transaction } from '@/types';
import type { ITransactionService } from '../interfaces';

export const firestoreTransactionService: ITransactionService = {
  async getAll() {
    const q = query(getUserCollection('transactions'), orderBy('date', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Transaction));
  },

  async create(input) {
    const data = { ...input, createdAt: new Date().toISOString() };
    const ref = await addDoc(getUserCollection('transactions'), data);
    return { ...data, id: ref.id };
  },

  async update(id, updates) {
    const ref = getUserDoc('transactions', id);
    await updateDoc(ref, updates as Record<string, unknown>);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error('Transação não encontrada');
    return { id: snap.id, ...snap.data() } as Transaction;
  },

  async delete(id) {
    await deleteDoc(getUserDoc('transactions', id));
  },

  async clearAll() {
    await clearCollection('transactions');
  },
};
