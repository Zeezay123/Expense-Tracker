import React from 'react'
import Dataone from '../../Dataone'
import iconMapping from "../Components/iconMapping";


const TransCard = ({title, amount, percent, icon, gain, colr}) => {






  return (

        <div className='flex flex-col gap-8 bg-[white] w-[15.5rem]  p-3 rounded-md'>

        <div className='flex gap-2 items-center'> <span className={ `flex items-center justify-center rounded-sm w-6 h-6
            ${ colr ? ` bg-[${colr}] bg-opacity-10` : 'bg-slate-100'}`} >
            {icon || iconMapping.balanceIcon}</span> 
            
            <h4 className='font-sans font-bold text-base opacity-60'> { title || 'Balance'}</h4></div>
       
       <div className='flex flex-col gap-1'>

         <div className='flex items-center gap-2'>
         <h1 className='font-sans text-3xl font-bold'>{ amount || '$15,000.00'}</h1>
   
        <span className={`flex items-center  py-[4px] px-1 rounded-full ${ colr ? `bg-[${colr}]  bg-opacity-40`: 'bg-blue-100'}` }>
       <span className={`text-[${colr}]`}>  {iconMapping.upArrow} </span>

         <h2 className={`font-sans font-bold text-xs ${ colr ? `text-[${colr}] text-opacity-100` : 'text-blue-900'}`}>
            { percent || '1.2%'}</h2>
        </span>
         
         
         </div>
         
         <div className='flex items-center gap-1 font-sans '>
            <h3 className={`font-bold text-xs ${colr ? `text-[${colr}] text-opacity-100` : 'text-blue-900'}`}>{ gain || '+$459.04'}</h3> 
         <span className='opacity-55 text-xs'>than last month</span> </div>
       </div>
    
        </div>

  )
}

export default TransCard