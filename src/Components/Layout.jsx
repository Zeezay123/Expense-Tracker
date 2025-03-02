import React from 'react'
import Header from './Header'
import {useState , useEffect} from 'react'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar'
import SidebarTwo from './SidebarTwo'
import iconMapping from './iconMapping'
import TempSiderBar from './TempSiderBar'



const Layout = () => {


const [offSideMenu, setOffSideMenu] = useState(false);
const [isRotated, setIsRotated] = useState(false)
const [smallMenu, setSmallMenu] = useState(false)
const [isanimated, setIsAnimated] =useState(false)
const [onTempMenu, setOnTempMenu] = useState(false)

useEffect(()=>{
 
   const handleScreenSize = () =>{ 
      if(window.innerWidth > 1000) {
         setOffSideMenu(false)
      }
      else setOffSideMenu(true)

   }

   handleScreenSize();

   window.addEventListener('resize', handleScreenSize);
   return ()=> window.removeEventListener('resize', handleScreenSize)


},[]);



  return (

   
    
     <div className='flex  h-screen bg-back relative'>
      
      { onTempMenu ? <div className='z-[99] h-full w-full absolute'> 
         <TempSiderBar onTempMenu={onTempMenu} setOnTempMenu={setOnTempMenu}/> </div> : null}


       { offSideMenu ? null : !smallMenu ? <div className='hidden lg:flex w-[21%] mr-0'>
         
         <Sidebar/></div> : <div className=' hidden lg:flex w-[9%] mr-0'> <SidebarTwo/> </div>}
 
       


    <div className='flex bg-back  w-full h-screen ml-[-8px] '>

    <Outlet context={{onTempMenu, setOnTempMenu, offSideMenu, smallMenu, setSmallMenu}}/>
 
    </div>   

     </div>
   

   
  )
}

export default Layout