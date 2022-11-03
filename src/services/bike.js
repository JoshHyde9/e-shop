import { collection, getDocs } from "firebase/firestore/lite";

import { db } from "../../util/firebase";

export const getAllBiikes = async () => {
  const bikeSnapshot = await getDocs(collection(db, "bikes"));

  return bikeSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
