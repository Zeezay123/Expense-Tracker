import React from 'react'
import Button from './Button'
import { useState } from 'react'

const AddTrans = ({addTransaction,toggleAddTrans}) => {
  
const [formData, setFormData] = useState({'name': '', 'category': '', 'date':'', 'amount':'', 'type':''})



function TransData(e){
    e.preventDefault();

    addTransaction(formData)
    setFormData({'name': '', 'category': '', 'date':'', 'amount':'', 'type':''})
}




  return (
    <div className='flex items-center justify-center bg-black/20 w-full h-full z-10 absolute'>



        <form className='flex flex-col gap-4 w-96 px-10 py-6 bg-gray-100 rounded-lg shadow-lg' onSubmit={TransData}>
           
           
           
           
            <label htmlFor="name">Name</label>
            <input className='border-2 rounded-md  h-9 p-2'
            id='name' 
            type="text"
            placeholder='Name'
            value={formData.name}
            onChange={(e)=>setFormData({...formData, name:e.target.value})} required/>

        
        

       <label className='flex justify-between'  htmlFor="category" > <span className='text-gray-500'>Category</span> <div onClick={() => setFormData({ ...formData, category: '' })} >clear</div></label>
        <select className='border-2 rounded-md  h-9 p-2'
         name="category"
          id="category" 
          value={formData.category}
          onChange={(e)=>setFormData({...formData, category:e.target.value})}
           >

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




            <label htmlFor="Date">Date</label>
            <input className='border-2 rounded-md  h-9 p-2' 
            id='Date' 
            type="date" 
            value={formData.date}
            onChange={(e)=>setFormData({...formData, date:e.target.value})}
           required />



  
            <label htmlFor="amount">Amount</label>
            <input  className='border-2 rounded-md  h-9 p-2'
            id='amount' 
            type="number" 
            placeholder='Enter amount'
            value={formData.amount}
            onChange={(e)=>setFormData({...formData, amount:e.target.value})} required />
            



         <label className='flex justify-between ' htmlFor="type"> <span className='text-gray-500'>Type </span> <div onClick={() => setFormData({ ...formData, type: '' })}>clear</div></label>
        <select className='border-2 rounded-md h-9 p-2' 
        name="type" 
        id="type" 
        value={formData.type}
            onChange={(e)=>setFormData({...formData, type:e.target.value})}
        >


            <option value=""> Select Type</option>
            <option value="Expense"> Expenses</option>
            <option value="income"> Income</option>
            <option value="savings"> Savings</option>
            <option value="balance"> Balance </option>

        </select>
  
  


       <div> <button type='submit' formMethod='post'> Submit </button>  <button onClick={() => toggleAddTrans()} >Cancel</button></div>

        </form>
    </div>
  )
}

export default AddTrans