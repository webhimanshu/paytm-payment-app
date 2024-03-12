import React from 'react'
import { useNavigate } from 'react-router-dom'

const Welcome = () => {
    const navigate  = useNavigate();
  return (
    <div className='h-[100vh] bg-[#e8ebed] flex flex-col justify-start items-start gap-6  text-[#353535] p-28'>
        <h1 className="font-medium text-5xl tracking-wide">Paytm Payment App</h1>
        <p className="text-xl">The next-gen. realtime payment app created using React, Node.js Express.js MongoDB</p>
        <div className='flex gap-x-2'>
            <button className="border-2 border-[#353535] font-semibold px-8 py-2 rounded-lg text-xl hover:bg-[#353535] hover:text-white transition-colors duration-300" onClick={()=>navigate('/signup')}>Sign up</button>
            <button className="border-2 border-[#353535] font-semibold px-8 py-2 rounded-lg text-xl hover:bg-[#353535] hover:text-white transition-colors duration-300" onClick={()=>navigate('/signin')}>Sign in</button>
        </div>
       
    </div>
  )
}

export default Welcome