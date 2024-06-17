import { collection, query, where, getDocs } from 'firebase/firestore'; // Firebase imports
import { db } from '@/firebase';
import { useState } from 'react';

const usePendingRequests = async (orgId) => {
  if (!orgId) return [];
  const requestsRef = collection(db, 'requests');
  const q = query(requestsRef, where('organisationId', '==', orgId));

  try {
    const querySnapshot = await getDocs(q);

    const pendingRequests = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return pendingRequests;
  } catch (error) {
    console.error('Error fetching pending requests:', error);
    return []; // Handle errors by returning an empty array (or display an error message)
  }
};

export default usePendingRequests;
