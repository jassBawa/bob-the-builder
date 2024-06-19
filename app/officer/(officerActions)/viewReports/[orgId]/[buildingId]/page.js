'use client';
import { useEffect, useMemo, useState } from 'react';
import { db } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import downloadPDF from '@/lib/downloadReport';
import { PDFViewer } from '@react-pdf/renderer';
import ReportFile from '@/components/shared/ReportFile';
import { usePathname, useRouter } from 'next/navigation';
import useCurrentUser from '@/hooks/useCurrentUser';

const ReportPage = () => {
  const [reportData, setReportData] = useState(null);
  const pathName = usePathname();
  const officer = useCurrentUser('officer');
  const officerId = useMemo(() => officer?.uid, [officer]);
  const segments = useMemo(() => pathName?.split('/'), [pathName]);

  // let segments = pathName.split('/');

  useEffect(() => {
    if(!officerId) return;
    console.log(segments, officerId);
    let organisationId = segments[3];
    let buildingId = segments[4];
    const reportId = `${buildingId}_${officerId}`;
    console.log(reportId);

    const fetchReportData = async () => {
      const reportRef = doc(
        db,
        'officer',
        officerId,
        'reports',
        reportId
      );
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
  }, [officerId, segments]);

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
