import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { plugins } from "chart.js";
7;
import iconMapping from "./iconMapping";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { data } from "autoprefixer";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MultBar = ({ ChartData }) => {
  const [barData, setBarData] = useState({ datasets: [], labels: [] });

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = ChartData[0];
        setBarData({
          labels: data.labels,
          datasets: data.datasets.map((dataset) => ({
            label: dataset.label,
            data: dataset.data,
            backgroundColor: dataset.backgroundColor,
            borderColor: dataset.borderColor,
            borderRadius: dataset.borderRadius,
            barPercentage: dataset.barPercentage,
            categoryPercentage: dataset.categoryPercentage,
            borderSkipped: dataset.borderSkipped,

          })),
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchdata();
  }, [ChartData]);

  return (
    <div  className="flex flex-col bg-white rounded-md w-full h-full border-2 p-4">
      <div className="flex items-center justify-between p-2">
        <h4 className="font-extrabold font-sans text-md">Statistics</h4>

        <div className="flex items-center gap-5">
          <div className="flex  item-center justify-center gap-[0.125rem]">
            <span className="flex justify-center items-center text-green-400"> {iconMapping.circle}</span>
             <span className="flex justify-center items-center text-gray-500 font-sans font-semibold text-xs">Income</span>
          </div>


          <div className="flex  item-center justify-center gap-[0.125rem]">
            <span className="flex justify-center items-center text-red-400"> {iconMapping.circle}</span> 
            <span className="flex justify-center items-center text-gray-500 font-sans font-semibold text-xs">Expenses </span>
          </div>


          <div className="flex  item-center justify-center gap-[0.125rem]">
            <span className="flex justify-center items-center text-yellow-300"> {iconMapping.circle}</span>
             <span className="flex justify-center items-center text-gray-500 font-sans font-semibold text-xs">Savings</span>
          </div>

        </div>
      </div>

      <div  >
        <Bar
          data={barData}
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
                },
              },
              y: {
                ticks: {
                  callback: (value) => "$" + value, // Adds dollar sign to y-axis values
                },
                border: {
                  dash: [10],
                },
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default MultBar;
