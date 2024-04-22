import { auth, db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = doc(db, 'users', userAuth.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setCurrentUser({ uid: userAuth.uid, ...docSnap.data() });
        } else {
          // docSnap.data() will be undefined in this case
          console.log('No user found!');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return currentUser;
};

export default useCurrentUser;
