import { collection, doc, getDocs, query } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export async function fetchBuildingData(db, userId) {
  if (db === undefined) return [];
  const userRef = doc(db, 'organisation', userId);
  const buildingsRef = collection(userRef, 'buildings');
  const q = query(buildingsRef); // Optional: Add filtering or ordering if needed

  const snapshot = await getDocs(q);

  const buildingList = [];
  snapshot.forEach((doc) => {
    const buildingData = doc.data();
    console.log(doc.data());
    buildingList.push({ ...buildingData, id: uuidv4() }); // Assuming "name" field exists in building data
  });
  return buildingList;
}
