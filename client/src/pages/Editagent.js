import axios from 'axios'
import React, { useEffect, useState } from 'react'



const Editagent = () => {

  const [edit, setedit] = useState([])

  useEffect(() => {
    edit_data()
  })
  const edit_data = async () => {
    const result = await axios.get("http://localhost:3001/editdata")
    setedit(result.data)
    console.log(result.data)
  }


  return (
    <div>
      <main>
        <div style={{ padding: '5% 5% 5% 5%' }}>
          <input className='form-control rounded' style={{ width: '80vw' }} />
        </div>
        <div className='container-fluid' style={{ marginTop: '1%', padding: '0 5% 0 5%' }}>
          <div className='container' style={{ width: '80vw', maxHeight: '70vh', overflowY: 'scroll', alignItems: 'start' }}>
            <table className='table table-striped'>
              <tbody>
                {
                  edit.map((val, key) => {
                    return (
                      <tr style={{ margin: '1% 0', width: '80vw' }}>
                        <td style={{ textAlign: 'end' }}>{key + 1}</td>
                        <td style={{ textAlign: 'start' }}>{val.fullname}</td>
                        <td style={{ textAlign: 'end' }}><button className='btn btn-warning' ><a href={`/editpage/${val.id}`} style={{ textDecoration: 'none', listStyle: 'none', color: 'white' }}> Edit </a></button> </td>
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

export default Editagent
