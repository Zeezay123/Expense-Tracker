import React from "react";
import { useState, useEffect } from "react";
import iconMapping from "../Components/iconMapping";

import Dataone from "../../Dataone";
import Tabledata from "../../Tabledata";
import Button from "../Components/Button";
import svg from "../assets/react.svg";
import graph from "../assets/graph.png";
import DateFilter from "../Components/DateFilter";
import PopOver from "../Components/PopOver";
import AddTrans from "../Components/AddTrans";
import { Chart } from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from "../Components/LineChart";
import TransCard from "../Components/TransCard";



Chart.register(CategoryScale);






const Dashboard = () => {
  const [pageNum, setPageNum] = useState([]);
  const [currPage, setCurrPage] = useState([]);
  const [dataTab, setDataTab] = useState([]);
  const [control, setControl] = useState(0);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDeBouncedQuery] = useState("");/* for delay */
  const [filPageNum, setFilPageNum] = useState([]);
  const [filterd, setFiltered] = useState([]);
  const [FilPage, setFilPage]= useState([]) 
  const [startDate, setStartDate]= useState('')
  const [endDate, setEndDate]= useState('')
  const [filteredByDate, setFilteredByDate]= useState([]);
  const [currFilteredByDate, setCurrFilteredByDate]= useState([]);
  const [dateFilterPage, setDateFilterPage] = useState([]);
  const[isshowPopFilter, setIsShowPopFilter] = useState(false)

  const [selectedType, setSelectedType] = useState(''); 
  const [filteredByType, setFilteredByType] = useState([])
  const [currFilteredByType, setCurrFilteredByType] = useState([])
  const [typeFilteredPage, setTypeFilteredPage] = useState([])

  const [selectedCategory, setSelectedCategory] = useState('');  
  const [filteredByCategory, setFilteredByCategory] = useState([]);
  const [currFilteredByCategory, setCurrFilteredByCategory]=useState([]);
  const [categoryFilteredPage, setCategoryFilteredPage] = useState([]);

  const [transactions, setTransaction] = useState(Tabledata)
  const [isShowAddTrans, setIsShowAddTrans] = useState(false)

  const [incomeGraphData, setIncomeGraphData] = useState([100,200,300])
  const [expenseGraphData, setExpenseGraphData] = useState([200,400,400,700]) 
  const [savingsGraphData, setSavingsGraphData] = useState([300,500,600,800,900]) 

  const [chartsData, setChartData] = useState({labels:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] ,
      datasets:[
        {
          label: 'Income Spendings',
          data:incomeGraphData, 
          backgroundColor: 'yellow',
          borderColor:'yellow',
          tension:0.5
        },
  
        {
          label: 'Expense Spendings',
          data:expenseGraphData, 
          backgroundColor: 'red',
          borderColor:'red',
          tension:0.5
        },
  
        {
          label: 'Saving Spendings',
          data:savingsGraphData, 
          backgroundColor: 'green',
          borderColor:'green',
          tension:0.5

         
        }
      ]
    })

useEffect(() => {
  
setChartData({labels:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] ,
  datasets:[
    {
      label: 'Income',
      data:incomeGraphData.flat(), 
      backgroundColor: 'yellow',
      borderColor:'yellow',
      tension:0.5
    },

    {
      label: 'Expense',
      data:expenseGraphData.flat(), 
      backgroundColor: 'red',
          borderColor:'red',
          tension:0.5
    
    },

    {
      label: 'Saving',
      data:savingsGraphData.flat(), 
      backgroundColor: 'green',
      borderColor:'green',
      tension:0.5 
     
    }
  ]
})
  
}, [chartsData,incomeGraphData,expenseGraphData,savingsGraphData])





  const togglePopOver = () => {
    setIsShowPopFilter((prev) => !prev);
  };
  
  const toggleAddTrans = ()=>{
    setIsShowAddTrans((prev)=>!prev); 

  }

