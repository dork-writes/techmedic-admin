import React, { useContext } from 'react'
import { context } from '../Context/Context'
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [, setAuthtoken] = useContext(context);
  return (
    <div className='flex justify-between w-[100%]'>
        <h1 className = "text-2xl text-center pb-8 font-[ropa] text-[#13a388]">TECH<span className = "text-[#edededdd]">MEDIC</span><em>&nbsp;Admin</em></h1>
        <div>
            <button onClick={()=>{setAuthtoken(''); navigate('/');}} className='bg-[#ff4a59] w-fit py-2 px-4 rounded-md shadow-sm hover:bg-[#ff4a59dd] transition-all'>Log Out</button>
        </div>
    </div>
  )
}
