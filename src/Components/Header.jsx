import React from 'react'
import { Link } from 'react-router-dom'
import passport from '../assets/passport1.jpg'
import iconMapping from "../Components/iconMapping";


const Header = () => {
  return (
    <div className='flex p-4 items-center justify-center' > 
    <div className='flex items-center justify-between w-[97%] px-6 py-3 rounded-full'>
    
    <div>
    <h1 className='font-sans font-extrabold text-gray-900 text-2xl'> OVERVIEW</h1> 
    {/* <span className='font-sans text-gray-400'>Welcome to your Dashboard</span> */}
      </div>
      
      <div className='flex items-center '>
      
      <div className='flex items-center justify-center bg-slate-200 rounded-full w-10 h-10'> {iconMapping.notBell} </div>
       
       <span className=' opacity-50'>{iconMapping.vertDiv}</span>

       <Link to='pages/settings'>
      <img className='flex rounded-full'
       width={40}
       height={40}
       src={passport}
       alt="passport Image." /></Link>
       <div className='flex flex-col ml-2'>

       <span className='flex font-semibold font-sans text-sm'>Edward Stiles</span>
       
       <span className='flex font-sans text-xs text-gray-400'>stilesedward@gmail.com</span>
       </div>

       <span>{iconMapping.cheDown}</span>
       </div>
       </div>
      </div>
  )
}

export default Header