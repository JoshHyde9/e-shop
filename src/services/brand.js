import { collection, getDocs, query, where } from "firebase/firestore/lite";

import { db } from "../../util/firebase";
import { undoFixURLParam } from "../utils/parseURLParam";

export const getAllBrands = async () => {
  const brandSnapshot = await getDocs(collection(db, "brands"));

  return brandSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

/**
 * @param {string} brandName
 */
export const getBrandItemsByName = async (brandName) => {
  const param = undoFixURLParam(brandName);

  const bikesRef = collection(db, "bikes");

  const q = query(bikesRef, where("brand", "==", param));

  const querySnapshot = await getDocs(q);

  if (querySnapshot.docs.length <= 0) {
    return null;
  }

  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
