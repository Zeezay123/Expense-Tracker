import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

import { plugins } from "chart.js";

const LineChart = ({ chartsData,dataTab, setIncomeGraphData, setExpenseGraphData, setSavingsGraphData}) => {
    useEffect(() => {
    const incomeArr = Array.from({length:12}, () =>[])  
    const expenseArr = Array.from({length:12}, () =>[])  
    const saveArr = Array.from({length:12}, () =>[])  
    
    
    const sortByDate = dataTab.sort((a,b)=> {
      const dateA = new Date(a.date)
      const dateB = new Date(b.date)
    
      return dateA - dateB 
    
    })
    
    sortByDate.map((data) =>{
      const dateObj = new Date(data.date)
      const monthIndex = dateObj.getMonth();
    
    
          if(data.type === 'income'){
             incomeArr[monthIndex].push(data.amount)
          }
          if(data.type === 'expense' )
          {
            expenseArr[monthIndex].push(data.amount)
          }
          if(  data.type === 'savings'){
          saveArr[monthIndex].push(data.amount)
          }
        
    
    })
    
    setIncomeGraphData(incomeArr.map(month => (month.reduce((acc, num) => acc + num, 0))))
    setExpenseGraphData(expenseArr.map(month => (month.reduce((acc, num) => acc + num, 0))))
    setSavingsGraphData(saveArr.map(month => (month.reduce((acc, num) => acc + num, 0))))
    
    

     


   }, [chartsData,dataTab, setIncomeGraphData, setExpenseGraphData, setSavingsGraphData])
   












  return (
<div style={{ width: '800px', height: '400px' }}>
  <Line
    data={chartsData}
    options={{
      plugins: {
        title: {
          display: true,
        },
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            display: false, // Removes the gridlines on the x-axis
          }
        },
        y: {
          ticks: {
            callback: (value) => '$' + value, // Adds dollar sign to y-axis values
          },
          border: {
            dash: [10]           
          }
        }
      }
    }}
  />
</div>
  );
};

export default LineChart;
