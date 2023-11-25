import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Deleteagent = () => {

  const [data, setdata] = useState([])

  useEffect(() => {
    get_data()
  })

  const get_data = async () => {
    const result = await axios.get("http://localhost:3001/get_data")
    setdata(result.data)
    // console.log(result.data)
  }

  // const  deleteUser = id =>{
  //   axios.delete(`http://localhost:3001/deleteuser/delete/${id}`)
  //   .then(response=>{
  //     get_data();
  //    console.log(id)
  //   })
  //   .catch(error => {
  //     console.error("Error deleting user:", error);
  //   });
  // }

  const deleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      axios.delete(`http://localhost:3001/deleteuser/delete/${id}`)
        .then(response => {
          get_data();
        })
        .catch(error => {
          console.error("Error deleting user:", error);
        });
    }
  };

  return (
    <div>
      <main>
        <div style={{ padding: '5% 5% 5% 5%' }}>
          <input className='form-control rounded' style={{ width: '80vw' }} />
        </div>
        <div className='container-fluid' style={{ marginTop: '1%', padding: '0 5% 0 5%' }}>
          <div className='container' style={{ width: '80vw', maxHeight: '70vh', overflowY: 'scroll', alignItems: 'start' }}>
            <table className='table'>

              <tbody>
                {
                  data.map((val, key) => {

                    return (
                      <tr style={{ margin: '1% 0', width: '80vw' }}>
                        <td style={{ textAlign: 'end' }}>{key + 1}</td>
                        <td style={{ textAlign: 'start' }}>{val.fullname}</td>
                        <td style={{ textAlign: 'end' }}><button className='btn btn-danger text-white' onClick={() => deleteUser(val.id)}>Delete</button> </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Deleteagent
