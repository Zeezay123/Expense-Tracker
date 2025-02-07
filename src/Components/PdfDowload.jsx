import React from 'react'
import jspdf from  "jspdf"
import 'jspdf-autotable' 
import iconMapping from './iconMapping'

const PdfDowload = ({transactions, Userdetails}) => {




const handlePdfDownload =(transactions, Userdetails)=>{

const doc = new jspdf();

const {name, email, statementPeriod} = Userdetails;

  doc.setFontSize(14);
  doc.text("Bank Name", 105, 10, { align: "center" });
  doc.setFontSize(10);
  doc.text("Account Statement", 105, 20, { align: "center" });
  doc.line(20, 25, 190, 25); // Separator line



  doc.setFontSize(10);
  doc.text(`Name: ${name}`, 20, 30);
  doc.text(`Account Number: ${email}`, 20, 35);
  doc.text(`Statement Period: ${statementPeriod}`, 20, 40);



//   tabledata

  const tableData = transactions.map((txn) => [
    txn.date,
    txn.name,
    txn.category,
    `$${txn.amount.toFixed(2)}`,
    txn.type.charAt(0).toUpperCase() + txn.type.slice(1),
  ]);

 // Table Header
 const tableHeaders = ["Date", "Description", "Category", "Amount", "Type"];


// Add Aable

    doc.autoTable({
    startY: 50,
    head: [tableHeaders],
    body: tableData,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [200, 200, 200], textColor: 0 },
    bodyStyles: { textColor: 50 },
    alternateRowStyles: { fillColor: [240, 240, 240] },
    columnStyles: {
      3: { halign: "right" }, // Align Amount to the right
    },
  });


  // Footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width - 20,
      doc.internal.pageSize.height - 10
    );
    doc.text(
      "Customer Service: 1-800-123-4567 | www.bankname.com",
      20,
      doc.internal.pageSize.height - 10
    );
  }

  // Save PDF
  doc.save("Account_Statement.pdf");
}

  return (
    <button  onClick={() => handlePdfDownload(transactions, Userdetails)}
    className="flex font-body font-bold text-[12px] border-[1px]
     bg-white rounded shadow-sm px-3 py-2 items-center justify-center gap-1">

        {iconMapping.pdf}PdfDowload</button>
  )
}

export default PdfDowload