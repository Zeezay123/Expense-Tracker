import React from 'react'
import Dataone from '../../Dataone'
import iconMapping from "../Components/iconMapping";


const TransCard = ({title, amount, percent, icon, gain}) => {






  return (

        <div className='flex flex-col gap-8 bg-[white] w-[100%]  p-3 rounded-md lg:w-[23%]'>

        <div className='flex gap-2 items-center'> <span className={ `flex items-center justify-center rounded-sm w-7 h-7 p-1
            ${ title.toLowerCase() =='income' ? 'bg-incomelight' 
             : title.toLowerCase() == 'expenses' ? 'bg-expenselight'
             : title.toLowerCase() == 'savings' ? 'bg-savingslight' 
             : 'bg-hovercolor'}`} >
            {icon || iconMapping.balanceIcon}</span> 
            
            <h4 className='font-body font-semibold text-sm opacity-60'> { title || 'Balance'}</h4></div>
       
       <div className='flex flex-col gap-4'>

         <div className='flex items-center justify-between pr-4'>
         <h1 className='font-body text-2xl font-extrabold'>{ amount || '$15,000.00'}</h1>

   
        <span className={`flex items-center  py-[4px] px-1 rounded-sm w-12 h-5 justify-center  
          ${ title.toLowerCase() =='income' ? 'bg-incomelight'  
          : title.toLowerCase() == 'expenses' ? 'bg-expenselight': 
          title.toLowerCase() == 'savings' ? 'bg-savingslight' : 
          'bg-hovercolor'}`}>


     


         <h2 className={`font-sans font-bold text-xs 
           ${ title.toLowerCase() =='income' ? 'bg-incomelight' 
            : title.toLowerCase() == 'expenses' ? 'bg-expenselight'
            : title.toLowerCase() == 'savings' ? 'bg-savingslight'
             : 'bg-hovercolor'}`}>


            { percent || '1.2%'}</h2>
        </span>
         
         
         </div>
         
         <div className='flex items-center gap-1 font-sans '>

            <h3 className={`font-bold text-xs 
               ${ title.toLowerCase() =='income' ? 'text-incomebar' 
                : title.toLowerCase()  == 'expenses' ? 'text-expensebar'
                : title.toLowerCase()  == 'savings' ? 'text-savingsbar' 
                : 'text-buttoncolor'}`}>{ gain || '+$459.04'}</h3> 

         <span className='opacity-55 text-xs'>than last month</span> </div>
       </div>
    
        </div>

  )
}

export default TransCard