import {
  collection,
  getDocs,
  query,
  where,
  documentId,
} from "firebase/firestore/lite";
import { db } from "../../util/firebase";

/**
 * Get all of the items that are in the cart
 * @param {string[]} cartArray
 */
export const getAllCartItems = async (cartArray) => {
  // Remove the quantity and put just ids into a new array
  const cartIds = cartArray.map((item) => item.id);

  if (cartIds.length <= 0 || !cartIds) {
    return null;
  }

  const q = query(collection(db, "bikes"), where(documentId(), "in", cartIds));

  const cartSnapshot = await getDocs(q);

  return cartSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
