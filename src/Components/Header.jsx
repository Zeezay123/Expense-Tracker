import React from 'react'
import { Link } from 'react-router-dom'
import passport from '../assets/passport1.jpg'
import iconMapping from "../Components/iconMapping";
import SearchComp from './SearchComp';
import {useState} from 'react'
import { useOutletContext } from 'react-router-dom';


const Header = ({query, setQuery}) => {

const {onTempMenu, setOnTempMenu, offSideMenu} = useOutletContext();
const [showHamMenu, setSHowHamMenu] = useState(false)


const toggleHamMenu =()=> {
  setOnTempMenu(true)
} 

  return (
    
    <div className='flex w-full p-5 items-center justify-between bg-white h-20 border-slate-50 border-b-[0.0625rem] ' > 
   
    
    <div>
    {/* <h1 className='font-sans font-extrabold text-gray-900 text-2xl'> OVERVIEW</h1>  */}

<div className='flex items-center gap-8'>

   { offSideMenu ? <div className='flex items-center border-2 p-1 rounded-sm border-buttonlight' onClick={toggleHamMenu}> {iconMapping.hamMenu}</div> : null  }


    <SearchComp query={query} setQuery={setQuery}  />
</div>
    
    
    {/* <span className='font-sans text-gray-400'>Welcome to your Dashboard</span> */}
      </div>
      
      <div className='flex items-center gap-2 '>
      
      <div className='flex items-center justify-center bg-iconback rounded-full w-8 h-8'> {iconMapping.notBell} </div> 
      <div className='flex items-center justify-center bg-iconback rounded-full w-8 h-8'> {iconMapping.settingsIcn} </div>
       
      {/* <span className=' opacity-50'>{iconMapping.vertDiv}</span> */}

       <Link to='pages/settings'>
      <img className='flex rounded-full'
       width={30}
       height={30}
       src={passport}
       alt="passport Image." /></Link>

       <div className='flex flex-col ml-2'>

       <span className='flex font-bold font-sans text-xs'>Edward Stiles</span>
       
       <span className='flex font-sans text-[0.625rem] text-gray-400'>stilesedward@gmail.com</span>
       </div>

       <span>{iconMapping.cheDown}</span>
       </div>
      
      </div>
  )
}

export default Header