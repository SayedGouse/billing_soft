import React, { useEffect, useState } from 'react'
import { RxAvatar } from "react-icons/rx"
import axios from 'axios'
import { useParams } from 'react-router-dom';

const Editpage = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { id } = useParams();

    const [editdata, seteditdata] = useState(

        { fullname: '', dob: '', mobile_no: '', gender: '', email: '', adhar_card_no: '', address: '', password: '' }
    )

    const { fullname, dob, mobile_no, gender, email, adhar_card_no, address, password } = editdata;


    useEffect(() => {
        axios.get(`http://localhost:3001/get_edit_data/${id}`)
            .then(result => {
                seteditdata({ ...result.data[0] })
                // Convert the date portion to "yyyy-MM-dd" format
                const responseData = result.data[0];
                const dobFormatted = responseData.dob.substring(0, 10);
                seteditdata({ ...responseData, dob: dobFormatted });
            }).catch(err => {
                console.log(err)
            })
    }, [id])

    const togglePassword = () => {
        setShowPassword(!showPassword);
    }


    const changehandeler = e => {
        console.log(e.target.value);
        seteditdata({ ...editdata, [e.target.name]: e.target.value })
    }

    const editform = (e) => {
        // e.preventDefault()
        axios.post(`http://localhost:3001/afteredit/${id}`, {
            fullname: fullname,
            dob: dob,
            mobile_no: mobile_no,
            gender: gender,
            email: email,
            adhar_card_no: adhar_card_no,
            address: address,
            password: password
        }).then((response) => {
            console.log(response)
            alert('update successfully')
            window.location = "http://localhost:3000/editagent"
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <main>
            <div className='container-fluid' >
                <div className='row'>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '80vw' }} >
                        <RxAvatar size={180} />
                    </div>
                    <div className='p-5'>
                        <form onSubmit={editform}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <tr className='me-3'>
                                    <th style={{ opacity: '50%', width: '80vw', padding: '2% 0 2% 0' }}>Full Name</th>
                                    <input type='text' name='fullname' value={fullname} className='form-control' onChange={changehandeler} />
                                </tr>
                                <tr>
                                    <th style={{ opacity: '50%', width: '80vw', padding: '2% 0 2% 0' }}>D.O.B</th>
                                    <input type='date' name='dob' value={dob} className='form-control' onChange={changehandeler} />
                                </tr>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <tr className='me-3'>
                                    <th style={{ opacity: '50%', width: '80vw', padding: '2% 0 2% 0' }}>Mobile No.</th>
                                    <input type='tel' name='mobile_no' value={mobile_no} className='form-control' onChange={changehandeler} />
                                </tr>
                                <tr>
                                    <th style={{ opacity: '50%', width: '80vw', padding: '2% 0 2% 0' }}>Gender</th>
                                    <input type='text' name='gender' value={gender} className='form-control' onChange={changehandeler} />
                                </tr>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <tr className='me-3'>
                                    <th style={{ opacity: '50%', width: '80vw', padding: '2% 0 2% 0' }}>Email ID</th>
                                    <input type='email' name='email' value={email} className='form-control' onChange={changehandeler} />
                                </tr>
                                <tr>
                                    <th style={{ opacity: '50%', width: '80vw', padding: '2% 0 2% 0' }}>Adhaar card No.</th>
                                    <input type='text' name='adhar_card_no' value={adhar_card_no} className='form-control' onChange={changehandeler} />
                                </tr>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <tr className='me-3'>
                                    <th style={{ opacity: '50%', width: '80vw', padding: '2%  0 2% 0' }}>Address</th>
                                    <textarea type='text' name='address' value={address} className='form-control' onChange={changehandeler} />
                                </tr>
                                <tr>
                                    <th style={{ opacity: '50%', width: '80vw', padding: '2%  0 2% 0' }}>Set Password</th>
                                    {showPassword ? (
                                        <input
                                            type='text'
                                            name='password'
                                            value={password}
                                            className='form-control'
                                            onChange={changehandeler}
                                        />
                                    ) : (
                                        <input
                                            type='password'
                                            name='password'
                                            value={password}
                                            className='form-control'
                                            onChange={changehandeler}
                                        />
                                    )}
                                    <label>
                                        Show Password
                                        <input
                                            type='checkbox'
                                            checked={showPassword}
                                            onChange={togglePassword}
                                        />
                                    </label>
                                </tr>
                            </div>
                            <div style={{ display: "flex", justifyContent: 'end', alignItems: 'end' }}>
                                <button type='submit' className='btn btn-success'>Save</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </main>
    )
}

export default Editpage
