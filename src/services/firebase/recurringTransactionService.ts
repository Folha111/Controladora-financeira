import { addDoc, getDoc, getDocs, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { getUserCollection, getUserDoc } from './helpers';
import type { RecurringTransaction } from '@/types';
import type { IRecurringTransactionService } from '../interfaces';

export const firestoreRecurringTransactionService: IRecurringTransactionService = {
  async getAll() {
    const q = query(getUserCollection('recurringTransactions'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as RecurringTransaction));
  },

  async create(input) {
    const data = { ...input, createdAt: new Date().toISOString() };
    const ref = await addDoc(getUserCollection('recurringTransactions'), data);
    return { ...data, id: ref.id };
  },

  async update(id, updates) {
    const ref = getUserDoc('recurringTransactions', id);
    await updateDoc(ref, updates as Record<string, unknown>);
    const snap = await getDoc(ref);
    if (!snap.exists()) throw new Error('Transação recorrente não encontrada');
    return { id: snap.id, ...snap.data() } as RecurringTransaction;
  },

  async delete(id) {
    await deleteDoc(getUserDoc('recurringTransactions', id));
  },
};
