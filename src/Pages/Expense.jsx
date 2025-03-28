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
import Excel from "../Components/Excel";
import PdfDowload from "../Components/PdfDowload";
import MiniOverview from "../Components/MiniOverview"

Chart.register(CategoryScale);

const Expense= () => {

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
  const [page, setPage] = useState('expense')


const tranData = Tabledata.flat().filter((items)=> items.type.toLowerCase().includes('expense'))

  const userDetails = {
    name: "John Doe",
    accountNumber: "123456789",
    statementPeriod: "01 Jan 2025 - 31 Jan 2025",
  };


  

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
    const temp = [...tranData];
    const num = Math.ceil(temp.length / 10);
    const newArr = Array.from({ length: num }, () => []);
    for (let i = 0; i < num; i++) {
      for (let j = 0; j < 10 && temp.length; j++) {
        newArr[i].push(temp.shift());
      }
    }
    setPage('expense')
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

  

  const dashboardelement = 
  
  <TransCard
        key={Dataone[2]}
        title={Dataone[2].title}
        amount={Dataone[2].amount}
        percent={Dataone[2].percentage}
        icon={Dataone[2].icon}
        gain={Dataone[2].gains}
        colr={
          Dataone[2].title === "Balance"
            ? "blue"
            : Dataone[2].title === "Income"
            ? "green"
            : Dataone[2].title === "Expenses"
            ? "red"
            : "yellow"
        }
      />
  


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
      <div className=" flex items-center font-body font-semibold text-[10px] text-textcol h-6 px-2 rounded justify-center 
       border-[1px] border-buttonlight gap-2 cursor-pointer" onClick={pageBack}>  {iconMapping.pageLeft} <span>
       Previous  </span> </div>

      <div className="flex gap-2">
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
                ? "flex justify-center items-center font-body border-[1px] text-[10px] font-bold border-buttoncolor text-buttoncolor  w-5 h-5 rounded cursor-pointer"
                : "flex justify-center items-center text-textcol text-[10px] font-body font-bold border-[1px] border-back  w-5 h-5 rounded cursor-pointer"
            }
            key={index}
          >
            {num}
          </div>
        ))}
      </div>

      <div className=" flex items-center font-body font-semibold text-[10px] text-textcol h-6 px-2 rounded justify-center 
       border-[1px] border-buttonlight gap-2 cursor-pointer"  onClick={pageFoward}> {iconMapping.pageRight} Next</div>
    </>
  );

  return (
    <div className="relative w-full bg-back flex flex-col">
      <Header query={query} setQuery={setQuery} />

      <div className="flex p-6 ">
        <div className="flex flex-col gap-1 ">
          <div className="font-body font-bold text-3xl text-textcol">
            Expense
          </div>
          <div className="font-body text-xs">
            An overview of the Your Expenses
          </div>
        </div>
      </div>

      {/* {isShowAddTrans && (<div><AddTrans addTransaction={addTransaction} toggleAddTrans={toggleAddTrans}/></div>)} */}




      <div className="flex  flex-col items-center justify-center  bg-back gap-7 px-6 ">
        <div className="flex flex-col md:flex md:flex-row w-full gap-8">{dashboardelement}</div>

      



        <div className="flex flex-col lg:flex-row gap-7 w-full mb-7 ">
          <div className="flex w-full h-auto  lg:w-[70%] lg:h-[480px]">
            <LineChart ChartData={ChartData} page={page}/>
          </div>

          <div className="w-full  lg:w-[30%]">
            <MiniOverview page={page} />
          </div>
        </div>



<div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center justify-between w-full">
  <div className="font-bold font-body text-2xl">Transaction History</div>


  <div className="flex gap-2 items-center">
    

    <div>
      <PdfDowload transactions={Tabledata} Userdetails={userDetails}/>
    </div>
    
    <div> 
      <Excel data={Tabledata}/>
       </div>
    <div  className="flex font-body font-bold text-[10px]  bg-buttoncolor rounded shadow-sm px-3 py-2 items-center gap-1">Add Transaction</div>
  </div>
</div>



<div className="bg-white px-2 py-4 w-full rounded-md mb-5 shadow-sm overflow-hidden">

        <div className="flex flex-col  md:flex-row items-start md:items-center gap-4 justify-between w-full md:px-6 md:py-4 bg-white   relative">
          <form  action="">
            
           <div  className="items-center flex justify-center gap-2 w-[13.5rem]
            border-gray-50 border-2 font-body text-xs h-[2.3rem] p-2 rounded-md focus:outline-none focus:border-back"> 
            <input
              className=" border-0 focus:outline-none"
              type="search"
              placeholder='Search here...'
              name="search"
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              />
              <div>{iconMapping.searchIcn} </div>
              </div>
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
              className="flex font-body font-normal text-xs gap-1 items-center  border-[1px] border-back px-3 py-2 shadow-sm rounded-md"
              >
              {iconMapping.filter} Filter
            </div>
          </div>
          {isshowPopFilter && (
            <div className="flex  mt-[18rem] ml-[56rem] absolute">
              <PopOver
                page={page}
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
            <div className="flex  md:items-center md:overflow-hidden font-body text-sm  bg-white md:justify-center p-1 overflow-x-scroll ">
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

            <div className="flex flex-col-reverse gap-4 md:flex-row  px-8 py-2 justify-between items-center">
             <div className="flex border-[1px] px-2 py-1 rounded text-[10px] 
             font-body font-semibold text-textcol shadow-sm">
              
              Page {control + 1} of  {""}
             { isCategorySelected ? filteredByCategory.length : isTypeSelected ? filteredByType.length :
             isDateFiltered ? filteredByDate.length : isFiltered ? filterd.length : dataTab.length}



           </div> <div className="flex items-center gap-2">{Pagenation}  </div ><div className="flex opacity-0">{"page"}</div>
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

export default Expense;