const addTransaction = (newtransaction)=>{
   
    Tabledata.push(newtransaction);
    setTransaction((prev) => [...prev, newtransaction])
    toggleAddTrans();
  
}


  const text = "add transaction";
  // mapping icon for dynamic use   exIcon: '#E10E0E',
  // balIcon: '#1C3FB7',
  // inIcon: '#13C296',
  // eIcon: '#D97706'
  // const iconMapping = {
  //   expenseIcon: <FaMoneyBillTransfer color="#E10E0E" size={18} />,
  //   incomeIcon: <FaMoneyBillTrendUp color="#13C296" size={18} />,
  //   savingsIcon: <FaTableCellsRowLock color="#FCD34D" size={18} />,
  //   balanceIcon: <AiFillDashboard color="#1C3FB7" size={18} />,
  //   DateRan: <MdDateRange size={18} />,
  //   filter: <AiFillFilter size={18} />,
  //   addbutton: <IoIosAddCircleOutline size={20} />,
  //   leftarr: <FaChevronLeft size={18} />,
  //   rightarr: <FaChevronRight size={18} />,
  // };






// original data display without search spliting of data into arrays of 10s

  useEffect(() => {
    const temp = [...transactions];
    const num = Math.ceil(temp.length / 10);
    const newArr = Array.from({ length: num }, () => []);
    for (let i = 0; i < num; i++) {
      for (let j = 0; j < 10 && temp.length; j++) {
        newArr[i].push(temp.shift());
      }
    }

    setDataTab(newArr);
    setCurrPage(newArr[0]);
    setPageNum(Array.from({ length: num }, (_, index) => (index += 1)));
  }, [transactions]);





