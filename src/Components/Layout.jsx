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
const [screenWidth, setScreenWidth] = useState(window.innerWidth);

useEffect(()=>{
 
   const handleScreenSize = () =>{ 
      setScreenWidth(window.innerWidth);
      if(window.innerWidth > 1000) {
         setOffSideMenu(false)
      }
      else setOffSideMenu(true)

   }

   handleScreenSize();

   window.addEventListener('resize', handleScreenSize);
   return ()=> window.removeEventListener('resize', handleScreenSize)


},[]);

const offTempMenu =()=> {
   setOnTempMenu(false)

}

  return (

   
    
     <div className='flex  h-screen bg-back relative'>
      
      { onTempMenu ? <div className='z-[99] h-full w-full absolute'> 
         <TempSiderBar onTempMenu={onTempMenu} setOnTempMenu={setOnTempMenu}/> </div> : null}


       { offSideMenu ? null : !smallMenu ? <div className='hidden lg:flex w-[21%] mr-0'>
         
         <Sidebar/></div> : <div className=' hidden lg:flex w-[9%] mr-0'> <SidebarTwo/> </div>}
 
       


  

   { onTempMenu ? <div className='flex relative overflow-hidden w-full'>   <div className='flex w-full ml-[60%] md:ml-[0] h-full bg-black opacity-50 absolute z-[99]'onClick={offTempMenu} > full</div> <Outlet key={screenWidth} context={{onTempMenu, setOnTempMenu, offSideMenu, smallMenu, setSmallMenu}}/> </div> 
   :   <div className={`flex bg-back  h-screen ${!smallMenu ? 'w-full md:w-[82%]': 'w-full md:w-[91%]'  }`}><Outlet key={screenWidth} context={{onTempMenu, setOnTempMenu, offSideMenu, smallMenu, setSmallMenu}}/></div>  
}
    
 
     </div>
   

   
  )
}

export default Layout