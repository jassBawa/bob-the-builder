// import { Document, Page } from "@react-pdf/renderer";
import { PDFDocument } from "pdf-lib";
import { useEffect } from "react";

const PdfViewer = ({ pdfBuffer }) => {
  console.log(pdfBuffer);


  useEffect(() => {
    // flattenForm();
  }, [pdfBuffer]);

  return (
    <Document file={pdfBuffer} style={{ width: "100%", height: "500px" }}>
      <Page pagenumber={1} />
    </Document>
    <></>
  );
};

export default PdfViewer;
