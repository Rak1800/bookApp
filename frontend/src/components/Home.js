import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate=useNavigate()
  const user=()=>{
   navigate('/signupuser')
  }
  const seller=()=>{
   navigate('/signupseller')
  }

  return (
    <div className='app'>
       <h1>WelCome BookApp</h1>
        <button className='btn' onClick={user}>Customer</button>
        <button className='logbtn'onClick={seller}>Seller</button>

    </div>
  )
}
