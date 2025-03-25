import React from "react";
// import { Progress } from 'rsuite'
import { useState, useEffect } from "react";
import "rsuite/dist/rsuite.min.css";
import * as Progress from "@radix-ui/react-progress";
import Dataone from "../../Dataone";
import Tabledata from "../../Tabledata";

const MiniOverview = ({page}) => {
  const [option, setOption] = useState('income');
const [totalAmount, setTotalAmount] = useState('')
const [topThreeAmount, setTopThreeAmount] = useState([])
const [color, setColor] = useState('green') 
const [threesum, setThreeSum] = useState(120)





  useEffect(()=>{
    
    const briefOverview = (page)=>{

    page.toLowerCase() == 'expense' ? setColor('#EA4D4D') : page.toLowerCase() == 'income' ? setColor('#17C666' ): setColor('#FFA21D')


        const expenseData = Tabledata.filter((datas) => {
          return datas.type.toLowerCase().includes(page);
        });
      
        const catgs = expenseData.reduce(
          (acc, value) => {
            if (!acc[value.category]) {
              acc[value.category] = [];
            }
            acc[value.category].push(value);
            return acc;
          },
      
          {}
        );
       
        const catgsTotal = Object.entries(catgs).map(([category,expenses]) => {
          const total =parseFloat(expenses.reduce((acc, item) => acc + item.amount, 0).toFixed(2));
          return {category,total}
        })
      
        catgsTotal.sort((a,b) => {
          const aTotal = a.total
          const bTotal = b.total
          return bTotal - aTotal  
      })
      
      
      
      
      
      const top3Catg = catgsTotal.slice(0,3)
      setTopThreeAmount(top3Catg)
      


      const tempTop3 = [];


       top3Catg.map((item) => {tempTop3.push(item.total) })

       const tempthree = tempTop3.reduce((acc,curr)=> {return acc + curr})
       setThreeSum(tempthree)
       

        const tempTotal = [];
        catgsTotal.map((data) => {tempTotal.push(data.total)})
      
       const combinedTotalExp = tempTotal.reduce((acc,curValue) => {return acc + curValue})
       setTotalAmount(combinedTotalExp)
      
       }
      
  
        // if (option == 'income'){
        //     setColor('#17C666')
        //   }
        // if(option == 'expense'){
        //     setColor('blue')
        // }

        // console.log(color)
  
       briefOverview(page)
  },[page])

  
// console.log(topThreeAmount)
// console.log(totalAmount)
// console.log(color)





const perc = (threesum / totalAmount)* 100

function addComma(digit){
    return digit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

}

function firstLCap(word){

    //   const firstletter = word.slice(0,1).toUpperCase()
      return word.charAt(0).toUpperCase() + word.slice(1)
}




const progressBars = topThreeAmount.map((bar,index)=>{
    const value = (bar.total / totalAmount) * 100
  
    return (
      

        <div key={index} className="flex flex-col mt-5 gap-2">
        <div className="flex flex-col p-1 mt-2">
          <div className="flex justify-between items-center">
            {" "}
            <span className="font-body font-bold text-sm ">{firstLCap(bar.category)}</span>
            <span className="text-[10px] font-body text-gray-400 ">
              {" "}
              <span>${addComma(bar.total)}</span> / <span>${addComma(totalAmount)}</span>{" "}
            </span>{" "}
          </div>

          <div className="flex items-center gap-2 mt-1 ">
            <Progress.Root
              className="ProgressRoot"
              value={value}
              style={{
                width: "300px",
                height: "4px",
                backgroundColor: "lightgray",
                borderRadius: "9999px",
              }}
            >
              <Progress.Indicator
                className="ProgressIndicator"
                style={{
                  backgroundColor:color,
                  borderRadius: "9999px",
                  transform: `translateX(-${100 - value}%)`,
                }}
              />
            </Progress.Root>
            <span className="font-body text-[10px]">{value.toFixed(1)}%</span>
          </div>
        </div>

        
      </div>
    )
})





  return (
    <div className="flex flex-col w-[100%] h-[27.5rem] bg-white rounded-md px-4 py-2 shadow-sm">
      <div className="py-4 mb-4 flex items-center justify-between pr-4">
        <span className="font-body font-bold text-lg"> Brief Overview {firstLCap(page)}</span>

        
      </div>

      <div className="flex items-center mb-4 gap-6 justify-between pr-4">
        <h2 className="font-extrabold text-2xl font-body "> ${addComma(totalAmount)}</h2>


        <span className={`flex justify-center items-center 
         w-14 h-6 px-3 text-xs font-bold font-sans border-[1px] rounded-sm 
         ${page.toLowerCase() == 'expense' ? 'bg-expenselight text-expensebar' :
          page.toLowerCase() == 'income' ?'bg-incomelight text-incomebar': 'bg-savingslight text-savingsbar'}
         `}>


          {perc.toFixed(2)}%
        </span>
      </div>

      <div className="flex items-center">
        <span className={`font-body font-extrabold text-xs mr-1 ${page.toLowerCase() == 'expense'? 'text-expensebar': 
           page.toLowerCase() == 'income' ? 'text-incomebar': 'text-savingsbar' }`}>
          ${addComma(threesum.toFixed(2))}
        </span>
        <span className="font-body  text-xs text-gray-400">
          From the top three {option}
        </span>{" "}
      </div>

      <span className="w-[100%] border-b-2 mt-6 border-slate-200"></span>

      {/* <div style={{width:'300px', height:'4px'}}> <Progress.Line percent={value} strokeColor={color} /></div> */}

       {progressBars}
    </div>
  );
};

export default MiniOverview;
