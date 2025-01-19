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
import ChartData from "../../ChartData";
import OverviewCard from "../Components/OverviewCard";
import MultiBar from "../Components/MultBar";
import Header from "../Components/Header";

Chart.register(CategoryScale);

const Dashboard = () => {
  const [pageNum, setPageNum] = useState([]);
  const [currPage, setCurrPage] = useState([]);
  const [dataTab, setDataTab] = useState([]);
  const [control, setControl] = useState(0);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDeBouncedQuery] = useState(""); /* for delay */
  const [filPageNum, setFilPageNum] = useState([]);
  const [filterd, setFiltered] = useState([]);
  const [FilPage, setFilPage] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredByDate, setFilteredByDate] = useState([]);
  const [currFilteredByDate, setCurrFilteredByDate] = useState([]);
  const [dateFilterPage, setDateFilterPage] = useState([]);
  const [isshowPopFilter, setIsShowPopFilter] = useState(false);

  const [selectedType, setSelectedType] = useState("");
  const [filteredByType, setFilteredByType] = useState([]);
  const [currFilteredByType, setCurrFilteredByType] = useState([]);
  const [typeFilteredPage, setTypeFilteredPage] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredByCategory, setFilteredByCategory] = useState([]);
  const [currFilteredByCategory, setCurrFilteredByCategory] = useState([]);
  const [categoryFilteredPage, setCategoryFilteredPage] = useState([]);

  const [transactions, setTransaction] = useState(Tabledata);
  const [isShowAddTrans, setIsShowAddTrans] = useState(false);

  const [incomeGraphData, setIncomeGraphData] = useState([100, 200, 300]);
  const [expenseGraphData, setExpenseGraphData] = useState([
    200, 400, 400, 700,
  ]);
  const [savingsGraphData, setSavingsGraphData] = useState([
    300, 500, 600, 800, 900,
  ]);

  // const [chartsData, setChartData] = useState({labels:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] ,
  //     datasets:[
  //       {
  //         label: 'Income Spendings',
  //         data:incomeGraphData,
  //         backgroundColor: 'yellow',
  //         borderColor:'yellow',
  //         tension:0.5
  //       },

  //       {
  //         label: 'Expense Spendings',
  //         data:expenseGraphData,
  //         backgroundColor: 'red',
  //         borderColor:'red',
  //         tension:0.5
  //       },

  //       {
  //         label: 'Saving Spendings',
  //         data:savingsGraphData,
  //         backgroundColor: 'green',
  //         borderColor:'green',
  //         tension:0.5

  //       }
  //     ]
  //   })

  // useEffect(() => {

  // setChartData({labels:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] ,
  //   datasets:[
  //     {
  //       label: 'Income',
  //       data:incomeGraphData.flat(),
  //       backgroundColor: 'yellow',
  //       borderColor:'yellow',
  //       tension:0.5
  //     },

  //     {
  //       label: 'Expense',
  //       data:expenseGraphData.flat(),
  //       backgroundColor: 'red',
  //           borderColor:'red',
  //           tension:0.5

  //     },

  //     {
  //       label: 'Saving',
  //       data:savingsGraphData.flat(),
  //       backgroundColor: 'green',
  //       borderColor:'green',
  //       tension:0.5

  //     }
  //   ]
  // })

  // }, [])

  const togglePopOver = () => {
    setIsShowPopFilter((prev) => !prev);
  };

  const toggleAddTrans = () => {
    setIsShowAddTrans((prev) => !prev);
  };

  const addTransaction = (newtransaction) => {
    Tabledata.push(newtransaction);
    setTransaction((prev) => [...prev, newtransaction]);
    toggleAddTrans();
  };

  const text = "add transaction";


  function firstLCap(word){

    //   const firstletter = word.slice(0,1).toUpperCase()
      return word.charAt(0).toUpperCase() + word.slice(1)
}

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
    setFiltered(fillArr);
    setFilPage(fillArr[0]);
    setFilPageNum(Array.from({ length: fillnum }, (_, index) => (index += 1)));
  }, [debouncedQuery]);

  // page change function for next page.

  function pageFoward() {
    if (isCategorySelected) {
      const newIndex = (control + 1) % categoryFilteredPage.length;
      setCurrFilteredByCategory(filteredByCategory[newIndex]);
      setControl(newIndex);
    } else if (isTypeSelected) {
      const newIndex = (control + 1) % typeFilteredPage.length;
      setCurrFilteredByType(filteredByType[newIndex]);
      setControl(newIndex);
    } else if (isDateFiltered) {
      const newIndex = (control + 1) % dateFilterPage.length;
      setCurrFilteredByDate(filteredByDate[newIndex]);
      setControl(newIndex);
    } else if (debouncedQuery === "") {
      const newIndex = (control + 1) % pageNum.length;
      setCurrPage(dataTab[newIndex]);
      setControl(newIndex);
    } else {
      const newIndex = (control + 1) % filPageNum.length;
      setFilPage(filterd[newIndex]);
      setControl(newIndex);
    }
  }

  // page change function for previous01 page.

  function pageBack() {
    if (isCategorySelected) {
      const newIndex =
        (control - 1 + categoryFilteredPage.length) %
        categoryFilteredPage.length;
      setCurrFilteredByCategory(filteredByCategory[newIndex]);
      setControl(newIndex);
    } else if (isTypeSelected) {
      const newIndex =
        (control - 1 + typeFilteredPage.length) % typeFilteredPage.length;
      setCurrFilteredByType(filteredByType[newIndex]);
      setControl(newIndex);
    } else if (isDateFiltered) {
      const newIndex =
        (control - 1 + dateFilterPage.length) % dateFilterPage.length;
      setCurrFilteredByDate(filteredByDate[newIndex]);
      setControl(newIndex);
    } else if (debouncedQuery === "") {
      const newIndex = (control - 1 + pageNum.length) % pageNum.length;
      setCurrPage(dataTab[newIndex]);
      setControl(newIndex);
    } else {
      const newIndex = (control - 1 + filPageNum.length) % filPageNum.length;
      setFilPage(filterd[newIndex]);
      setControl(newIndex);
    }
  }

  const isFiltered = debouncedQuery !== "";

  const currentPageNum = isFiltered ? filPageNum : pageNum;

  const isDateFiltered = startDate && endDate;
  const currdatepagenum = isDateFiltered ? dateFilterPage : currentPageNum;
  const isTypeSelected = selectedType !== "";
  const isCategorySelected = selectedCategory !== "";

  const currentTypePage = isTypeSelected ? typeFilteredPage : currdatepagenum;
  const currentCatPage = isCategorySelected
    ? categoryFilteredPage
    : currentTypePage;

  let typeSearch = [];

  if (isTypeSelected) {
    typeSearch = isFiltered || isDateFiltered ? filteredByDate : dataTab;
  }

  const filteredType = typeSearch.flat().filter((data) => {
    return data.type.toLowerCase().includes(selectedType.toLowerCase());
  });

  let categorySearch = [];

  if (isCategorySelected) {
    categorySearch =
      isTypeSelected || isFiltered || isDateFiltered ? filteredType : dataTab;
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

  const filteredDate = dateSearch.flat().filter((dates) => {
    const checkDate = Date.parse(dates.date);
    const tempStartDate = Date.parse(startDate);
    const tempEndDate = Date.parse(endDate);
    if (!startDate || !endDate) return true;
    return checkDate >= tempStartDate && checkDate <= tempEndDate;
  });

  useEffect(() => {
    const tempDate = [...filteredDate];
    const num = Math.ceil(tempDate.length / 10);
    const newArry = Array.from({ length: num }, () => []);

    for (let i = 0; i < num; i++) {
      for (let j = 0; j < 10 && tempDate.length; j++) {
        newArry[i].push(tempDate.shift());
      }
    }

    setFilteredByDate(newArry);
    setCurrFilteredByDate(newArry[0]);
    setDateFilterPage(Array.from({ length: num }, (_, index) => (index += 1)));
  }, [startDate, endDate, isFiltered, debouncedQuery]);

  useEffect(() => {
    const tempDate = [...filteredType];
    const num = Math.ceil(tempDate.length / 10);
    const newArry = Array.from({ length: num }, () => []);

    for (let i = 0; i < num; i++) {
      for (let j = 0; j < 10 && tempDate.length; j++) {
        newArry[i].push(tempDate.shift());
      }
    }

    setFilteredByType(newArry);
    setCurrFilteredByType(newArry[0]);
    setTypeFilteredPage(
      Array.from({ length: num }, (_, index) => (index += 1))
    );
  }, [selectedType]);

  const filteredCategory = categorySearch.flat().filter((data) => {
    return data.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  useEffect(() => {
    const tempDate = [...filteredCategory];
    const num = Math.ceil(tempDate.length / 10);
    const newArry = Array.from({ length: num }, () => []);

    for (let i = 0; i < num; i++) {
      for (let j = 0; j < 10 && tempDate.length; j++) {
        newArry[i].push(tempDate.shift());
      }
    }

    setFilteredByCategory(newArry);
    setCurrFilteredByCategory(newArry[0]);
    setCategoryFilteredPage(
      Array.from({ length: num }, (_, index) => (index += 1))
    );
  }, [selectedCategory]);

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
        colr={
          data.title === "Balance"
            ? "blue"
            : data.title === "Income"
            ? "green"
            : data.title === "Expenses"
            ? "red"
            : "yellow"
        }
      />
    );
  });

  const onlySearchQuery = debouncedQuery === "" ? currPage : FilPage;
  const searchQueryAndDate = isDateFiltered
    ? currFilteredByDate
    : onlySearchQuery || [];
  const searchQueryDateandType = isTypeSelected
    ? currFilteredByType
    : searchQueryAndDate;

  const queryNoQuery = isCategorySelected
    ? currFilteredByCategory
    : searchQueryDateandType;

  const tableElement =
    Array.isArray(queryNoQuery) && queryNoQuery.length > 0 ? (
      queryNoQuery.map((data, index) => {
        return (
          <tr key={index}>
            <td> {firstLCap(data.name)} </td>
            <td> {firstLCap(data.category)}</td>
            <td> {firstLCap(data.date)}</td>
            <td> {`$${data.amount}`}</td>
           <div className="w-[10.5rem] "> <td
              className={` w-16 h-5 flex justify-center font-body text-[10px] font-semibold  items-center  rounded-[4px] ${
                data.type === "income"
                  ? "bg-incomelight text-incomebar"
                  : data.type === "expense"
                  ? "bg-expenselight text-expensebar font-normal"
                  : data.type === "savings"
                  ? "bg-savingslight text-savingsbar font-normal"
                  : "bg-buttonlight text-buttoncolor font-normal"
              }`} 
            >
              {firstLCap(data.type)}
            </td></div>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="5" className="text-center text-gray-500">
          No Transactions Available
        </td>
      </tr>
    );

  const Pagenation = (
    <>
      <div onClick={pageBack}> {iconMapping.leftarr}</div>

      <div className="flex gap-4">
        {currentCatPage.map((num, index) => (
          <div
            onClick={() => {
              if (isCategorySelected) {
                setCurrFilteredByCategory(filteredByCategory[index]);
                setControl(index);
              } else if (isTypeSelected) {
                setCurrFilteredByType(filteredByType[index]);
                setControl(index);
              } else if (isDateFiltered) {
                setCurrFilteredByDate(filteredByDate[index]);
                setControl(index);
              } else if (isFiltered) {
                setFilPage(filterd[index]);
                setControl(index);
              } else {
                setCurrPage(dataTab[index]);
                setControl(index);
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
    </>
  );

  return (
    <div className="relative bg-back flex flex-col">
      <Header query={query} setQuery={setQuery} />

      <div className="flex p-6 ">
        <div className="flex flex-col gap-1 ">
          <div className="font-body font-bold text-3xl text-textcol">
            Dashboard
          </div>
          <div className="font-body text-xs">
            An overview of the entire accounting System
          </div>
        </div>
      </div>

      {/* {isShowAddTrans && (<div><AddTrans addTransaction={addTransaction} toggleAddTrans={toggleAddTrans}/></div>)} */}




      <div className=" flex  flex-col items-center justify-center border-4 bg-back gap-7 px-6 ">
        <div className="flex w-full gap-8">{dashboardelement}</div>

        {/* <div className="flex flex-col gap-0 w-[59rem] ">
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
 </div> */}



        <div className="flex gap-7 w-full mb-7 ">
          <div className="flex w-[70%] h-[480px]">
            <MultiBar ChartData={ChartData} />
          </div>

          <div className="w-[30%]">
            <OverviewCard />
          </div>
        </div>
<div className="bg-red-300 p-2 w-full">

        <div className="flex items-center justify-between w-full px-2 py-1 bg-white   relative">
          <form action="">
            <input
              className="flex w-[13.5rem] border-gray-50 border-2  h-[1rem] p-5 rounded-md"
              type="search"
              placeholder="search here..."
              name="search"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              />
          </form>

          <div className="flex gap-2 items-center ">
          
              <div className="flex gap-1 items-center">
                <DateFilter
                  icon={iconMapping.DateRan}
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  />
              </div>

      
      
           
            <div
              onClick={togglePopOver}
              className="flex font-body font-normal text-xs gap-1 items-center  border-[1px] border-back px-3 py-1 shadow-sm rounded-md"
              >
              {iconMapping.filter} Filter
            </div>
          </div>
          {isshowPopFilter && (
            <div className="flex  mt-[18rem] ml-[56rem] absolute">
              <PopOver
                setIsShowPopFilter={setIsShowPopFilter}
                isshowPopFilter={isshowPopFilter}
                setSelectedType={setSelectedType}
                setSelectedCategory={setSelectedCategory}
                />
            </div>
          )}
        </div>

        {queryNoQuery ? (
          <>
            <div className="flex items-center font-body text-sm  bg-white justify-center p-1 ">
              <table>
                <thead className="bg-back">
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

            <div className="flex gap-2 p-1 justify-center items-center">
              {Pagenation}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center w-full py-10">
            <p className="text-gray-500 font-body font-semibold text-lg">
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
