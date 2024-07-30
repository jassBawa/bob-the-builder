'use client';
import NDTForm from '@/components/forms/officer/NDTForm';
import { db } from '@/firebase';
import useBuildingDta from '@/hooks/useBuildingData';
import useCurrentUser from '@/hooks/useCurrentUser';
import { doc, getDoc } from 'firebase/firestore';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

function Page() {
  const {
    setReboundData,
    setCapoData,
    setUpvData,
    setHalfCellData,
    setGeneralObservationsData,
  } = useBuildingDta();
  const pathName = usePathname();
  const officer = useCurrentUser('officer');
  const officerId = useMemo(() => officer?.uid, [officer]);
  const segments = useMemo(() => pathName?.split('/'), [pathName]);

  // let segments = pathName.split('/');

  useEffect(() => {
    if (!officerId) return;
    console.log(segments, officerId);
    let organisationId = segments[3];
    let buildingId = segments[5];
    const reportId = `${buildingId}_${officerId}`;
    console.log(reportId);

    const fetchReportData = async () => {
      const reportRef = doc(db, 'officer', officerId, 'reports', reportId);
      const docSnap = await getDoc(reportRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data);
        setGeneralObservationsData(data.generalObservationsData);
        setReboundData(data?.ndtdata?.inSitu.reboundHammer);
        setCapoData(data?.ndtdata?.inSitu.capo);
        setUpvData(data?.ndtdata?.inSitu.USPV);
        setHalfCellData(data?.ndtdata?.corrosion.halfCellPotential);
      } else {
        console.log('No such document!');
      }
    };
    try {
      fetchReportData();
    } catch (err) {
      console.log(err);
    }
  }, [officerId, segments]);

  return (
    <div className="my-16 mx-8 rounded bg-white">
      <NDTForm />
    </div>
  );
}

export default Page;
