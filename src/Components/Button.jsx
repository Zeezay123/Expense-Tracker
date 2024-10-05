import React from 'react'

const Button = ({bIcon , btext, click}) => {
  return (
<div onClick={click} className='flex items-end bg-black rounded-md gap-2 text-white w-auto h-auto p-3'>
    
    <div>
    {bIcon && <span>{bIcon}</span>}
    </div>

<div>{btext}</div>


</div>
  )
}

export default Button