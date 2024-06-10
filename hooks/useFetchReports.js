import { db } from '@/firebase';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import useCurrentUser from './useCurrentUser';

const useFetchReports = (userType) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useCurrentUser(userType);

  useEffect(() => {
    if (!user) return;

    const fetchReports = async () => {
      try {
        console.log(user);
        const { role } = user;
        const userId = user?.uid;

        let reportsRef;

        // Determine the collection path based on the user role
        if (role === 'organisation') {
          let userRef = doc(db, 'organisation', userId);
          reportsRef = collection(userRef, 'reports');
        } else if (role === 'officer') {
          let userRef = doc(db, 'officer', userId);
          reportsRef = collection(userRef, 'reports');
        } else {
          throw new Error('Unknown user role');
        }

        const q = query(reportsRef);
        console.log(q);

        const querySnapshot = await getDocs(q);
        const reportsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReports(reportsList);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [user, userType]);

  return { reports, loading, error };
};

export default useFetchReports;
