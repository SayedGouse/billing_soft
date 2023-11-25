import React, { useEffect, useState } from 'react'
import { RxAvatar } from "react-icons/rx"
import { IoMdCash } from "react-icons/io"
import { MdRealEstateAgent } from "react-icons/md"
import { BiSolidPurchaseTag } from "react-icons/bi"
import Calendar from 'moedim';
import axios from 'axios'


const Dashboard = () => {
  const getuseremail=localStorage.getItem('user')
  const utype=localStorage.getItem('log')
  const [time, setTime] = useState(new Date());
  const [value, setValue] = useState(new Date())
  // const [totalRecords, setTotalRecords] = useState(0);
  const [totalCash, setTotalCash] = useState(0);
  const [totalUpi, setTotalUpi] = useState(0);
  const [totalbalance, setTotalbalance] = useState(0);

  useEffect(() => {

    getdata()

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
    
  }, []);

  const getdata = () => {
    axios
      .get('http://localhost:3001/cash')
      .then((response) => {
        console.log(response.data);
        
        setTotalCash(response.data.totalCash);
        setTotalUpi(response.data.totalUpi); 
        setTotalbalance(response.data.totalbalance); 
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDegree = (value, maxValue) => (value / maxValue) * 360;

  const secondDegree = getDegree(time.getSeconds(), 60);
  const minuteDegree = getDegree(time.getMinutes() + time.getSeconds() / 60, 60);
  const hourDegree = getDegree(time.getHours() + time.getMinutes() / 60, 12);



  return (
    <main className='container-fluid'>
      <div className='d-flex flex-colunm container-fluid'>
        <div className='top-content rounded m-2' style={{ backgroundColor: '#2E0D9B', height: '200px', width: '1140px' }} >
          <h1 className='text-white'>Welcome to billing world</h1>
          <p className='text-white'>Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br></br>
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. <br></br>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco</p>
        </div>
        <div className='rounded one' style={{ height: '200px', width: '20%', }}>
          <p >Profile</p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <RxAvatar size={80} />
          </div>
          <p style={{ textAlign: 'center', fontWeight: '600' }}> {getuseremail}<br></br>
            <span style={{ fontWeight: '400', paddingRight: '25px' }}>{utype}</span></p>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className=' rounded m-3 card' >
          <div className='header p-2'>
            <p className='fw-bold'><IoMdCash size={30} />Cash</p>
          </div>
          <div className='body' style={{ padding: '10px 103px' }}>
            <h2 className='fw-bold'>{totalCash}</h2>
          </div>
        </div>
        <div className=' rounded m-3 card' >
          <div className='header p-2'>
            <p className='fw-bold'><MdRealEstateAgent size={30} />Credit</p>
          </div>
          <div className='body' style={{ padding: '10px 103px' }}>
            <h2 className='fw-bold'>{totalbalance}</h2>
          </div>
        </div>
        <div className=' rounded m-3 card' >
          <div className='header p-2'>
            <p className='fw-bold'><BiSolidPurchaseTag size={30} />UPI</p>
          </div>
          <div className='body' style={{ padding: '10px 103px' }}>
            <h2 className='fw-bold'>{totalUpi}</h2>
          </div>
        </div>
        <div className='rounded one m-2 p-1' style={{ height: '200px', width: '18%', position: 'relative' }}>
          <div className='wall-clock'>
            <div className='clock'>
              <div className='hour-needle' style={{ transform: `rotate(${hourDegree}deg)` }}></div>
              <div className='minute-needle' style={{ transform: `rotate(${minuteDegree}deg)` }}></div>
              <div className='second-needle' style={{ transform: `rotate(${secondDegree}deg)` }}></div>
            </div>
          </div>
        </div>
      </div>
      <h3 style={{ color: '#2E0D9B', paddingLeft: '5%' }}>Agent Ranking</h3>
      <div className='d-flex flex-colunm container-fluid'>
        <div className='table-container' style={{ width: '67vw', maxHeight: '240px', overflowY: 'scroll', alignItems: 'start' }}>
          <table className='table table-striped rounded'>
            <thead className='text-white' style={{ position: 'sticky', top: 0, backgroundColor: '#2E0D9B', color: 'black' }}>
              <th style={{ textAlign: 'end' }}></th>
              <th style={{ textAlign: 'start' }}>name</th>
              <th style={{ textAlign: 'end', paddingRight: '5%' }}>Total Sales</th>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: 'end' }}>1.</td>
                <td style={{ textAlign: 'start' }}>salman khan</td>
                <td style={{ textAlign: 'end', paddingRight: '5%' }}>4536789</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'end' }}>2.</td>
                <td style={{ textAlign: 'start' }}>salman khan</td>
                <td style={{ textAlign: 'end', paddingRight: '5%' }}>4536789</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'end' }}>3.</td>
                <td style={{ textAlign: 'start' }}>salman khan</td>
                <td style={{ textAlign: 'end', paddingRight: '5%' }}>4536789</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'end' }}>4.</td>
                <td style={{ textAlign: 'start' }}>salman khan</td>
                <td style={{ textAlign: 'end', paddingRight: '5%' }}>4536789</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'end' }}>5.</td>
                <td style={{ textAlign: 'start' }}>salman khan</td>
                <td style={{ textAlign: 'end', paddingRight: '5%' }}>4536789</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'end' }}>1.</td>
                <td style={{ textAlign: 'start' }}>salman khan</td>
                <td style={{ textAlign: 'end', paddingRight: '5%' }}>4536789</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'end' }}>2.</td>
                <td style={{ textAlign: 'start' }}>salman khan</td>
                <td style={{ textAlign: 'end', paddingRight: '5%' }}>4536789</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'end' }}>3.</td>
                <td style={{ textAlign: 'start' }}>salman khan</td>
                <td style={{ textAlign: 'end', paddingRight: '5%' }}>4536789</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'end' }}>4.</td>
                <td style={{ textAlign: 'start' }}>salman khan</td>
                <td style={{ textAlign: 'end', paddingRight: '5%' }}>4536789</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'end' }}>5.</td>
                <td style={{ textAlign: 'start' }}>salman khan</td>
                <td style={{ textAlign: 'end', paddingRight: '5%' }}>4536789</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'end' }}>1.</td>
                <td style={{ textAlign: 'start' }}>salman khan</td>
                <td style={{ textAlign: 'end', paddingRight: '5%' }}>4536789</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'end' }}>2.</td>
                <td style={{ textAlign: 'start' }}>salman khan</td>
                <td style={{ textAlign: 'end', paddingRight: '5%' }}>4536789</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'end' }}>3.</td>
                <td style={{ textAlign: 'start' }}>salman khan</td>
                <td style={{ textAlign: 'end', paddingRight: '5%' }}>4536789</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'end' }}>4.</td>
                <td style={{ textAlign: 'start' }}>salman khan</td>
                <td style={{ textAlign: 'end', paddingRight: '5%' }}>4536789</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'end' }}>5.</td>
                <td style={{ textAlign: 'start' }}>salman khan</td>
                <td style={{ textAlign: 'end', paddingRight: '5%' }}>4536789</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div  style={{ height: '300px', width: '15vw' }}>
      
        <Calendar className="custom-calendar" value={value} onChange={(d) => setValue(d)} />
     
    </div>

      </div>
    </main>
  )
}

export default Dashboard
