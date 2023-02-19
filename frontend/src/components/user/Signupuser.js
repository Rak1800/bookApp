
import React, { useState} from 'react'

import { Link, useNavigate } from 'react-router-dom'

export default function Signupuser() {
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState("");
  const navigate = useNavigate()



  const signUpData = async (e) => {
    console.log({ fullName, gender, phone, email, pass })
  

    // ====================use fetch method===========
    let objectData = { fullName: fullName,gender: gender,  phone: phone, email: email, password: pass }

    let result = await fetch('/registeruser', {
      method: 'POST',
      body: JSON.stringify(objectData),
      headers: {
        "content-type": "application/json"
      }
    })
    result = await result.json()
    console.log(result)
    if (result) {
      alert(`${result.message}`)
      navigate('/loginuser')
    } 
  }
  return (
    <>
      <form className='register'>
        <h1>Register Customer</h1>
        <input className='inputbox' type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='Enter Your Name' />
        <input className='inputbox' type='text' value={gender} onChange={(e) => setGender(e.target.value)} placeholder='Enter Your Name' />
        <input className='inputbox' type='number' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Enter Your phone  number' />
        <input className='inputbox' type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' />
        <input className='inputbox' type='password' value={pass} onChange={(e) => setPass(e.target.value)} placeholder='Enter Your Password' />
        <button className='btn' type='button' onClick={signUpData} >SignUp</button>
        <button className='logbtn' type='button'><Link to="/loginuser">login</Link></button>
      </form>
    </>
  )
}