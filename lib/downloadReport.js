import ReportFile from '@/components/shared/ReportFile';
import { pdf, renderToStream } from '@react-pdf/renderer';
import blobStream from 'blob-stream';

const downloadPDF = async (reportData) => {
  const doc = <ReportFile reportData={reportData} />;
  const asPdf = pdf([]); // Create a new PDF instance
  asPdf.updateContainer(doc); // Pass the document to be rendered

  const blob = await asPdf.toBlob(); // Get the PDF as a Blob

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `report_${reportData.buildingId}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default downloadPDF;
