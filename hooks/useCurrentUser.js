'use client';
import { auth, db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
// import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useCurrentUser = (role = 'organisation') => {
  const [currentUser, setCurrentUser] = useState(null);
  // const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = doc(db, role, userAuth.uid);
        const docSnap = await getDoc(userRef);

        if (docSnap.exists()) {
          setCurrentUser({ uid: userAuth.uid, role, ...docSnap.data() });
        } else {
          // docSnap.data() will be undefined in this case
          console.log('No user found!');
        }
      }
    });

    return () => unsubscribe();
  }, [role]);

  return currentUser;
};

export default useCurrentUser;
