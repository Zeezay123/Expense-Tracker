import React from 'react'
import { Link } from 'react-router-dom'
import passport from '../assets/passport1.jpg'

const Header = () => {
  return (
    <div className='flex p-4 justify-between' > 
    <div className=''>
    <h1 className='font-title font-bold text-gray-900 text-2xl'> Hello Azeez!</h1> 
    <span className='font-sans text-gray-400'>Welcome to your Dashboard</span>
      </div>
      
       <Link to='pages/settings'>
      <img className='flex rounded-full'
       width={48}
        height={48}
         src={passport}
          alt="passport Image." /></Link>
      </div>
  )
}

export default Header