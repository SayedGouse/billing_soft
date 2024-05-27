import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const Purchase = () => {

    const [rows, setRows] = useState([
        {id:1, party_name: '', item_name: '', qauntity: '', amount: '' },
      
    ]);
    const [todayDate, setTodayDate] = useState('');

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalIsOpenitem, setModalIsOpenitem] = useState(false)
    const [purchaseitem, setpurchaseitem] = useState([{ item_name: '', gst_no: '' }])
    const [purchaseclient, setpurchaseclient] = useState([{ name: '', address: '', city: '', state: '', mobile_number: '', gst_no: '' }])
    const [purchase_client, setpurchase_client] = useState([])
    const [purchase_item, setpurchase_item] = useState([])
    const [client, setClient] = useState([]);
    const [item, setitem] = useState([]);
    const [TotalAmount, setTotalAmount] = useState(0);
    const [itemModel, setItemModel]=useState(false)
    const [clientModel, setClientModel]=useState(false)

   
  


    const handleClientSelection = (client) => {
        console.log('New client', client);
        setClient(client.name)
    };
    const handleitemSelection = (item) => {
        console.log('New client', item);
        setitem(item.item_name)
    };

    console.log('index', client);




  




    useEffect(() => {
        // invoice_no();
        setCurrentDate(); // Function to set today's date
        get_purchaseclient()
        get_purchaseitem()
    }, []);

    const get_purchaseclient = () => {
        axios.get('http://localhost:3001/getclient')
            .then(response => {
                console.log("Client Data",response.data)
                setpurchase_client(response.data)
            })
    }

    const get_purchaseitem = () => {
        axios.get('http://localhost:3001/getitem')
            .then(response => {
                console.log('Item Data',response.data)
                setpurchase_item(response.data)
            })
    }

    const handlechange = (e) => {
        const { name, value } = e.target
        setpurchaseclient({ ...purchaseclient, [name]: value })
        console.log(clientpurchase)
    }

    const handlechangeitem = (e) => {
        const { name, value } = e.target
        setpurchaseitem({ ...purchaseitem, [name]: value })
        console.log(itempurchase)
    }



    const setCurrentDate = () => {
        const currentDate = new Date().toLocaleDateString();
        setTodayDate(currentDate);
    };

    const handleKeyPress = (e, index, field) => {
        if (e.key === 'Enter') {
            const newRow = { id: rows.length + 1, party_name: '', item_name: '', qauntity: '', amount: '' };
            setRows([...rows, newRow]);
            // console.log(`Pressed Enter in row ${index}, field ${field}`);
            // const nextRowIndex = index + 1;
            // if (nextRowIndex < rows.length) {
            //     const nextRowInput = document.getElementById(`${field}-${nextRowIndex}`);
            //     if (nextRowInput) {
            //         nextRowInput.focus();
            //     }
            // }
        }
    };

    const handleRowChange = (index, field, value) => {
        const newRows = rows.map((row, i) => {
            if (i === index) {
                return { ...row, [field]: value };
            }
            return row;
        });
        setRows(newRows);
    };

    const addRow = () => {
        setRows([...rows, { client: '', item: '', quantity: '', amount: '' }]);
    };

    const removeRow = (index) => {
        setRows(rows.filter((_, i) => i !== index));
    };

    // const removeRow = (index) => {
    //     const updatedRows = [...rows];
    //     updatedRows.splice(index, 1);
    //     // Update index numbers of remaining rows
    //     for (let i = index; i < updatedRows.length; i++) {
    //         updatedRows[i].id = i + 1;
    //     }
    //     setRows(updatedRows);
    // }


    // const handleRowChange = () => {
       


    //     // calculateGrandTotal();
    // };

    const addclient = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const additem = () => {
        setModalIsOpenitem(true)
    }

    const closeModalitem = () => {
        setModalIsOpenitem(false)
    }

    const clientpurchase = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/clientpurchase", {
            purchaseclient: purchaseclient
        }).then(response => {
            console.log(response)
            setModalIsOpen(false)
            window.location.reload()
        }).catch(err => {
            console.log(err)
        })

    }

    const itempurchase = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3001/itempurchase", {
            purchaseitem: purchaseitem
        }).then(response => {
            console.log(response)
            closeModal(); // Close the modal
            window.location.reload()

        }).catch(err => {
            console.log(err)

        })

    }

    const formdata = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/purchasedetails', {
            row: rows
        }).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <main>


            {clientModel   && (
                <tr>
                    <td colSpan="6">
                        <div style={{ position: 'absolute', height: '100vh', overflowY: 'scroll', width: '25vw', zIndex: 1, marginLeft: '62vw', border: '1px solid black', backgroundColor: 'white' }}>
                            <h3 style={{ textAlign: 'center', position: 'sticky', top: 0, backgroundColor: 'white' }}>List of purchase Client <span style={{ cursor:'pointer'}} onClick={()=>setClientModel(false)}>Close</span></h3>
                            {/* Add your content related to "Item Name" here */}
                            {purchase_client.map((client, index) => (
                                <h5 key={index + 1} style={{ marginLeft: '5%', cursor:'pointer' }} onClick={() => handleClientSelection(client)}
                                    >{client.name}</h5>
                            ))}
                        </div>
                    </td>
                </tr>
            )}

            {itemModel  && (
                <tr>
                    <td colSpan="6">
                        <div style={{ position: 'absolute', height: '100vh', width: '25vw', overflowY: 'scroll', zIndex: 1, marginLeft: '62vw', border: '1px solid black', backgroundColor: 'white' }}>
                            <h3 style={{ textAlign: 'center', position: 'sticky', top: 0, backgroundColor: 'white' }}>List of item <span style={{ cursor:'pointer'}} onClick={()=>setItemModel(false)}>Close</span></h3>
                            {/* Add your content related to "Item Name" here */}
                            {purchase_item.map((item, index) => (
                                <h5 key={index + 1} style={{ marginLeft: '5%', cursor:'pointer' }}  onClick={() => handleitemSelection(item)}>{item.item_name}</h5>
                            ))}
                        </div>
                    </td>
                </tr>
            )}

            <div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', width: '85vw' }}>
                    <span style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '1rem', width: '68vw' }}>
                        <label className='fw-bold'>Date: {todayDate}</label>
                    </span>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem', }} >
                        <button className="btn btn-primary" onClick={addclient} style={{ marginRight: '1rem' }}>Add Client</button>
                        <button className="btn btn-success" onClick={additem}>Add Items</button>
                    </div>
                </div>
                <div style={{ marginLeft: '6%' }}>
                    <label className='fw-bold'>
                        A/C Name : Cash
                    </label>
                </div>
                <div style={{ height: '250px', overflowY: 'scroll', alignItems: 'start', margin: '3%' }}>
            <table style={{ width: '70vw', marginLeft: '5%' }}>
                <thead style={{ position: 'sticky', top: '0', backgroundColor: 'white' }}>
                    <tr>
                        <th>Party Name</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index} style={{ marginBottom: '25px', marginTop: '20px' }}>
                            <td style={{ textAlign: 'center' }}>
                                <input
                                    className='form-control rounded'
                                    style={{ width: '100%' }}
                                    value={row.client}
                                    onChange={(e) => handleRowChange(index, 'client', e.target.value)}
                                    onFocus={() => setClientModel(true)}
                                />
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                <input
                                    type='tel'
                                    name='qty'
                                    className='form-control rounded'
                                    style={{ width: '100%' }}
                                    value={row.item}
                                    onChange={(e) => handleRowChange(index, 'item', e.target.value)}
                                    onFocus={() => setItemModel(true)}
                                />
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                <input
                                    type='tel'
                                    pattern='[0-9]*'
                                    className='form-control rounded'
                                    style={{ width: '100%' }}
                                    value={row.quantity}
                                    name='quantity'
                                    onChange={(e) => handleRowChange(index, 'quantity', e.target.value)}
                                    onKeyPress={(e) => handleKeyPress(e, index + 1, 'quantity')}
                                    onClick={handleKeyPress}
                                />
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                <input
                                    className='form-control rounded'
                                    style={{ width: '100%' }}
                                    value={row.amount}
                                    name='amount'
                                    onChange={(e) => handleRowChange(index, 'amount', e.target.value)}
                                />
                            </td>
                            <td style={{ textAlign: 'center' }}>
                                {rows.length > 1 && (
                                    <button className='btn btn-danger' onClick={() => removeRow(index)}>
                                        Remove
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    <tr style={{marginTop:'10px'}}>
                        <td colSpan="5" style={{ textAlign: 'center', marginTop:'10px' }}>
                            <button className='btn btn-primary' onClick={addRow}>
                                Add Row
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
                <div style={{ marginTop: '30vh' }}>
                    <div style={{ display: "flex", justifyContent: 'end', alignItems: 'end', width: '80vw' }}>
                        <div style={{ padding: '1%', border: '1px solid black', width: '10vw', height: '10vh', display: "flex-end", justifyContent: 'end', alignItems: 'end' }}>
                            Total Amount
                            <h3>{TotalAmount.toFixed(2)}</h3>
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: 'end', alignItems: 'end', width: '80vw', marginTop: '1%' }}>
                        <button onClick={formdata} className='btn btn-success'>Save</button>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '400px', // Adjust the width as needed
                    },
                }}
            >



                <form onSubmit={clientpurchase}>
                    <div className="mb-1">
                        <label className="form-label fw-bold">Name:</label>
                        <input type="text" className="form-control" name='name' value={purchaseclient.name} onChange={handlechange} />
                    </div>
                    <div className="mb-1">
                        <label className="form-label fw-bold">Address:</label>
                        <input type="text" className="form-control" name='address' value={purchaseclient.address} onChange={handlechange} />
                    </div>
                    <div className="mb-1">
                        <label className="form-label fw-bold">City:</label>
                        <input type="text" className="form-control" name='city' value={purchaseclient.city} onChange={handlechange} />
                    </div>
                    <div className="mb-1">
                        <label className="form-label fw-bold">State:</label>
                        <input type="text" className="form-control" name='state' value={purchaseclient.state} onChange={handlechange} />
                    </div>
                    <div className="mb-1">
                        <label className="form-label fw-bold">Mobile number:</label>
                        <input type="text" className="form-control" name='mobile_number' value={purchaseclient.mobile_number} onChange={handlechange} />
                    </div>
                    <div className="mb-1">
                        <label className="form-label fw-bold">GST No:</label>
                        <input type="text" className="form-control" name='gst_no' value={purchaseclient.gst_no} onChange={handlechange} />
                    </div>

                    <div className="text-center m-1" >
                        <button type="submit" className="btn btn-primary m-1">Save</button>
                        <button type="button" className="btn btn-secondary m-1" onClick={closeModal}>Cancel</button>
                    </div>
                </form>
            </Modal>
            <Modal
                isOpen={modalIsOpenitem}
                onRequestClose={closeModalitem}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '400px', // Adjust the width as needed
                    },
                }}
            >

                <form onSubmit={itempurchase}>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Name of item:</label>
                        <input type="text" className="form-control" name='item_name' value={purchaseitem.name} onChange={handlechangeitem} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">GST:</label>
                        <input type="text" className="form-control" name='gst_no' value={purchaseitem.gst_no} onChange={handlechangeitem} />
                    </div>


                    <div className="text-center m-1" >
                        <button type="submit" className="btn btn-primary m-1">Save</button>
                        <button type="button" className="btn btn-secondary m-1" onClick={closeModalitem}>Cancel</button>
                    </div>
                </form>
            </Modal>



        </main>
    )
}

export default Purchase
