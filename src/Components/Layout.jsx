import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'
import Sidebar from './Sidebar'
const Layout = () => {
  return (

    
     <div className='flex h-screen'>
        <div className='flex'>

         <Sidebar/>
        </div>

    <div className='flex flex-col w-full ml-[12.5rem]'>


     <Header/>

     <Outlet/>
 
    </div>   

     </div>
   

   
  )
}

export default Layout