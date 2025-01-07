import React from "react";

const ChartData = [
    {labels:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] ,
        datasets:[
          {
            label: 'Income',
            data:[1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000], 
            backgroundColor: 'yellow',
            borderColor:'yellow',
            tension:0.5
          },
      
          {
            label: 'Expense',
            data:[500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000], 
            backgroundColor: 'red',
                borderColor:'red',
                tension:0.5
          
          },
      
          {
            label: 'Saving',
            data:[200, 1000, 1500, 2500, 3000, 4000, 4500, 5000, 5500, 6000, 6500, 7000], 
            backgroundColor: 'green',
            borderColor:'green',
            tension:0.5 
           
          }
        ]
      }
];

export default ChartData;