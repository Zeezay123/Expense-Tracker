import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import logo from '../assets/logo.png'
import Dashboard from '../Pages/Dashboard'
import { AiFillDashboard } from "react-icons/ai";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaTableCellsRowLock } from "react-icons/fa6";
import { AiFillSetting } from "react-icons/ai";
import { CiLogin } from "react-icons/ci";
import { useState } from 'react';


const SidebarTwo = () => {

const [isActiveMenu, setIsActiveMenu]= useState(true)

const selectedMenu =()=>{
  setIsActiveMenu(!isActiveMenu)
}

const activeStyle = {
    background: "#487FFF",
    height: "3.5rem",
    width: "4.5rem",
    display: "flex",
    alignItems: "center",
    borderRadius: "0.5rem",
    color: "white",
    textDecoration: "none",
    justifyContent:"center"
}
 
const pColor = 'Black';
const sColor = 'white';

const iconMapping =(color) => ( {
 dash: <AiFillDashboard   color={color} size={24}/>, 
 inc: <FaMoneyBillTrendUp color={color} size={24} />,
 exp: <FaMoneyBillTransfer color={color} size={24} />,
 sav: <FaTableCellsRowLock color={color} size={24}/>,
 sett: <AiFillSetting color={color} size={24}/>,
 logg: <CiLogin color={color} size={24}/>
})



  return (
    <div className='flex   h-screen flex-col justify-between w-[9%]
      bg-white border-r-[0.0625rem] border-iconback fixed overflow-hidden'>
    <div className='flex flex-col'>
        <div className='flex items-center mb-5 p-4  h-20 '> <img src={logo} width={100} height={48} alt="logo" /></div>
       
       
       
      <NavLink style={({isActive})=> isActive ? activeStyle :{} } end to='.'  className='ml-3 my-2 flex flex-col font-sans font-bold text-[9px] justify-center w-[4.5rem] h-[3.5rem] items-center' >  <AiFillDashboard    size={24}/> Dashboard </NavLink>
      <NavLink style={({isActive})=> isActive ? activeStyle :{}} end to='pages/income'   className='ml-3 my-2 flex flex-col font-sans font-bold text-[9px] justify-center items-center w-[4.5rem] h-[3.5rem]'  > <FaMoneyBillTrendUp  size={24} /> Income </NavLink>
      <NavLink style={({isActive})=> isActive ? activeStyle :{} } end to='pages/expense'  className='ml-3 my-2 flex flex-col font-sans font-bold text-[9px] justify-center w-[4.5rem] h-[3.5rem] items-center'  > <FaMoneyBillTransfer  size={24} /> Expenses </NavLink>
      <NavLink style={({isActive})=> isActive ? activeStyle :{} } end to='pages/savings'   className='ml-3 my-2 flex flex-col font-sans font-bold text-[9px] justify-center w-[4.5rem] h-[3.5rem] items-center' > <FaTableCellsRowLock  size={24}/> Savings</NavLink>
      <NavLink style={({isActive})=> isActive ? activeStyle :{} } end to='pages/settings'   className='ml-3 my-2 flex flex-col font-sans font-bold text-[9px] justify-center w-[4.5rem] h-[3.5rem] items-center' > <AiFillSetting  size={24}/>Settings</NavLink>
    </div>



      <div className='flex'>
      <NavLink style={({isActive})=> isActive ? activeStyle :{} } to='pages/logout'  end className='ml-3 flex items-center' > <CiLogin size={24}/> Logout</NavLink>
      </div>

      </div>
  )
}

export default SidebarTwo