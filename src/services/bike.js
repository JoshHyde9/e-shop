import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore/lite";

import { db } from "../../util/firebase";

/**
 * Get all of the bikes in the db
 * @returns
 */
export const getAllBiikes = async () => {
  const bikeSnapshot = await getDocs(collection(db, "bikes"));

  return bikeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/**
 * Get a bike by id
 * @param {string} id
 */
export const getBikeById = async (id) => {
  const bikeRef = doc(db, "bikes", id);
  const bikeSnapshot = await getDoc(bikeRef);

  if (!bikeSnapshot.exists()) {
    return null;
  }

  return { id: bikeSnapshot.id, ...bikeSnapshot.data() };
};

/**
 * Get all of the user's favourites
 * @param {string[]} favouritesArray
 */

export const getAllFavourites = async (favouritesArray) => {
  if (favouritesArray.length <= 0 || !favouritesArray) {
    return null;
  }

  const q = query(
    collection(db, "bikes"),
    where(documentId(), "in", favouritesArray)
  );

  const favouritesSnapshot = await getDocs(q);

  return favouritesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
