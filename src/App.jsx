import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout'
import Dashboard from './Pages/Dashboard'
import Balance from './Pages/Balance'
import Income from './Pages/Income'
import Savings from './Pages/Savings'
import Expense from './Pages/Expense'
import Settings from './Pages/Setting'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
       <Route element={<Layout/>}>
       <Route index element={<Dashboard/>}/>
       <Route path='pages/balance' element={<Balance/>}/>
       <Route path='pages/expense' element={<Expense/>}/>
       <Route path='pages/income' element={<Income/>}/>
       <Route path='pages/savings' element={<Savings/>}/>
       <Route path='pages/settings' element={<Settings/>}/>

       </Route>

      </Routes>
    </BrowserRouter>
 
  )
}

export default App
