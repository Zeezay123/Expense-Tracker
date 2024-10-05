import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
// import {AiOutlineDashboard } from 'react-icons/ai'
import { AiFillDashboard } from "react-icons/ai";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaTableCellsRowLock } from "react-icons/fa6";
import { AiFillSetting } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import logo from '../assets/logo.png'

const Sidebar = () => {

const activeStyles = {
  background: "#FCF1FE",
  height: "3rem",
  width: "100%",
  display: "flex",
  gap: "0.5rem",
  alignItems: "center",
  paddingLeft: "1rem",
  borderRight: "0.25rem solid #db81eb"
  
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
    <div className='flex w-[200px] h-screen flex-col justify-between fixed bg-white' >
      <div className='flex flex-col '> 
      <div className='flex items-center mb-5 p-5'> <img src={logo} width={100} height={50} alt="" /></div>


      <NavLink  style={({isActive}) => isActive ? activeStyles : {}} className='dash-item' end  to='.'> <div className='dash-icon'>{iconMapping.dash}</div>  Dashboard </NavLink>
      
      
       <NavLink style={({isActive}) => isActive ? activeStyles : {}} className='dash-item' end to='pages/income'> <div className='dash-icon'>{iconMapping.inc} </div>  Income </NavLink>
       

       <NavLink style={({isActive}) => isActive ? activeStyles : {}}  className='dash-item' to='pages/Expense'> <div className='dash-icon'>{iconMapping.exp} </div> Expense </NavLink>


       <NavLink style={({isActive}) => isActive ? activeStyles : {}}  className='dash-item' to='pages/savings'> <div className='dash-icon'>{iconMapping.sav} </div>  Savings </NavLink>


       <NavLink style={({isActive}) => isActive ? activeStyles : {}}  className='dash-item' to='pages/settings'> <div className='dash-icon'>{iconMapping.sett} </div>  Setings </NavLink>
      </div>
     

     <div className='flex'>

       <NavLink style={({isActive}) => isActive ? activeStyles : {}}  className='dash-item' to='pages/logout'> <div className='dash-icon'>{iconMapping.logg} </div> Logout </NavLink>
     </div>

    
    </div>
  )
}

export default Sidebar