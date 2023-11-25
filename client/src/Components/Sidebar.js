import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
import { FaBars } from "react-icons/fa"
import { BiSolidDashboard } from 'react-icons/bi'
import { MdOutlineHistoryEdu} from 'react-icons/md'
import { RiBillLine } from 'react-icons/ri'
import { SiGravatar,SiExpensify } from 'react-icons/si'
import { FiSettings } from 'react-icons/fi'
import { NavLink } from 'react-router-dom'

// const utype = localStorage.getItem("log")

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const menuitem = [
    {
      path: '/',
      name: 'Dashboard',
      icon: <BiSolidDashboard />
    },
    {
      path: '/billing',
      name: 'Billing',
      icon: <RiBillLine />
    },
    {
      path: '/history',
      name: 'History',
      icon: <MdOutlineHistoryEdu />
    },
    {
      path: '/credit',
      name: 'credit',
      icon: <RiBillLine />
    },
    {
      path: '/purchase',
      name: 'purchase',
      icon: <MdOutlineHistoryEdu />
    },
    {
      path: '/expense',
      name: 'Expence',
      icon: <SiExpensify />
    },
    {
      path: '/forgetpassword',
      name: 'Setting',
      icon: <FiSettings />
    },
  ]

  const logout=()=>{
    localStorage.clear()
    window.location="http://localhost:3000/login"
  }

 // const utype = localStorage.getItem("log"); // Moved it inside the component

    return (
      <aside>
      <div>
        <div style={{ width: isOpen ? "13vw" : "5vw" }} className="sidebar">
          <div className='d-flex justify-content-between flex-column vh-100'>
            <div>
              <div className="top_section">
                <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Logo</h1>
                <div style={{ marginLeft: isOpen ? "50px" : "6px" }} className="bars">
                  <FaBars onClick={toggle} />
                </div>
              </div>
              {
              menuitem.map((item, index) => (
                <NavLink to={item.path} key={index} className="link" activeClassName="active">
                  <div className="icon">{item.icon}</div>
                  <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                </NavLink>
              ))}

              
              {/* {
              utype === 'admin' && (
                <>
                <div className="linkagent">
                  <div className="icon"><MdSupportAgent /></div>
                  
                  <details style={{ display: isOpen ? "block" : "none" }}><summary style={{ display: isOpen ? "block" : "none" }} className="link_text">Agents</summary>
                      <Link className="link_agent" activeClassName="active_agent" to="/addagent"><div className="link_text_agent">Add agent</div></Link>
                      <Link className="link_agent" activeclassName="active_agent" to={'/deleteagent'}><div className="link_text_agent">Delete agent</div></Link>
                      <Link className="link_agent" activeclassName="active_agent" to={'/editagent'}><div className="link_text_agent">Edit agent</div></Link>
                      <Link className="link_agent" activeclassName="active_agent" to={'/viewagent'}><div className="link_text_agent">View agent</div></Link>
                    </details> 
                      
                </div>
                
              </>
              )
              } */}
             
            </div>
            <div>
            {/* <div className="linkagent">
              <div className="icon"><SiGravatar /></div>
              <button style={{ display: isOpen ? "block" : "none", }} onClick={logout} className="btn btn-outline-light">Logout</button>
            </div> */}
            <div className="linkagent">
              {/* <div className="icon"><SiGravatar /></div> */}
              <button style={{ display: isOpen ? "block" : "none", }} onClick={logout} className="btn btn-outline-light"><SiGravatar style={{marginRight:'5px'}} />Logout</button>
            </div>
            </div>
          </div> 
        </div>
        <main>{children}</main>
      </div>
    </aside>
    )
  }


export default Sidebar

