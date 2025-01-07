import React from 'react'
import TransCard from '../Components/TransCard'
import MultiBar from '../Components/MultBar'
import ChartData from '../../ChartData'

const Expense = () => {
  const lasosos = 'Expense'
  const blue ='#2B6CB0'
  const red = '#E10E0E'
  const green = '#13C296'
  const yellow = '#FCD34D'
  return (
    <div className='bg-slate-400 h-full p-10'>Expense
      <TransCard title={lasosos} colr={red}/>
      <MultiBar ChartData={ChartData} />
    </div>
  )
}

export default Expense