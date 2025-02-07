import React from 'react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import iconMapping from './iconMapping'

const Excel = ({data}) => {

    const handleExcelDownload =()=>{

        
        const worksheet = XLSX.utils.json_to_sheet(data);
        
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
        
        const excelBuffer = XLSX.write(workbook,{
            bookType:"xlsx",
            type:"array",
        });
        
        
        
        const blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        
        saveAs(blob,'transaction.xlsx')
    };

  return (
    <button
    onClick={handleExcelDownload}
     className="flex font-body font-bold text-[12px] border-[1px]
     bg-white rounded shadow-sm px-3 py-2 items-center justify-center gap-1">
        {iconMapping.csv} 
        Export</button>
  )
}

export default Excel