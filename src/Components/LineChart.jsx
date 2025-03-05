import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import iconMapping from "./iconMapping";
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

const LineChart = ({ChartData}) => {

   
const [line, setLine] = useState({datasets:[] , labels:[]})



useEffect ( ()=>{

 const fetchdata = async ()=>{
    try{
      const data = ChartData[0].datasets.find(dataset => dataset.label.toLowerCase() === 'income')
      console.log(data)
      setLine({
        labels: ChartData[0].labels,
        datasets: [{
          
          label: data.label,
           data: data.data,
    
           borderColor: data.borderColor,
           tension: 0.3
          }
        ]
      })

      
    } 
    catch (error){
      console.error("Error fetching data: ", error);
    }
 
  }
  
  fetchdata();

},[ChartData])











  return (

    <div  className="flex flex-col bg-white rounded-md w-full h-full border-2 p-4">
      <div className="flex items-center justify-between p-2">
        <h4 className="font-extrabold font-sans text-md">Statistics</h4>

        <div className="flex items-center gap-5">
          <div className="flex  item-center justify-center gap-[0.125rem]">
            <span className="flex justify-center items-center text-green-400"> {iconMapping.circle}</span>
             <span className="flex justify-center items-center text-gray-500 font-sans font-semibold text-xs">Income</span>
          </div>


          {/* <div className="flex  item-center justify-center gap-[0.125rem]">
            <span className="flex justify-center items-center text-red-400"> {iconMapping.circle}</span> 
            <span className="flex justify-center items-center text-gray-500 font-sans font-semibold text-xs">Expenses </span>
          </div>


          <div className="flex  item-center justify-center gap-[0.125rem]">
            <span className="flex justify-center items-center text-yellow-300"> {iconMapping.circle}</span>
             <span className="flex justify-center items-center text-gray-500 font-sans font-semibold text-xs">Savings</span>
          </div> */}

        </div>
      </div>
<div>
  <Line
    data={line}
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
</div>
  );
};

export default LineChart;
