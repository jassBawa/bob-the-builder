'use client';
import { db } from '@/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

function Page({ params }) {
  const { orgId, buildingId } = params;

  const [building, setbuilding] = useState(null); // State for specific building details

  useEffect(() => {
    if (!orgId && !buildingId) {
      return;
    }

    const fetchDetails = async () => {
      const details = await fetchBuildingDetails(orgId, buildingId);
      setbuilding(details); // Update building details state
    };
    fetchDetails();
  }, [orgId, buildingId]);

  console.log(building);
  return (
    <div className="mt-16 mx-8 rounded bg-white">
      <h2 className="text-2xl font-semibold">Welcome back, name</h2>
      <p className="text-sm">Track and Manage your information</p>

      <div className=" overflow-scroll">
        <div className="mt-4 mx-8 p-8 rounded bg-white grid grid-cols-2 gap-8">
          <ViewItem label={'Building ID'} value={building?.buildingId} />
          <ViewItem label={'Building Use'} value={building?.buildingUse} />

          <ViewItem label={'Building Name'} value={building?.buildingName} />
          <ViewItem label={'Story heights'} value={building?.storyHeights} />
          <ViewItem
            label={'Total build up area'}
            value={building?.totalBuiltUpArea}
          />
          <ViewItem
            label={'Dampness Cracks'}
            value={`${building?.dampnessCracks}`}
          />

          <div className="col-span-2">
            <p className="text-2xl  text-slate-600 font-semibold">
              Structural Report File
            </p>

            <iframe
              src={building?.structuralReportUrl}
              frameborder="0"
              className="w-full h-72"
            ></iframe>
            {/* <PdfViewer /> */}
          </div>
          <div className="col-span-2">
            <p className="text-2xl  text-slate-600 font-semibold">
              Geo Report File
            </p>

            <iframe
              src={building?.georeportUrl}
              frameborder="0"
              className="w-full h-72"
            ></iframe>
            {/* <PdfViewer /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

const fetchBuildingDetails = async (orgId, buildingId) => {
  console.log(orgId, buildingId);
  if (!orgId || !buildingId) return null; // Handle cases where orgId or buildingId is missing

  const buildingsRef = collection(db, `organisation/${orgId}/buildings`);

  const q = query(buildingsRef, where('buildingId', '==', buildingId)); // Filter by buildingId

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn('Building not found in organisation:', orgId, buildingId);
      return null; // Handle case where no building matches the ID
    } else {
      // Assuming there should be only one matching building (due to the query)
      const buildingData = querySnapshot.docs[0].data(); // Extract data from the first document
      console.log('Building details:', buildingData);
      return buildingData; // Return the matching building data
    }
  } catch (error) {
    console.error('Error fetching building details:', error);
    return null; // Handle errors gracefully (e.g., display an error message)
  }
};

const ViewItem = ({ label, value }) => {
  return (
    <div>
      <p className="text-2xl  text-slate-600 font-semibold">{label}</p>
      <p className="text-xl mt-4">{value}</p>
    </div>
  );
};
