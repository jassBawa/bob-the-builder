import { Document, Page } from "@react-pdf/renderer";

const PdfViewer = ({ pdfBuffer }) => {
  console.log(pdfBuffer);

  return (
    // <Document file={pdfBuffer}>
    //   {Array.from({ length: pdfBuffer?.length }, (_, pageNumber) => (
    //     <Page key={pageNumber} pageNumber={pageNumber + 1} />
    //   ))}
    // </Document>
    <h2>hl</h2>
  );
};

export default PdfViewer;
