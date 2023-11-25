import axios from 'axios'
import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection



const Login = () => {
  const intialvalue = { email: '', password: '' }
  const [formvalue, setformvalue] = useState(intialvalue)
  const [loginStatus, setloginStatus] = useState('')
  // const navigate = useNavigate(); // Initialize useNavigate

  const handlechange = (e) => {

    const { name, value } = e.target
    setformvalue({ ...formvalue, [name]: value })
    console.log(formvalue)

  }

  const logindata = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3001/login", {
      logindata: formvalue
    }).then((response) => {
      console.log(response)
      if (response.data.length > 0) {
        let utype = response.data[0].utype;
        setformvalue(intialvalue); // Clear the form after successful login
        localStorage.setItem('user', formvalue.email);
        localStorage.setItem('log', utype);
        // setIsLoggedIn(true); // Set the login status
        window.location=('http://localhost:3000/Loginotp')
        // navigate('/l'); // Redirect to home/dashboard page
      } else {
        setloginStatus("Sorry invalid email or password");
      }
    }).catch(err=>{
      console.log(err)
    })

  }
  return (
    <div>
      <div style={{ position: 'relative' }}>
        <img src='Login.png' alt='Not found' style={{ width: '100vw', height: '100vh' }} />
        <div style={{ position: 'absolute', zIndex: 5, top: '50%', left: '70%', transform: 'translate(-50%, -50%)' }}>
          <h1>Welcome to login</h1>
          <form onSubmit={logindata}>
            <tr>
              <label>Username</label>
              <input type='text' name='email' value={formvalue.email} className='form-control' style={{ width: '20vw' }} onChange={handlechange} />
            </tr>
            <tr>
              <label>password</label>
              <input type='text' name='password' value={formvalue.password} className='form-control' style={{ width: '20vw' }} onChange={handlechange} />
            </tr>
            <div className='m-2'>
              <button className='btn btn-outline-primary'>Login</button>
            </div>
          </form>
          <p className='text-danger fs-2' >{loginStatus}</p>
        </div>

      </div>
    </div>
  )
}

export default Login
