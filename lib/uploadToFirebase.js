import { storage } from '@/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export async function uploadFile(
  storage,
  userId,
  file,
  fileNamePrefix,
  dateString
) {
  // Generate a unique filename using generateId

  //   const dateString = `${date.getFullYear()}-${
  //     date.getMonth() + 1
  //   }-${date.getDate()}-${date.toLocaleDateString('en-US', {
  //     weekday: 'short',
  //   })}`; // YYYY-MM-DD-DOW

  const filesRef = `user-buildings/${userId}/${dateString}/${fileNamePrefix}`;

  const storageRef = ref(storage, filesRef);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
}



export const uploadImages = async (file, path) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

export default uploadFile;
