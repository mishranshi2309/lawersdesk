import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

function AffidavitForMarriage() {
  const inputRef = useRef(null);
  const generatePdf = () =>{
    console.log("Generating");
    html2canvas(inputRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "JPEG", 0, 0 , width, height);
      pdf.save("affidavit.pdf");
    });
  }
 
  return (
    <div>
    <div className="p-2 m-5" id="divToPrint" ref={inputRef}>
      <center>Precedent No. 2</center>
      <div>AFFIDAVIT: ISSUE OF NOTICE BEFORE THE HON'BLE SUBORDINATE JUDGE'S COURT,
      E.P. No of 20 In O.S. No of 20 Decree-Holder: Vs. Judgment-Debtors:
      AFFIDAVIT I, <p contentEditable="true">YOUR NAME</p>, S/o ,
      <p contentEditable="true"> NAME</p>
      aged years, General Manager Pvt. Ltd., do hereby solemnly affirm and state
      as follows:— 1. I am the General-Manager of the Decree-Holder Company. I
      am well acquainted with the facts of the case stand fully competent and
      duly authorised to swear to this affidavit on behalf of the
      Petitioner-decree holder. 2. It is respectfully submitted that the
      property of the judgment-debtors has already been attached in execution as
      per the order dated I.A. No of of this Hon'ble Court. The
      judgment-debtors, inspite of having sufficient means, are deliberately not
      making payment in discharge of the decree-debt. It was very well possible
      for them to pay the decretal amount in lump sum had they wanted to do so,
      but are defaulting deliberately. Therefore, the best possible option to
      exercise in the present situation would be to bring about the sale of the
      judgment-debtor's attached property. 3. It is, therefore, just and
      necessary that this Hon'ble Court may be pleased to bring the attached
      properties scheduled to the accompanying application to sale by issuing
      Order XXI, rule 66 notice to them. It is verified that the facts stated
      above are true to the best of my knowledge, information and belief. Sd./
      Deponent Verification I, the abovenamed deponent, verify that the contents
      of this affidavit are true to the best of my knowledge, belief and as per
      the information received by me by experts and nothing material has been
      concealed therefrom. Date:<p contentEditable="true">YOU NAME</p>
      Place:<p contentEditable="true">YOU NAME</p>
      Sd./ Deponent Signed and affirmed before my presence by the abovenamed
      deponent who personally known to me, on this the day of ,20 Sd./
      <b>
        <p contentEditable="true">YOU NAME</p>
      </b>
      Counsel for the deponent Note.—Affidavit to be attested by the appropriate
      authority prescribed under law.</div>
    </div>
    <button className="btn btn-primary" onClick={generatePdf}>Confirm & Download</button>
    </div>
  );
}

export default AffidavitForMarriage;
