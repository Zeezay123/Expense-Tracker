import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
// import {AiOutlineDashboard } from 'react-icons/ai'
import { AiFillDashboard } from "react-icons/ai";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaTableCellsRowLock } from "react-icons/fa6";
import { AiFillSetting } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import logo from '../assets/logo.svg'
import { useState, useEffect } from 'react';


const TempSiderBar = ({setOnTempMenu, onTempMenu}) => {




const offTempMenu =()=> {
    setOnTempMenu(false)

    console.log(onTempMenu)
}

const activeStyles = {
  background: "#487FFF",
  height: "3rem",
  width: "90%",
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
  borderRadius: "0.5rem",
  color: "white",
  textDecoration: "none",
  
  
};





const iconMapping = {
 dash: <AiFillDashboard   color='black' size={18}/>, 
 inc: <FaMoneyBillTrendUp color='black' size={18} />,
 exp: <FaMoneyBillTransfer color='black' size={18} />,
 sav: <FaTableCellsRowLock color='black' size={18}/>,
 sett: <AiFillSetting color='black' size={18}/>,
 logg: <CiLogin color='black' size={18}/>
}

    
  return (
    <div className='flex  w-full h-full  z-[9] absolute'>
        
    <div className='flex   h-screen flex-col justify-between w-[60%] md:w-[18%]
       bg-white border-r-[0.0625rem] border-iconback fixed overflow-hidden z-[10]' >
          <div className='flex flex-col font-sans font-semibold text-sm '> 
          <div className='flex items-center mb-5 p-4  h-20 '> <img src={logo} width={100} height={48} alt="" /></div>
    
    
          <NavLink  style={({isActive}) => isActive ? activeStyles : {}} className='dash-item ml-3 '  onClick={offTempMenu} end  to='.'> <div className='dash-icon'>{iconMapping.dash}</div>  Dashboard </NavLink>
          
          
           <NavLink style={({isActive}) => isActive ? activeStyles : {}} className='dash-item ml-3 '  onClick={offTempMenu} end to='pages/income'> <div className='dash-icon'>{iconMapping.inc} </div>  Income </NavLink>
           
    
           <NavLink style={({isActive}) => isActive ? activeStyles : {}}  className='dash-item ml-3 '  onClick={offTempMenu} to='pages/Expense'> <div className='dash-icon'>{iconMapping.exp} </div> Expense </NavLink>
    
    
           <NavLink style={({isActive}) => isActive ? activeStyles : {}}  className='dash-item ml-3 '  onClick={offTempMenu} to='pages/savings'> <div className='dash-icon'>{iconMapping.sav} </div>  Savings </NavLink>
    
    
           <NavLink style={({isActive}) => isActive ? activeStyles : {}}  className='dash-item ml-3 '  onClick={offTempMenu} to='pages/settings'> <div className='dash-icon'>{iconMapping.sett} </div>  Setings </NavLink>
          </div>
         
    
         <div className='flex'>
    
           <NavLink style={({isActive}) => isActive ? activeStyles : {}}  className='dash-item' to='pages/logout'> <div className='dash-icon'>{iconMapping.logg} </div> Logout </NavLink>
         </div>
    
        
        </div>
      
    
    
    
    </div>
  )
}

export default TempSiderBar