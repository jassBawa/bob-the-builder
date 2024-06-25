'use client';
import { Button } from '@/components/ui/button';
import { db } from '@/firebase';
import useCurrentUser from '@/hooks/useCurrentUser';
import useOrganisationStore from '@/hooks/useOrganisation';
import { addDoc, collection } from 'firebase/firestore';
import { useEffect } from 'react';
import { toast } from 'sonner';

function Page({ params }) {
  const { orgId } = params;
  const { organisation, fetchOrganisation, buildings, isLoading } =
    useOrganisationStore();

  const currentUser = useCurrentUser('officer');

  console.log('organisation', organisation);
  useEffect(() => {
    fetchOrganisation(orgId);
  }, [orgId]);

  if (isLoading) {
    return (
      <h2 className="flex justify-center items-center h-screen">
        Loading......
      </h2>
    );
  }

  const handleRequestAccess = async (buildingId) => {
    if (!buildingId && !buildings) return;
    const requestRef = collection(db, 'requests');
    const building = buildings?.find((b) => b.buildingId === buildingId);
    const newRequest = {
      buildingId,
      buildingName: building.buildingName,
      buildingUse: building.buildingUse,
      organisationId: orgId,
      officerId: currentUser.uid,
      status: 'pending',
      //   Optional: timestamp (server-generated timestamp on document creation)
    };
    try {
      console.log(newRequest);
      await addDoc(requestRef, newRequest).then(() => {
        toast.success('Request successfully sent!');
      });
    } catch (error) {
      console.error('Error sending request:', error);
      // Handle errors (e.g., display error message)
    }
  };
  console.log(buildings);

  return (
    <div className="p-8">
      <div className="mt-16 px-4 py-4 rounded bg-white">
        <h2 className="text-4xl font-semibold">
          Basic details about the organisation
        </h2>
        <div className="mt-8 bg-slate-200 rounded p-4">
          <p className="text-2xl font-semibold">
            Name:
            <span className="text-xl ml-4 font-semibold">
              {organisation?.name}
            </span>
          </p>
          <p className="text-lg my-4">
            Address:
            <span className="text-xl ml-4 font-semibold">
              {organisation?.organisationAddress}
            </span>
          </p>
          <p className="text-lg my-4">
            Pincode:
            <span className="text-xl ml-4 font-semibold">
              {organisation?.pincode}
            </span>
          </p>
        </div>
      </div>
      <div className="bg-white rounded mt-4 px-4 py-16">
        <h3 className="text-xl font-semibold mb-8">
          List of buildings under {organisation?.name}
        </h3>
        {buildings?.map((building) => {
          return (
            <div
              key={building.id}
              className="flex justify-between bg-slate-100 px-4 py-2 shadow-sm mt-4"
            >
              <p>{building.buildingName}</p>
              <p>{building.yearOfConstruction}</p>

              <Button onClick={() => handleRequestAccess(building.buildingId)}>
                Request access
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Page;
