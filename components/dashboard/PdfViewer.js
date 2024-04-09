// import { Document, Page } from "@react-pdf/renderer";
import { PDFDocument } from "pdf-lib";
import { useEffect } from "react";

const PdfViewer = ({ pdfBuffer }) => {
  console.log(pdfBuffer);
  // async function flattenForm() {
  //   const pdfDoc = await PDFDocument.load(pdfBuffer);
  //   try {
  //     if (pdfBuffer) {
  //       await PDFDocument.load(pdfBuffer); // Attempt to load the PDF
  //       console.log("Buffer appears to be a valid PDF.");
  //     }
  //   } catch (error) {
  //     console.error("Error parsing PDF buffer:", error);
  //     // Handle parsing failure gracefully (e.g., display an error message)
  //   }

  //   const form = pdfDoc.getForm();

  //   form.getTextField("Text1").setText("Some Text");
  //   form.getRadioGroup("Group2").select("Choice1");
  //   form.getRadioGroup("Group3").select("Choice3");
  //   form.getRadioGroup("Group4").select("Choice1");
  //   form.getCheckBox("Check Box3").check();
  //   form.getCheckBox("Check Box4").uncheck();
  //   form.getDropdown("Dropdown7").select("Infinity");
  //   form.getOptionList("List Box6").select("Honda");

  //   form.flatten();

  //   const pdfBytes = await pdfDoc.save();
  // }

  useEffect(() => {
    // flattenForm();
  }, [pdfBuffer]);

  // useEffect(() => {
  //   const blob = new Blob([pdfBuffer], { type: "application/pdf" });
  //   const link = document.createElement("a");
  //   link.href = window.URL.createObjectURL(blob);
  //   link.download = "test.pdf";
  //   link.click();
  // }, [pdfBuffer]);
  return (
    // <Document file={pdfBuffer} style={{ width: "100%", height: "500px" }}>
    //   <Page pagenumber={1} />
    // </Document>
    <></>
  );
};

export default PdfViewer;
