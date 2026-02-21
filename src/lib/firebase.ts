import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD6N2OVYlrinx4xHHHsrO10RNkZ-emntgo',
  authDomain: 'fluxor-teste.firebaseapp.com',
  databaseURL: 'https://fluxor-teste-default-rtdb.firebaseio.com',
  projectId: 'fluxor-teste',
  storageBucket: 'fluxor-teste.firebasestorage.app',
  messagingSenderId: '876034352320',
  appId: '1:876034352320:web:1a123abb20210edb343925',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
