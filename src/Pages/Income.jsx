import React, { useState, useEffect } from 'react'
// import DateFilter from '../Components/DateFilter'
// import PopOver from '../Components/PopOver'
// import AddTrans from '../Components/AddTrans'
import Tabledata from '../../Tabledata'
import Dataone from '../../Dataone'
import iconMapping from '../Components/iconMapping'
import Button from '../Components/Button'
import DateFilter from '../Components/DateFilter'
import PopOver from '../Components/PopOver'




const Income = () => {

const [tempData, setTempData]= useState([]) 
const [incomeTableData, setIncomeTableData] = useState([])  
const [pageNum, setPageNum] = useState([])
const [control, setControl]= useState(0)
const [query, setQuery] = useState('');
const [debounce, setDebounce] = useState('')
const [startDate, setStartDate]= useState('')
const [endDate, setEndDate]= useState('')
const [filteredByDate, setFilteredByDate]= useState([]);
const [currFilteredByDate, setCurrFilteredByDate]= useState([]);
const [dateFilterPage, setDateFilterPage] = useState([]);
const[isshowPopFilter, setIsShowPopFilter] = useState(false)

const[freelance, setfreelance] = useState([])
const[salary, setSalary] = useState([])
const[investment, setInvestment] = useState([])
const[income, setIncome] = useState([ ])
const[others, setOthers] = useState([])


const text = 'add income' 


useEffect(()=>{
 const handler = setTimeout(() => {
    setDebounce(query)
  }, 300);
 
  return ()=> {
    clearTimeout(handler);
  }

},[query])











const noFilterData = Tabledata.flat().filter(data => {
  return data.type.toLowerCase().includes('income')
 } )  




const searchFil = debounce ==='' ? Tabledata.flat().filter(data => {
  return data.type.toLowerCase().includes('income')
 } ) 
   :
    noFilterData.flat().filter((data)=>{
  return data.name.toLowerCase().includes(debounce.toLowerCase())
  
})


const filteredDate = searchFil.flat().filter((dates) =>{

  const checkDate = Date.parse(dates.date)
  const tempStartDate = Date.parse(startDate)
  const tempEndDate = Date.parse(endDate)
  if (!startDate || !endDate) return true;
  return checkDate >= tempStartDate  && checkDate <= tempEndDate
 
})

const dateData = startDate && endDate 

const incomeFilData = dateData ? filteredDate : searchFil


useEffect(() => {

const filterFunc = (data)=>{
  const tempData = [...data];
  const num = Math.ceil(tempData.length/10);
  const newArr = Array.from({length:num}, ()=> []);

  for(let i=0; i< num; i++){
    for(let j=0; j< 10 && tempData.length; j++){
     newArr[i].push(tempData.shift())
      
    }
    
  }
    
// console.log(newArr)
return newArr
}

const data = filterFunc(incomeFilData)
setTempData(data)
setIncomeTableData(data[0])
setPageNum(Array.from({length:data.length}, (_,index)=>( index + 1 )))

}, [debounce, startDate , endDate])


const pageBack =()=> {
  const newIndex = (control - 1 + tempData.length) % tempData.length;
  setIncomeTableData(tempData[newIndex])

  setControl(newIndex)
}

const pageFoward =()=> {
  const newIndex = (control + 1) % tempData.length;
  setIncomeTableData(tempData[newIndex])
  setControl(newIndex)
}

const Pagenation = ( <>
  <div onClick={pageBack}> {iconMapping.leftarr}</div>


<div className="flex gap-4">
 {pageNum.map((num, index) => (
   <div
     onClick={() => { setIncomeTableData(tempData[index])
                      setControl(index)
      }}
     className={
       index === control
         ? "flex justify-center items-center border-2 bg-blue-600 w-6 h-6 rounded-full cursor-pointer"
         : "flex justify-center items-center border-2  w-6 h-6 rounded-full cursor-pointer"
     }
     key={index}
   >
     {num}
   </div>
 ))}
</div>

<div onClick={pageFoward}> {iconMapping.rightarr}</div>
 
 </>);








const tableElement = incomeTableData ? incomeTableData.flat().map((data, index) => {
  return (
    <tr key={index}>
      <td> {data.name} </td>
      <td> {data.category}</td>
      <td> {data.date}</td>
      <td> {`$${data.amount}`}</td>
      <td
        className={'w-20 h-7 flex justify-center font-sans  items-center border rounded-full bg-green-100 text-green-500 font-normal'}>       
        {data.type}
      </td>
    </tr>
  );
}) : (
  <tr>
    <td colSpan="5" className="text-center  text-gray-500">
      No transactions available
    </td>
  </tr>
);








  
  return (
   <> </>
    // <div className='flex  flex-col bg-dashcor p-12 h-auto gap-10'>
    //   <div className='flex flex-col bg-white w-[270px] gap-6 h-[170px] p-5  rounded-lg border-r-4 border-green-400'>
      
    //   <div
    //       className='flex w-10 h-10 border rounded-lg items-center justify-center bg-green-100'>
    //       {iconMapping[Dataone[0].icon]}
    //     </div>
          

          
    //     <div className="flex justify-between items-center">
    //       <div className="flex flex-col">
    //         <span className=" font-title font-bold text-lg">{Dataone[0].title}</span>
    //         <span className=" font-sans font-black text-lg">{Dataone[0].amount}</span>
    //       </div>
    //       <div
    //         className='flex justify-center text-lg  items-center border rounded-full w-20 h-8 text-green-500 bg-green-100'
          
    //       >
    //         {Dataone[0].percentage}
    //       </div>
    //     </div>
    
    //   </div>
      










    //   <div className="flex justify-between items-center min-w-[74rem]">
    //       <div>
    //         <h2 className="font-title text-2xl font-bold">
    //           Recent Transactions
    //         </h2>
    //         <p className="text-gray-400">
    //           Check all you recent transactional activities.
    //         </p>
    //       </div>

    //       {/* onClick={toggleAddTrans} */}
    //       <div>
    //          <Button bIcon={iconMapping.addbutton} btext={text} />
    //         </div>
         
          
    //     </div>

    //     <div className="flex items-center justify-between min-w-[74rem] px-5 py-3 bg-white rounded-md relative">
    //       <form action="">
    //         <input
    //           className="flex w-[18.5rem] border-gray-50 border-2  h-[2rem] p-5 rounded-md"
    //           type="search"
    //           placeholder="search here..."
    //           name="search"
    //            onChange={(e) => setQuery(e.target.value)}
    //            value={query}
    //         />
    //       </form>

    //       <div className="flex gap-28 items-center ">
    //         <div className=" flex gap-2 items-center">
    //           <div className="flex gap-1 items-center">
    //             <DateFilter icon={iconMapping.DateRan}
                
    //             startDate={startDate} setStartDate={setStartDate}  endDate={endDate} setEndDate={setEndDate}
    //              />
    //           </div>

              
    //         </div>
           
            
    //       </div>
        


    //     </div>



    //     <>
    //         <div className="flex items-center border-1 rounded-lg bg-white justify-center ">
    //           <table>
    //             <thead>
    //               <tr>
    //                 <th>Name</th>
    //                 <th>Category</th>
    //                 <th>Date</th>
    //                 <th>Amount</th>
    //                 <th>Type</th>
    //               </tr>
    //             </thead>

    //             <tbody>
    //               {tableElement}
                  
    //               </tbody>
    //           </table>
    //         </div>


    //         <div className="flex gap-2 p-2 justify-center items-center">

    //          {Pagenation}

    //         </div>



    //       </>


    // </div>
  )

}
export default Income