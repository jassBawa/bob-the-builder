'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import downloadPDF from '@/lib/downloadReport';
import { PDFViewer } from '@react-pdf/renderer';
import ReportFile from '@/components/shared/ReportFile';
import { usePathname, useRouter } from 'next/navigation';
import useCurrentUser from '@/hooks/useCurrentUser';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui/table';

const ReportPage = () => {
  const [reportData, setReportData] = useState(null);
  const [reboundData, setReboundData] = useState(null);
  const pathName = usePathname();
  const officer = useCurrentUser('officer');
  const officerId = useMemo(() => officer?.uid, [officer]);
  const segments = useMemo(() => pathName?.split('/'), [pathName]);
  const {
    reboundHammer,
    unsafeGroundData,
    unsafeFirstFloorData,
    unsafeSecondFloorData,
  } = useReboundHammerData(reportData);
  console.log(reboundHammer, unsafeFirstFloorData);
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
        setReboundData(data.ndtdata.inSitu.reboundHammer);
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
        <div className="overflow-y-auto m-8 rounded-xl bg-white p-4">
          <h3>Results</h3>
          <Table className="w-full">
            <TableHead>
              <TableRow>
                <TableCell className="text-left">Location</TableCell>
                <TableCell className="text-left">Element</TableCell>
                <TableCell className="text-left">
                  Assumed Grade Of Concrete
                </TableCell>
                <TableCell className="text-left">
                  Average Compressive Strength Of Concrete
                </TableCell>
                <TableCell className="text-left">DCRatio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                {unsafeFirstFloorData?.map((data, index) => (
                  <React.Fragment key={index}>
                    <TableCell className="text-left">{data.location}</TableCell>
                    <TableCell className="text-left">{data.element}</TableCell>
                    <TableCell className="text-left">{data.grade}</TableCell>
                    <TableCell className="text-left">
                      {data.rhTestResults}
                    </TableCell>
                    <TableCell className="text-left">{data.DCStatus}</TableCell>
                  </React.Fragment>
                ))}
              </TableRow>
              {/* {unsafeFirstFloorData?.map((data, index) => (
                <TableRow key={index}>
                  <TableCell className="text-left">{data.location}</TableCell>
                  <TableCell className="text-left">{data.element}</TableCell>
                  <TableCell className="text-left">{data.grade}</TableCell>
                  <TableCell className="text-left">
                    {data.rhTestResults}
                  </TableCell>
                  <TableCell className="text-left">{data.DCStatus}</TableCell>
                </TableRow>
              ))}
              {unsafeSecondFloorData?.map((data, index) => (
                <TableRow key={index}>
                  <TableCell className="text-left">{data.location}</TableCell>
                  <TableCell className="text-left">{data.element}</TableCell>
                  <TableCell className="text-left">{data.grade}</TableCell>
                  <TableCell className="text-left">
                    {data.rhTestResults}
                  </TableCell>
                  <TableCell className="text-left">{data.DCStatus}</TableCell>
                </TableRow>
              ))} */}
            </TableBody>
          </Table>
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default ReportPage;

const useReboundHammerData = (reportData) => {
  const reboundHammer = useMemo(
    () => reportData?.ndtdata?.inSitu.reboundHammer,
    [reportData]
  );

  const getUnsafeDataForFloor = (floor) => {
    if (!reboundHammer || !reboundHammer[floor]) return [];
    return reboundHammer[floor].filter((item) => item.DCStatus === 'unsafe');
  };

  const unsafeGroundData = getUnsafeDataForFloor('ground');
  const unsafeFirstFloorData = getUnsafeDataForFloor('first');
  const unsafeSecondFloorData = getUnsafeDataForFloor('second');

  return {
    reboundHammer,
    unsafeGroundData,
    unsafeFirstFloorData,
    unsafeSecondFloorData,
  };
};
