import { COLLECTIONS } from '@/constants';
import { Card } from '@models/card';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  QuerySnapshot,
  startAfter,
} from 'firebase/firestore';
import { store } from './firebase';

export const getCards = async (pageParam?: QuerySnapshot<Card>) => {
  const cardQuery =
    pageParam == null
      ? query(collection(store, COLLECTIONS.CARD), limit(15))
      : query(
          collection(store, COLLECTIONS.CARD),
          startAfter(pageParam),
          limit(15),
        );
  const cardSnapshot = await getDocs(cardQuery);

  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1];

  const items = cardSnapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Card),
  }));

  return { items, lastVisible };
};

export const getCard = async (id: string) => {
  const snapshot = await getDoc(doc(store, COLLECTIONS.CARD, id));

  return {
    id,
    ...(snapshot.data() as Card),
  };
};
