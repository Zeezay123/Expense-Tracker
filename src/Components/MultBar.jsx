import React, { useState,useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { plugins } from "chart.js";



import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend
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
)


const MultBar = ({ChartData}) => {

const [barData, setBarData] = useState({datasets: [], labels: []});

useEffect(() => {
 const fetchdata = async () => {
    try{
const data = ChartData[0]
console.log(data)
setBarData({
    labels: data.labels,
    datasets: data.datasets.map((dataset) => ({
        label: dataset.label,
        data: dataset.data,
        backgroundColor: dataset.backgroundColor,
        borderColor: dataset.borderColor,
        tension: dataset.tension
    })),
});    
 } catch (error) {
    console.error('Error fetching data: ', error);
 }
 } 

 fetchdata();
}, [ChartData]);




    
  return (
    <div  style={{ width: '700px', height: '300px' }}>
        <Bar   
        
        data= {barData}

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
                    dash: [2]           
                  }
                }
              }
            }} />
    </div>
  )
}

export default MultBar