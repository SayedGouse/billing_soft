import React, { useState , useEffect } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Sidebar from './Components/Sidebar';
import Dashboard from './pages/Dashboard';
import Billing from './pages/Billing';
import History from './pages/History';
import Addagent from './pages/Addagent';
import Deleteagent from './pages/Deleteagent';
import Editagent from './pages/Editagent';
import Viewagent from './pages/Viewagent';
import Login from './pages/Login';
import Editpage from './pages/Editpage';
import Resetpassword from './pages/Resetpassword';
import Forgotpassword from './pages/Forgetpassword';
import Otp from './pages/Otp';
import Loginotp from './pages/Loginotp';
import Credit from './pages/Credit';
import Purchase from './pages/Purchase';
import Expense from './pages/Expense';


//  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';


const App = () => {

  const initialLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
  const [isLoggedIn, setIsLoggedIn] = useState(initialLoginStatus);

  // Store login status in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  return (

    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/loginotp" element={<Loginotp setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/*" element={ isLoggedIn ?  (
              <div className='d-flex'>
                <div className='col-auto'>
                  <Sidebar />
                </div>
                <div>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/billing" element={<Billing />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/addagent" element={<Addagent />} />
                    <Route path="/deleteagent" element={<Deleteagent />} />
                    <Route path="/editagent" element={<Editagent />} />
                    <Route path="/viewagent" element={<Viewagent />} />
                    <Route path="/editpage/:id" element={<Editpage />} />
                    <Route path="/resetpassword" element={<Resetpassword />} />
                    <Route path="/forgetpassword" element={<Forgotpassword />} />
                    <Route path="/otp" element={<Otp />} />
                    <Route path="/credit" element={<Credit />} />
                    <Route path="/purchase" element={<Purchase />} />
                    <Route path="/expense" element={<Expense />} />
                  </Routes>
                </div>
              </div>
            )
            : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;