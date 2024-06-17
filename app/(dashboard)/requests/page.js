'use client';
import { Button } from '@/components/ui/button';
import { db } from '@/firebase';
import useCurrentUser from '@/hooks/useCurrentUser';
import usePendingRequests from '@/hooks/usePendingRequests';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function Page() {
  const currentUser = useCurrentUser();
  const orgId = currentUser?.uid;
  const [pendingRequests, setPendingRequests] = useState();

  useEffect(() => {
    if (!orgId) return;

    const requestsRef = collection(db, 'requests');
    const q = query(requestsRef, where('organisationId', '==', orgId));
    const fetchPendingRequests = async () => {
      try {
        const querySnapshot = await getDocs(q);
        const pendingRequests = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPendingRequests(pendingRequests);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
        // Handle errors (e.g., display an error message)
      }
    };

    fetchPendingRequests();
  }, [orgId]);
  console.log(pendingRequests);

  const handleAction = async (requestId, action) => {
    if (!requestId || !action || (action !== 'accept' && action !== 'reject')) {
      console.error(
        'Invalid request ID or action. Please provide a valid ID and either "accept" or "reject" action.'
      );
      return; // Handle invalid inputs gracefully (e.g., display an error message)
    }

    try {
      const requestRef = doc(db, 'requests', requestId);
      await updateDoc(requestRef, {
        status: action, // Update the status based on the action
      }).then(() => {
        toast.success('Request updated');
      });
      console.log(`Request with ID ${requestId} successfully ${action}ed`);
    } catch (error) {
      console.error('Error updating request:', error);
      // Handle errors appropriately (e.g., display an error message to the user)
    }
  };
  return (
    <div className="mt-8 mx-8 p-8 rounded bg-white">
      <h2 className="text-2xl font-semibold">Requests</h2>
      <p className="text-sm">List of officer’s accessed the portal</p>
      <table className="mt-16 w-full" border={2}>
        <tr className="flex border-b-2 border-black justify-between items-center  bg-slate-200 p-4 rounded px-8">
          <td>Officer Id</td>
          <td>Status</td>
          <td>Actions</td>
        </tr>
        {pendingRequests?.map((req) => {
          return (
            <tr
              key={req.id}
              className="flex justify-between items-center  bg-slate-200 p-4 rounded px-8"
            >
              <td>{req.officerId}</td>
              <td className="w-min bg-indigo-400 rounded-full px-4 py-2">
                {req.status}
              </td>

              <td className="flex gap-2 ">
                <Button onClick={() => handleAction(req.id, 'accept')}>
                  Accept
                </Button>
                <Button onClick={() => handleAction(req.id, 'reject')}>
                  Reject
                </Button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default Page;
