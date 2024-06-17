'use client';
import { useEffect, useMemo, useState } from 'react';
import { db } from '@/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import downloadPDF from '@/lib/downloadReport';
import { PDFViewer } from '@react-pdf/renderer';
import ReportFile from '@/components/shared/ReportFile';
import { usePathname, useRouter } from 'next/navigation';
import useCurrentUser from '@/hooks/useCurrentUser';

const ReportPage = ({reportId}) => {
  // console.log(reportId);
  const [reportData, setReportData] = useState(null);
  const pathName = usePathname();
  const org = useCurrentUser();
  const orgId = useMemo(() => org?.uid, [org]);
  const segments = useMemo(() => pathName?.split('/'), [pathName]);


  useEffect(() => {
    if(!orgId) return;
    console.log(segments, orgId);
    let organisationId = segments[3];
    let reportId = segments[2];
    // const reportId = `${buildingId}`;
    console.log(reportId);

    const fetchReportData = async () => {
    
      const reportRef = doc(
        db,
        'organisation',
        orgId,
        'reports',
        reportId
      );

      console.log(reportId);

console.log(reportRef);
      const docSnap = await getDoc(reportRef);

      if (docSnap.exists()) {
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
  }, [orgId, reportId]);

  const handleDownload = () => {
    downloadPDF(reportData);
  };

  return (
    <div>
      {reportData ? (
        <div className="overflow-y-auto">
          <PDFViewer style={{ width: '100%', height: '600px' }}>
            <ReportFile reportData={reportData} />
          </PDFViewer>
          <button onClick={handleDownload}>Download PDF</button>
        </div>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default ReportPage;
