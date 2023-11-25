import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';




const Loginotp = ({ setIsLoggedIn }) => {
    const[otp,setOtp]=useState('')
    const[status,setStatus]=useState('')
    const navigate = useNavigate();

    const handleChange = (e) =>{
        //const {name,value}= e.target
        setOtp(e.target.value);
        console.log(e.target.value)
    }

    const SubmitOtp=(e)=>{
       
        //console.log(formValues.username)
        e.preventDefault();
        axios.post("http://localhost:3001/otp",{
         otp:otp
        
        }).then((response)=>{
          console.log(response);
          if(response.data.length>0)
          {
           setIsLoggedIn(true);
           navigate('/'); 
          }
          else
          {
            setStatus('Sorry..! Invalid Otp')
          }
        }) 
        .catch(error => {
          console.log(error)
      }) 
    
      }
    
  return (
    <div>
      <div style={{ position: 'relative' }}>
        <img src='Login.png' alt='Not found' style={{ width: '100vw', height: '100vh' }} />
        <div style={{ position: 'absolute', zIndex: 5, top: '50%', left: '70%', transform: 'translate(-50%, -50%)' }}>
        <h1> ONE TIME PASSWORD</h1>
        <form onSubmit={SubmitOtp}>
            <tr>
              <label>Your Otp</label>
              <input type='text' name='email' className='form-control' style={{ width: '20vw' }} onChange={handleChange} />
            </tr>
           
            <div className='m-2'>
            <input type='submit' className='btn btn-success' value='Verify Otp'/>
            </div>
          </form>
          <p className='text-danger'> {status}</p>
        </div>

      </div>
    </div>
  )
}

export default Loginotp
