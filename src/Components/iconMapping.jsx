import React from 'react'
import { AiFillDashboard, AiFillFilter } from "react-icons/ai";
import {
  FaMoneyBillTrendUp,
  FaTableCellsRowLock,
  FaMoneyBillTransfer,
} from "react-icons/fa6";
import { MdDateRange, MdCircle,MdOutlineChevronLeft  } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaChevronLeft, FaChevronRight,FaLongArrowAltUp  } from "react-icons/fa";
import { CiBellOn } from "react-icons/ci";
import { HiChevronDown } from "react-icons/hi";
import { RxDividerVertical } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { FaRegBell } from "react-icons/fa6";
import { LuSettings } from "react-icons/lu";
import { GiHamburgerMenu } from "react-icons/gi";



    const iconMapping = {
        expenseIcon: <FaMoneyBillTransfer color="#E10E0E" size={18} />,
        incomeIcon: <FaMoneyBillTrendUp color="#13C296" size={18} />,
        savingsIcon: <FaTableCellsRowLock color="#FCD34D" size={18} />,
        balanceIcon: <AiFillDashboard color="#1C3FB7" size={18} />,
        DateRan: <MdDateRange size={18} />,
        filter: <AiFillFilter size={14} color='' />,
        addbutton: <IoIosAddCircleOutline size={20} />,
        leftarr: <FaChevronLeft size={18} />,
        rightarr: <FaChevronRight size={18} />,
        notBell: <FaRegBell size={16} />,
        cheDown: <HiChevronDown size={14} />,
        vertDiv: <RxDividerVertical size={30} />,
        upArrow: <FaLongArrowAltUp size={12} />,
        circle: <MdCircle size={10} />, 
        settingsIcn: <LuSettings size={16}/>,
        hamMenu: <GiHamburgerMenu size={20} color='#487FFF'/>,
        arrowRight: <MdOutlineChevronLeft size={20} />,
      };
    




export default iconMapping