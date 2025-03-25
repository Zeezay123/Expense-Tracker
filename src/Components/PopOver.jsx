import React from 'react'
import { useState} from 'react'

const PopOver = ({isshowPopFilter,setIsShowPopFilter, setSelectedType, setSelectedCategory,page}) => {

const cancelpop = () => (
  setIsShowPopFilter(false)
)
    

  return(
  isshowPopFilter ? (
    
   page == 'All' ?( <div className='flex flex-col gap-4 bg-slate-50 w-[16.75rem] h-[15rem] rounded-lg shadow-md border-0'>
        <div className='flex justify-between  items-center px-3 bg-gray-200 h-10 rounded-t-lg border-b-2 border-gray-300'><h1>Filter </h1> <div onClick={()=>(cancelpop())} >X</div></div>
        



        <div className='flex flex-col px-3'>

        <label className='flex justify-between pb-2' htmlFor="type"> <span className='text-gray-500'>Type </span> <div onClick={()=>(setSelectedType(''))}>clear</div></label>
        <select className='border-2 rounded-md h-9' name="type" id="type" onChange={(e)=>(setSelectedType(e.target.value))}>
            <option value=""> Select Type</option>
            <option value="Expense"> Expenses</option>
            <option value="income"> Income</option>
            <option value="savings"> Savings</option>
            <option value="balance"> Balance </option>

        </select>

        </div>




<div className='flex flex-col px-3'>

        <label className='flex justify-between pb-2'  htmlFor="category" > <span className='text-gray-500'>Category</span> <div onClick={()=>(setSelectedCategory(''))}>clear</div></label>
        <select className='border-2 rounded-md  h-9' name="category" id="category"  onChange={(e)=>(setSelectedCategory(e.target.value))}>
            <option value=""> Select Category</option>
            <option value="Salary"> Salary</option>
            <option value="Entertainment"> Entertainment</option>
            <option value="Freelance"> Freelance</option>
            <option value="Savings"> Savings </option>
            <option value="Food"> Food</option>
            <option value="Budget"> Budget</option>
            <option value="Electronics"> Electronics</option>
            <option value="Investments"> Investments </option>
        </select>
</div>
    </div>)
    
  :

<div className='flex flex-col gap-4 bg-slate-50 w-[16.75rem] h-[10rem] rounded-lg shadow-md border-0'>
        <div className='flex justify-between  items-center px-3 bg-gray-200 h-10 rounded-t-lg border-b-2 border-gray-300'><h1>Filter </h1> <div onClick={()=>(cancelpop())} >X</div></div>
        








<div className='flex flex-col px-3'>

        <label className='flex justify-between pb-2'  htmlFor="category" > <span className='text-gray-500'>Category</span> <div onClick={()=>(setSelectedCategory(''))}>clear</div></label>
        <select className='border-2 rounded-md  h-9' name="category" id="category"  onChange={(e)=>(setSelectedCategory(e.target.value))}>
            <option value=""> Select Category</option>
            <option value="Salary"> Salary</option>
            <option value="Entertainment"> Entertainment</option>
            <option value="Freelance"> Freelance</option>
            <option value="Savings"> Savings </option>
            <option value="Food"> Food</option>
            <option value="Budget"> Budget</option>
            <option value="Electronics"> Electronics</option>
            <option value="Investments"> Investments </option>
        </select>
</div>
    </div>



) : null
  )
}


export default PopOver