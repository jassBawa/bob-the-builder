'use client';
import CapoResultsTable from '@/components/results/CapoResultsTable';
import HalfCellResultsTable from '@/components/results/HalfCellResultsTable';
import ReboundResultsTable from '@/components/results/ReboundResultsTable';
import UpvResultsTable from '@/components/results/UpvResultsTable';
import { db } from '@/firebase';
import useCurrentUser from '@/hooks/useCurrentUser';
import { doc, getDoc } from 'firebase/firestore';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const ReportPage = () => {
  const [reportData, setReportData] = useState(null);
  const [reboundData, setReboundData] = useState(null);
  const [capoData, setCapoData] = useState(null);
  const [upvData, setUpvData] = useState(null);
  const [halfCellData, setHalfCellData] = useState(null);
  const pathName = usePathname();
  const officer = useCurrentUser('officer');
  const officerId = useMemo(() => officer?.uid, [officer]);
  const segments = useMemo(() => pathName?.split('/'), [pathName]);

  // let segments = pathName.split('/');

  useEffect(() => {
    if (!officerId) return;
    console.log(segments, officerId);
    let organisationId = segments[3];
    let buildingId = segments[4];
    const reportId = `${buildingId}_${officerId}`;
    console.log(reportId);

    const fetchReportData = async () => {
      const reportRef = doc(db, 'officer', officerId, 'reports', reportId);
      const docSnap = await getDoc(reportRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log(data);
        setReboundData(data.ndtdata.inSitu.reboundHammer);
        setCapoData(data.ndtdata.inSitu.capo);
        setUpvData(data.ndtdata.inSitu.USPV);
        setHalfCellData(data.ndtdata.corrosion.halfCellPotential);
        console.log(reboundData);
        setReportData(docSnap.data());
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
    <div>
      {reportData ? (
        <div className="overflow-y-auto m-8 rounded-xl bg-white p-12">
          <h3 className="text-2xl font-semibold">Results</h3>
          <ReboundResultsTable reboundData={reboundData} />
          <CapoResultsTable capoData={capoData} />
          <UpvResultsTable upvData={upvData} />
          <HalfCellResultsTable halfCellData={halfCellData} />
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default ReportPage;
