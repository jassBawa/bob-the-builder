import { storage } from '@/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export async function uploadFile(
  storage,
  userId,
  file,
  fileNamePrefix,
  dateString
) {
  if (file === null || !file) return '';
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
  console.log(downloadURL);
  return downloadURL;
}

export const uploadImages = async (file) => {
  console.log(file);
  let extension = '';
  console.log(file);
  if (!file.name) {
    extension = 'JPG';
  } else {
    extension = file.name?.split('.').pop();
  }
  const randomFilename =
    Math.random().toString(36).substring(2, 15) + '.' + extension;
  console.log(randomFilename);
  const path = `audits/${randomFilename}`;

  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

export default uploadFile;
