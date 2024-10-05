import React from "react";
import { useState, useEffect } from "react"
import { AiFillDashboard,AiFillFilter } from "react-icons/ai";
import { FaMoneyBillTrendUp,FaTableCellsRowLock,FaMoneyBillTransfer  } from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";




import Dataone from "../../../Dataone";
import Tabledata from "../../../Tabledata";
import Button from "../Components/Button";
import svg from '../assets/react.svg'
import graph from '../assets/graph.png'

const Dashboard = () => {

  const [pageNum, setPageNum] = useState([])
  const [currPage, setCurrPage] = useState([])
  const [dataTab, setDataTab] = useState('')
  const [control, setControl] = useState(0)

useEffect(() => {

  const temp = [...Tabledata]
  const num = Math.ceil(temp.length/10)
  const newArr = Array.from({length:num}, () => [])
  for(let i=0; i < num; i++){
    for(let j =0; j < 10 && temp.length; j++){
      newArr[i].push(temp.shift())
    }
  }   

      setDataTab(newArr) 
      setCurrPage(newArr[0]) 
      setPageNum(Array.from({length:num}, (_, index)=> index += 1 ))   
}, [])






 const text = 'add transaction'
  // mapping icon for dynamic use   exIcon: '#E10E0E',
  // balIcon: '#1C3FB7',
  // inIcon: '#13C296',
  // eIcon: '#D97706'
  const iconMapping = {
    expenseIcon: <FaMoneyBillTransfer color="#E10E0E" size={18} />,
    incomeIcon: <FaMoneyBillTrendUp color="#13C296" size={18} />,
    savingsIcon: <FaTableCellsRowLock color="#FCD34D" size={18} />,
    balanceIcon: <AiFillDashboard color="#1C3FB7" size={18} />,
    DateRan: <MdDateRange size={18} />,
    filter: <AiFillFilter  size={18}/>,
    addbutton: <IoIosAddCircleOutline size={20} />,
    leftarr: <FaChevronLeft  size={18}  />,
    rightarr: <FaChevronRight size={18}  />,
  };

 

 function pageFoward(){
   setCurrPage(prev => (prev + 1 ) % pageNum.length)

 }

 function pageBack(){
  setCurrPage(prev => (prev - 1 + pageNum.length ) % pageNum.length)
 }

   
  const dashboardelement = Dataone.map((data, index) => {
    return (
      <div
        key={index}
        className={`flex flex-col bg-white w-[270px] gap-6 h-[170px] p-5  rounded-lg border-r-4 
          ${data.title === 'Income' ?  'border-green-400' 
          : data.title === 'Expenses' ?  'border-red-400' 
          :data.title === 'Savings' ?  'border-yellow-400':'border-blue-400'  }`}
      >
        <div className={`flex w-10 h-10 border rounded-lg items-center justify-center
          ${data.title === 'Income' ?  ' bg-green-100' 
            : data.title === 'Expenses' ?  'bg-red-100' 
            :data.title === 'Savings' ?  ' bg-yellow-100 ':' bg-blue-100 ' 
             }`}>
      
          {iconMapping[data.icon]}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className=" font-title font-bold text-lg">
            
              {data.title}
            </span>
            <span className=" font-sans font-black text-lg">
             {data.amount}
            </span>
          </div>
          <div className={`flex justify-center text-lg  items-center border rounded-full w-20 h-8 
          ${data.title === 'Income' ?  'text-green-500 bg-green-100' 
            : data.title === 'Expenses' ?  'text-red-500 bg-red-100' 
            :data.title === 'Savings' ?  'text-yellow-500 bg-yellow-100':'text-blue-500 bg-blue-100'  }
          `}>
            {data.percentage}
          </div>
        </div>
      </div>
    );


  });

  const tableElement = currPage.map((data, index) => {
    
    return(
       <tr  key={index}>
      <td> {data.name}  </td>
      <td> {data.category}</td>
      <td> {data.date}</td>
      <td>  {`$${data.amount}`}</td>
      <td className={` w-20 h-7 flex justify-center font-sans  items-center border rounded-full ${
            data.type === "income"
              ? "bg-green-100 text-green-500 font-normal"
              : data.type === "expense"
              ? "bg-red-100 text-red-500 font-normal"
              : data.type === "savings"
              ? "bg-yellow-100 text-yellow-500 font-normal"
              : "bg-blue-100 text-blue-500 font-normal"
          }`}
        > {data.type}</td>


    </tr>  )
  


 
  });

  return (
    <div className="flex  flex-col bg-dashcor pt-12 h-auto">
      <div className=" flex items-center justify-center gap-10 pl-20 sm:flex-wrap">{dashboardelement}
    
     
<div>

</div>

<div>
  <img src={graph} alt="" />
</div>

<div className="flex justify-between items-center min-w-[74rem]">
   <div>
   <h2 className="font-title text-2xl font-bold">Recent Transactions </h2>
    <p className="text-gray-400">Check  all you recent transactional activities.</p>
  </div> 
   <Button bIcon={iconMapping.addbutton} btext={text} />
  
  </div>


     <div className="flex items-center justify-between min-w-[74rem] px-5 py-3 bg-white rounded-md">
     
     <form action="">
      
      <input type="text" placeholder="search here..." name="search"  className="flex w-[18.5rem] border-gray-50 border-2  h-[2rem] p-5 rounded-md" />
     </form>
      
      <div className="flex gap-28 items-center"> 

      <div className=" flex gap-2 items-center">
         <div className="flex gap-2 items-center"> 
          {iconMapping.DateRan} Date 
          </div>
           
           <span className="flex items-center font-medium text-2xl"> - </span>
          <div className="flex gap-2 items-center"> 
          {iconMapping.DateRan} Date 
          </div>
      </div>
      <div className="flex gap-2 items-center border-gray-100 border-2 p-2 rounded-md"> 
          {iconMapping.filter} Filter 
          </div>
     </div>
      </div>


     <div className="flex items-center border-1 rounded-lg bg-white justify-center">

      <table>
        <thead>

          <tr>

          <th>Name</th>
          <th>Category</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Type</th>
          </tr>
        </thead>

<tbody>

      {tableElement}
</tbody>
       
 
      </table>

  

     </div>
      
     <div className="flex gap-2 p-2 justify-center items-center"> 
      <div onClick={pageBack}> {iconMapping.leftarr}</div>  

     <div className="flex gap-4">
    {pageNum.map((num,index)=>(
      <div onClick={()=> ( setCurrPage(dataTab[index]))} className=" flex justify-center items-center border-2  w-6 h-6 rounded-full cursor-pointer" key={index}>{num}</div>
    ))}
   </div>

   <div onClick={pageFoward}> {iconMapping.rightarr}</div> 
    </div>

  </div> 
  </div>
   
  );
};

export default Dashboard;
