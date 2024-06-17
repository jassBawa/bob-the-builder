'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { db } from '@/firebase';
import useCurrentUser from '@/hooks/useCurrentUser';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function Page() {
  const currentUser = useCurrentUser('officer');
  const router = useRouter();
  const officerId = currentUser?.uid;
  const [pendingRequests, setPendingRequests] = useState();

  useEffect(() => {
    if (!officerId) return;

    const requestsRef = collection(db, 'requests');
    const q = query(requestsRef, where('officerId', '==', officerId));
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
  }, [officerId]);

  const handleGeneratePdf = () => {};

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
                {req.status === 'accept' ? (
                  <>
                    <Button
                      onClick={() =>
                        router.push(
                          `/officer/view/${req.organisationId}/${req.buildingId}`
                        )
                      }
                    >
                      View{' '}
                    </Button>
                    <DropdownMenu className="ml-4">
                      <DropdownMenuTrigger>Report</DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `/officer/edit/visual/${req.organisationId}/${req.buildingId}`
                            )
                          }
                        >
                          Visual inspection
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(
                              `/officer/edit/ndt/${req.organisationId}/${req.buildingId}`
                            )
                          }
                        >
                          NDT
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => router.push(`/officer/viewReports/${req.organisationId}/${req.buildingId}`)}
                        >
                          Download Report
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </>
                ) : (
                  <span>Wait until request is approved</span>
                )}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default Page;
