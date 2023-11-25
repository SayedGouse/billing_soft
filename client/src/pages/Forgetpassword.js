
import React, { useState } from 'react'
import axios from 'axios';

const Forgotpassword = () => {
    const [email,setEmail] = useState('')
    const[status,setStatus] = useState('')
    
    const handleChange = (e) =>{
        setEmail(e.target.value);
        console.log(e.target.value)
    }
    
    const FormSubmitForgetPassword=(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/forgotpass",{
            email:email
        
        }).then((response)=>{
            console.log(response);
            //console.log("Got the Data")
            if(response.data.length>0)
            {
                localStorage.setItem('user',email)
                window.location = 'http://localhost:3000/otp/';
            }
            else
            {
                setStatus('Sorry..! Invalid Email')
            }
        })
        .catch(error => {
            console.log(error)
        })
    }

  return (
    <main style={{width:"50vw", alignItems:'center',marginLeft:"30%", marginTop:'20%'}}>
        <div className='row'>
            <div className='card' style={{textAlign:'center'}}>
                <div className='card-header'>
                    <h1 > Forget Password </h1>
                </div>

                <div className='card-body'>
                    <form onSubmit={FormSubmitForgetPassword}>
                        <div className='mb-3 mt-3'>
                            <input type='email' value={email} name='email' className='form-control' placeholder='Enter your email' onChange={handleChange} required/> 
                        </div>

                        <input type='submit' className='btn btn-success' value='Forgetpass'/>
                    </form>

                    <p className='text-danger'> {status} </p>
                </div>
                <p className='text-primary'> <a href='/' style={{textDecoration:"none"}}>Go Back</a></p>
            </div>
        </div>
    </main>
  )
}

export default Forgotpassword




