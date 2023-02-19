
import React, { useState} from 'react'
// import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

export default function Signupseller() {
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState("");
  const navigate = useNavigate()



  const signUpData = async (e) => {
    console.log({ fullName, gender, phone, email, pass })
    //   // ============use aqxios library======
    //   e.preventDefault() 
    //  axios.post('http://localhost:5000/register',{
    //     name:name,
    //     phone:phone,
    //     email:email,   
    //     password:pass
    //   }).then(()=>navigate('/'))
    //   .catch(err=>console.log(err))    

    // ====================use fetch method===========
    let objectData = { fullName: fullName,gender: gender,  phone: phone, email: email, password: pass }

    let result = await fetch('/registerseller', {
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
      navigate('/loginseller')
    } 
  }
  return (
    <>
      <form className='register'>
        <h1>Register Seller</h1>
        <input className='inputbox' type='text' value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='Enter Your Name' />
        <input className='inputbox' type='text' value={gender} onChange={(e) => setGender(e.target.value)} placeholder='Enter Your Name' />
        <input className='inputbox' type='number' value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Enter Your phone  number' />
        <input className='inputbox' type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email' />
        <input className='inputbox' type='password' value={pass} onChange={(e) => setPass(e.target.value)} placeholder='Enter Your Password' />
        <button className='btn' type='button' onClick={signUpData} >SignUp</button>
        <button className='logbtn' type='button'><Link to="/loginseller">login</Link></button>
      </form>
    </>
  )
}
