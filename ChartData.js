import { ca } from "date-fns/locale";
import React from "react";

const ChartData = [
    {labels:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] ,
        datasets:[
          {
            label: 'Income',
            data:[1000, 2000, 500, 4000, 3500, 6000, 5800, 8000, 7200, 10000, 11000, 12000], 
            backgroundColor: '#17C666',
            borderColor:'#17C666',
            borderRadius:10,
            barPercentage: 0.7,
            categoryPercentage: 0.6,
            // barThickness: 2,
            borderSkipped: false,

          },
      
          {
            label: 'Expense',
            data:[500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000], 
            backgroundColor: '#EA4D4D',
                borderColor:'#EA4D4D',
                borderRadius:10,
                barPercentage: 0.7,
                categoryPercentage: 0.6,
                borderSkipped: false,
                // barThickness: 2,

          
          },
      
          {
            label: 'Saving',
            data:[500, 1000, 1500, 2500, 3000, 4000, 4500, 5000, 5500, 6000, 6500, 7000], 
            backgroundColor: '#FFA21D',
            borderColor:'#FFA21D',
            borderRadius:10,
            barPercentage: 0.7,
            categoryPercentage: 0.6,
            borderSkipped: false,
            // barThickness: 2,

           
          }
        ]
      }
];

export default ChartData;