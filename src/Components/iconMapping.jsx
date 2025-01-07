import React from 'react'
import { AiFillDashboard, AiFillFilter } from "react-icons/ai";
import {
  FaMoneyBillTrendUp,
  FaTableCellsRowLock,
  FaMoneyBillTransfer,
} from "react-icons/fa6";
import { MdDateRange } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { FaChevronLeft, FaChevronRight,FaLongArrowAltUp  } from "react-icons/fa";
import { CiBellOn } from "react-icons/ci";
import { HiChevronDown } from "react-icons/hi";
import { RxDividerVertical } from "react-icons/rx";



    const iconMapping = {
        expenseIcon: <FaMoneyBillTransfer color="#E10E0E" size={18} />,
        incomeIcon: <FaMoneyBillTrendUp color="#13C296" size={18} />,
        savingsIcon: <FaTableCellsRowLock color="#FCD34D" size={18} />,
        balanceIcon: <AiFillDashboard color="#1C3FB7" size={18} />,
        DateRan: <MdDateRange size={18} />,
        filter: <AiFillFilter size={18} />,
        addbutton: <IoIosAddCircleOutline size={20} />,
        leftarr: <FaChevronLeft size={18} />,
        rightarr: <FaChevronRight size={18} />,
        notBell: <CiBellOn size={20} />,
        cheDown: <HiChevronDown size={14} />,
        vertDiv: <RxDividerVertical size={30} />,
        upArrow: <FaLongArrowAltUp size={12} />,
      };
    




export default iconMapping