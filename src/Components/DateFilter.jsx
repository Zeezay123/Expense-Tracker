import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';


const DateFilter = ({icon,setStartDate,startDate,endDate,setEndDate}) => {
    const [newDate, setNewDate] = useState(new Date());
   
    
    return (
<>

  <DatePicker 

  showIcon
  selected={startDate} 
  onChange={(date) => (setStartDate(date))}
  icon={icon}
  placeholderText='Start Date'
   dateFormat="yyyy/MM/dd"
  />
   <span>-</span>
     <DatePicker 
      showIcon
      selected={endDate} 
      onChange={(date) => setEndDate(date)}
      icon={icon}
      placeholderText='End Date'
       dateFormat="yyyy/MM/dd"
     />
 </>
    )
}

export default DateFilter