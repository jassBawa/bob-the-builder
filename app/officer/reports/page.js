'use client';

import useCurrentUser from '@/hooks/useCurrentUser';
import useFetchReports from '@/hooks/useFetchReports';
import { useRouter } from 'next/navigation';

function Page() {
  const { reports, loading, error } = useFetchReports('officer');
  const router = useRouter();

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleReportClick = (reportId) => {
    router.push(`/requests/${reportId}`);
  };

  return (
    <div className="mt-8 mx-8 p-12 rounded bg-white min-h-full">
      <h3 className="relative group text-3xl font-semibold flex gap-2">
        Audit Reports
      </h3>

      <div className="mt-4">
        {loading ? <div>Loading...</div> : null}
        <ul>
          {reports.map((report) => (
            <li key={report.id} onClick={() => handleReportClick(report.id)}>
              {report.buildingId} - {report.timestamp}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Page;
