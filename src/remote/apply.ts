import { COLLECTIONS } from '@/constants';
import { ApplyValues } from '@models/apply';
import {
  addDoc,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { store } from './firebase';

export const applyCard = async (applyValues: ApplyValues) => {
  const docRef = await addDoc(
    collection(store, COLLECTIONS.CARD_APPLY),
    applyValues,
  );
  return docRef;
};

export async function updataApplyCard({
  cardId,
  userId,
  applyValues,
}: {
  cardId: string;
  userId: string;
  applyValues: Partial<ApplyValues>;
}) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  );

  const [applied] = snapshot.docs;

  updateDoc(applied.ref, applyValues);
}

export async function getAppliedCard({
  userId,
  cardId,
}: {
  userId: string;
  cardId: string;
}) {
  const snapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.CARD_APPLY),
      where('userId', '==', userId),
      where('cardId', '==', cardId),
    ),
  );

  if (snapshot.docs.length === 0) {
    return null;
  }

  const [applied] = snapshot.docs;

  return applied.data() as ApplyValues;
}