/* useeffect to handle changes in query,
 user chooses to search by name a settime out function is used to allow users to finish typing before request 
*/
  useEffect(() => {
    const handler = setTimeout(() => {
      setDeBouncedQuery(query);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);



// search by name filtered
  const filteredSearch = dataTab.flat().filter((items) => {
    return items.name.toLowerCase().includes(debouncedQuery.toLowerCase());
  });







// filtered search result used to setup table split in 10s, runs when user query is changed
  useEffect(() => {
    
    const filteredtemp = [...filteredSearch];
    const fillnum = Math.ceil(filteredtemp.length / 10);
    const fillArr = Array.from({ length: fillnum }, () => []);
    for (let i = 0; i < fillnum; i++) {
      for (let j = 0; j < 10 && filteredtemp.length; j++) {
        fillArr[i].push(filteredtemp.shift());
      }
    }
   
  
    // const [filPageNum,
    // const [filterd, 
    setFiltered(fillArr)
    setFilPage(fillArr[0])
    setFilPageNum(Array.from({length:fillnum}, (_,index) => (index += 1)))
    
  }, [debouncedQuery])



    





  
  
  // page change function for next page. 
  
  function pageFoward() {
   
   if(isCategorySelected){
      const newIndex = (control + 1) % categoryFilteredPage.length;
      setCurrFilteredByCategory(filteredByCategory[newIndex]);
      setControl(newIndex);
    
    }
  else if(isTypeSelected){
  const newIndex = (control + 1) % typeFilteredPage.length;
  setCurrFilteredByType(filteredByType[newIndex]);
  setControl(newIndex);

}
    else if (isDateFiltered) {
      const newIndex = (control + 1) % dateFilterPage.length;
      setCurrFilteredByDate(filteredByDate[newIndex]);
      setControl(newIndex);
    }

    else if(debouncedQuery === ''){
      const newIndex = (control + 1) % pageNum.length;
      setCurrPage(dataTab[newIndex]);
      setControl(newIndex);
    }
    else {
      const newIndex = (control + 1) % filPageNum.length;
      setFilPage(filterd[newIndex]);
      setControl(newIndex);
    }
    
  }
  
  

  
  // page change function for previous01 page. 
  
  function pageBack() {
    if (isCategorySelected) {
      const newIndex = (control - 1 + categoryFilteredPage.length) % categoryFilteredPage.length;
      setCurrFilteredByCategory(filteredByCategory[newIndex]);
       setControl(newIndex);
    } 
   
   else if (isTypeSelected) {
      const newIndex = (control - 1 + typeFilteredPage.length) % typeFilteredPage.length;
      setCurrFilteredByType(filteredByType[newIndex]);
       setControl(newIndex);
    } 
    else if (isDateFiltered) {
      const newIndex = (control - 1 + dateFilterPage.length) % dateFilterPage.length;
      setCurrFilteredByDate(filteredByDate[newIndex]);
      setControl(newIndex);
    } 
    else if(debouncedQuery === '') {
      const newIndex = (control - 1 + pageNum.length) % pageNum.length;
      setCurrPage(dataTab[newIndex]);
      setControl(newIndex);
    }
    else{
      
      const newIndex = (control - 1 + filPageNum.length) % filPageNum.length;
      setFilPage(filterd[newIndex]);
      setControl(newIndex);
      
    } 
    
  }

  







  const isFiltered = debouncedQuery !== '';
 
  const currentPageNum = isFiltered ? filPageNum : pageNum;

  const isDateFiltered = startDate && endDate;
  const currdatepagenum = isDateFiltered ?  dateFilterPage : currentPageNum;
  const isTypeSelected = selectedType !== '';
  const isCategorySelected = selectedCategory !== '';
   
  const currentTypePage = isTypeSelected ? typeFilteredPage : currdatepagenum;  
  const currentCatPage = isCategorySelected? categoryFilteredPage : currentTypePage



  let typeSearch = [];

if (isTypeSelected) {
  typeSearch = (isFiltered || isDateFiltered) ? filteredByDate : dataTab;
}

  const filteredType = typeSearch.flat().filter((data)=>{ 
    return data.type.toLowerCase().includes(selectedType.toLowerCase())
  })

let categorySearch = [];

if(isCategorySelected)
{
   categorySearch = (isTypeSelected || isFiltered || isDateFiltered) ? filteredType : dataTab;
}





//Aternative
// if (isTypeSelected) {
//   if (isFiltered) {
//     if (isDateFiltered) {
//       typeSearch = filteredByDate;
//     } else {
//       typeSearch = filteredSearch;
//     }
//   } else {
//     if (isDateFiltered) {
//       typeSearch = filteredByDate;
//     } else {
//       typeSearch = dataTab;
//     }
//   }
// }



 const dateSearch = isFiltered ? filteredSearch : dataTab;

  const filteredDate = dateSearch.flat().filter((dates) =>{

  const checkDate = Date.parse(dates.date)
  const tempStartDate = Date.parse(startDate)
  const tempEndDate = Date.parse(endDate)
  if (!startDate || !endDate) return true;
  return checkDate >= tempStartDate  && checkDate <= tempEndDate
 
})


useEffect(() => {

const tempDate = [...filteredDate];
const num = Math.ceil(tempDate.length/10);
const newArry = Array.from({length:num},()=>[]);

 for(let i=0; i<num; i++){
   for(let j=0; j< 10 && tempDate.length; j++){
    newArry[i].push(tempDate.shift())
   }
 }

setFilteredByDate(newArry)
setCurrFilteredByDate(newArry[0])
setDateFilterPage(Array.from({length:num},(_,index)=>( index += 1)))


}, [startDate,endDate,isFiltered,debouncedQuery])


  




useEffect(() => {
 
  const tempDate = [...filteredType];
  const num = Math.ceil(tempDate.length/10);
  const newArry = Array.from({length:num},()=>[]);
  
   for(let i=0; i<num; i++){
     for(let j=0; j< 10 && tempDate.length; j++){
      newArry[i].push(tempDate.shift())
     }
   }

 setFilteredByType(newArry) 
 setCurrFilteredByType(newArry[0])
 setTypeFilteredPage(Array.from({length:num},(_,index)=>( index += 1)))

}, [selectedType])



const filteredCategory = categorySearch.flat().filter((data)=>{
  return data.category.toLowerCase().includes(selectedCategory.toLowerCase())
})



useEffect (()=>{
  const tempDate = [...filteredCategory];
  const num = Math.ceil(tempDate.length/10);
  const newArry = Array.from({length:num},()=>[]);
  
   for(let i=0; i<num; i++){
     for(let j=0; j< 10 && tempDate.length; j++){
      newArry[i].push(tempDate.shift())
     }
   }

   setFilteredByCategory(newArry)
   setCurrFilteredByCategory(newArry[0])
   setCategoryFilteredPage(Array.from({length:num},(_,index)=>( index += 1)))
   


},[selectedCategory])





 







  // const dashboardelement = Dataone.map((data, index) => {
  //   return (
  //     <div
  //       key={index}
  //       className={`flex flex-col bg-white w-[270px] gap-6 h-[170px] p-5  rounded-lg border-r-4 
  //         ${
  //           data.title === "Income"
  //             ? "border-green-400"
  //             : data.title === "Expenses"
  //             ? "border-red-400"
  //             : data.title === "Savings"
  //             ? "border-yellow-400"
  //             : "border-blue-400"
  //         }`}
  //     >

  //       <div
  //         className={`flex w-10 h-10 border rounded-lg items-center justify-center
  //         ${
  //           data.title === "Income"
  //             ? " bg-green-100"
  //             : data.title === "Expenses"
  //             ? "bg-red-100"
  //             : data.title === "Savings"
  //             ? " bg-yellow-100 "
  //             : " bg-blue-100 "
  //         }`}
  //       >
  //         {iconMapping[data.icon]}
  //       </div>

  //       <div className="flex justify-between items-center">
  //         <div className="flex flex-col">
  //           <span className=" font-title font-bold text-lg">{data.title}</span>
  //           <span className=" font-sans font-black text-lg">{data.amount}</span>
  //         </div>
  //         <div
  //           className={`flex justify-center text-lg  items-center border rounded-full w-20 h-8 
  //         ${
  //           data.title === "Income"
  //             ? "text-green-500 bg-green-100"
  //             : data.title === "Expenses"
  //             ? "text-red-500 bg-red-100"
  //             : data.title === "Savings"
  //             ? "text-yellow-500 bg-yellow-100"
  //             : "text-blue-500 bg-blue-100"
  //         }
  //         `}
  //         >
  //           {data.percentage}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // });

const dashboardelement = Dataone.map((data, index) => {
  return (
    <TransCard
      key={index}
      title={data.title}
      amount={data.amount}
      percent={data.percentage}
      icon={data.icon}
      gain={data.gains}
      colr={data.title === 'Balance' ? 'blue' : data.title === 'Income' ? 'green' : data.title === 'Expenses' ? 'red' : 'yellow'}
    />
  );
});




 


 


  const onlySearchQuery = debouncedQuery === "" ? currPage : FilPage;
  const searchQueryAndDate = isDateFiltered ? currFilteredByDate: onlySearchQuery || []; 
  const searchQueryDateandType = isTypeSelected ? currFilteredByType: searchQueryAndDate;

 const queryNoQuery = isCategorySelected ? currFilteredByCategory: searchQueryDateandType;

  const tableElement = Array.isArray(queryNoQuery) && queryNoQuery.length > 0 ? queryNoQuery.map((data, index) => {
    return (
      <tr key={index}>
        <td> {data.name} </td>
        <td> {data.category}</td>
        <td> {data.date}</td>
        <td> {`$${data.amount}`}</td>
        <td
          className={` w-20 h-7 flex justify-center font-sans  items-center border rounded-full ${
            data.type === "income"
              ? "bg-green-100 text-green-500 font-normal"
              : data.type === "expense"
              ? "bg-red-100 text-red-500 font-normal"
              : data.type === "savings"
              ? "bg-yellow-100 text-yellow-500 font-normal"
              : "bg-blue-100 text-blue-500 font-normal"
          }`}
        >
         
          {data.type}
        </td>
      </tr>
    );
  }) : (
    <tr>
      <td colSpan="5" className="text-center text-gray-500">
        No transactions available
      </td>
    </tr>
  );


 


  const Pagenation = ( <>
   <div onClick={pageBack}> {iconMapping.leftarr}</div>


<div className="flex gap-4">
  {currentCatPage.map((num, index) => (
    <div
      onClick={() => {
      
        if(isCategorySelected){
          setCurrFilteredByCategory(filteredByCategory[index])
          setControl(index)
        }

      else if(isTypeSelected) {
          setCurrFilteredByType(filteredByType[index]) 
           setControl(index)}

         else if(isDateFiltered){
          setCurrFilteredByDate(filteredByDate[index])
          setControl(index)
        }

       else if(isFiltered) {
        setFilPage(filterd[index]) 
         setControl(index)}
        
        

       else{
         setCurrPage(dataTab[index])
         setControl(index)
       }
      }}
      className={
        index == control
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










  return (
    <div className="relative">
    {isShowAddTrans && (<div><AddTrans addTransaction={addTransaction} toggleAddTrans={toggleAddTrans}/></div>)}
    <div className="flex  flex-col bg-gray-50 pt-12 h-auto">
       
      <div className=" flex items-center justify-center gap-10 pl-20 sm:flex-wrap">
        {dashboardelement}

        
        <div className="flex gap-0 border-2 bg-white p-2 rounded-lg shadow-md">

<div className="flex flex-col gap-0 w-[59rem] ">
         <div className="flex flex-col p-2">
          <div className='flex justify-between pr-10'><h3 className="text-xl font-bold">Statistics</h3> <div>Month</div></div> 
          
          
          
           <div className="flex gap-6 mt-2"> 
            
            <div className="flex items-center justify-center gap-1 align-middle">
              <div className="w-3 h-3 bg-yellow-500  rounded-full flex justify-center items-center "></div>
             
              <div className="text-gray-400" >
               Income
              </div>
               
               </div>
               
               
                <span className="flex items-center justify-center gap-1" >
                <span className="w-3 h-3 bg-red-500  rounded-full"></span>
                <div className="text-gray-400" >  Expenses </div>
                  
                  </span> 
                
                
                
                <span className="flex items-center justify-center gap-1">
                <span className="w-3 h-3 bg-green-500  rounded-full"></span>

                <div className="text-gray-400" >
                  Savings </div>
                  
                  </span>
                  </div>
         </div>

          <div className="flex">
          <LineChart  
          chartsData={chartsData}
          dataTab={Tabledata}
          setIncomeGraphData={setIncomeGraphData} 
          setExpenseGraphData={setExpenseGraphData}
          setSavingsGraphData={setSavingsGraphData}/>
        </div>
 </div>



       <div className="flex flex-col items-center justify-center gap-10 border-l-2 p-5">
        <div className="flex flex-col ">
          <span className="text-gray-500"> 
            Average Income
            </span>
            <span className="text-3xl font-bold">$1000</span>
          <span className="text-gray-400">average monthly Income</span>
        </div>


        <div className="flex flex-col">
          <span className="text-gray-500"> 
            Average Expense
            </span>
            <span className="text-3xl font-bold">$1000</span>
          <span className="text-gray-400">average monthly  expenses</span>
        </div>



        <div className="flex flex-col">
          <span className="text-gray-500"> 
            Average Savings
            </span>
            <span className="text-3xl font-bold">$1000</span>
          <span className="text-gray-400">average monthly Savings</span>
        </div>
       </div>
         
       </div> 






        <div className="flex justify-between items-center min-w-[74rem]">
          <div>
            <h2 className="font-title text-2xl font-bold">
              Recent Transactions{" "}
            </h2>
            <p className="text-gray-400">
              Check all you recent transactional activities.
            </p>
          </div>


          <div onClick={toggleAddTrans}>
             <Button bIcon={iconMapping.addbutton} btext={text} />
            </div>
         
          
        </div>

        <div className="flex items-center justify-between min-w-[74rem] px-5 py-3 bg-white rounded-md relative">
          <form action="">
            <input
              className="flex w-[18.5rem] border-gray-50 border-2  h-[2rem] p-5 rounded-md"
              type="search"
              placeholder="search here..."
              name="search"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
          </form>

          <div className="flex gap-28 items-center ">
            <div className=" flex gap-2 items-center">
              <div className="flex gap-1 items-center">
                <DateFilter icon={iconMapping.DateRan} startDate={startDate} setStartDate={setStartDate}  endDate={endDate} setEndDate={setEndDate} />
              </div>

              {/* <div className="flex gap-1 items-center">
                EndDate: <DateFilter icon={iconMapping.DateRan} endDate={endDate} setEndDate={setEndDate} />
              </div> */}
            </div>
            <div onClick={togglePopOver} className="flex gap-2 items-center border-gray-100 border-2 p-2 rounded-md">
              {iconMapping.filter} Filter 
            </div>
            
          </div>
          { isshowPopFilter &&
          ( <div className='flex  mt-[18rem] ml-[56rem] absolute'>
            <PopOver 
            setIsShowPopFilter={setIsShowPopFilter}
            isshowPopFilter={isshowPopFilter}  
           setSelectedType={setSelectedType}
          setSelectedCategory={setSelectedCategory}/>

           </div> )}


        </div>
       
        {queryNoQuery ? (
          <>
            <div className="flex items-center border-1 rounded-lg bg-white justify-center ">
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

                <tbody>{tableElement}</tbody>
              </table>
            </div>


            <div className="flex gap-2 p-2 justify-center items-center">

             {Pagenation}

            </div>



          </>

        ) 

        :
      
        (
          <div className="flex justify-center items-center w-full py-10">
            <p className="text-gray-500 font-semibold text-lg">
              No results found
            </p>
          </div>
        )}



      </div>
    </div>
    </div>
  );
};

export default Dashboard;
