import axios from 'axios'
import React, { useState } from 'react'

const uid = localStorage.getItem('user'); // Get admin ID from local storage
  console.log("uid",uid)

const Resetpassword = () => {
    const[newpass,setNewpass]=useState('')
    const[confirmpass,setConfirmpass]=useState('')
    //const[status,setStatus]=useState('')
    
    const handleChange = (e) =>{
        //const {name,value}= e.target
        setNewpass(e.target.value);
        //console.log(e.target.value)
        
    }
    
    const handleChangeone = (e) =>{
        //const {name,value}= e.target
        //setNewpass(e.target.value);
        console.log(e.target.value)
        setConfirmpass(e.target.value);
    }
    
    const ResetFormSubmit= async (e)=>{
        e.preventDefault();
       
        if (newpass !== confirmpass) {
            alert('Passwords do not match.');
            return;
          }
      
          try {
            const response = await axios.post('http://localhost:3001/resetpass', {
             newpass,
             uid,
            });
      
            console.log(response.data);
            alert('Password reset successful.');
            window.location=("http://localhost:3000/")
          } catch (error) {
            console.error(error);
            alert('Password reset failed.');
          }
        };
    
  return (
    <main  style={{width:"30vw", alignItems:'center',marginLeft:"80%", marginTop:'50%'}}>
                    <div>
                        <h1 style={{textAlign:'center'}}> Reset Password</h1>
                   

                    <div className='card-body'>
                        <form onSubmit={ResetFormSubmit}>
                        <div className='mb-3 mt-3'>
                            <input type='text' value={newpass} name='newpass' className='form-control' placeholder='Enter your New passsword'  required onChange={handleChange}/> 
                        </div>

                        <div className='mb-3 mt-3'>
                            <input type='text' value={confirmpass} name='confirmpass' className='form-control' placeholder='Enter your Confirm passsword'  required onChange={handleChangeone}/> 
                        </div>
 
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                        <input type='submit' className='btn btn-success' value='Reset Password'/>

                        </div>
                       
                        </form>
                       
                         {/* <p className='text-danger'> {status}</p> */}

                        </div>
              </div>
        
      


      
    </main>
  )
}

export default Resetpassword
