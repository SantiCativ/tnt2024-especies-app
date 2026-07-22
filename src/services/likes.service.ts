import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

const likesCollection = collection(db, "likes");

const getLikeDocumentId = (
  speciesId: number,
  userId: string
) => `${userId}_${speciesId}`;

/**
 * Agrega un like para una especie.
 */
export const addLike = async (
  speciesId: number,
  userId: string
): Promise<void> => {
  const documentId = getLikeDocumentId(speciesId, userId);
  const likeDocument = doc(likesCollection, documentId);
  await setDoc(likeDocument, {
    speciesId,
    userId,
    createdAt: serverTimestamp(),
  });
};

/**
 * Elimina el like del usuario para una especie.
 */
export const removeLike = async (
  speciesId: number,
  userId: string
): Promise<void> => {
  const documentId = getLikeDocumentId(speciesId, userId);
  const likeDocument = doc(likesCollection, documentId);

  await deleteDoc(likeDocument);
};


export const subscribeToLikes = (
  speciesId: number,
  userId: string | undefined,
  callback: (data: {
    likesCount: number | null;
    hasLiked: boolean;
  }) => void
) => {
  const q = query(
    likesCollection,
    where("speciesId", "==", speciesId)
  );

  return onSnapshot(q, (snapshot) => {
    callback({
      likesCount: snapshot.size,
      hasLiked: userId
        ? snapshot.docs.some(
          doc => doc.id === getLikeDocumentId(speciesId, userId)
        )
        : false
    });
  });
};