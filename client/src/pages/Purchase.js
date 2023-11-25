import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const Purchase = () => {

    const [rows, setRows] = useState([
        { id: 1, party_name: '', item_name: '', qauntity: '', amount: '' },
        // { id: 2, itemName: '', qty: '', unitPrice: '', total: '' },
        // { id: 3, itemName: '', qty: '', unitPrice: '', total: '' },
        // { id: 4, itemName: '', qty: '', unitPrice: '', total: '' },
        // { id: 5, itemName: '', qty: '', unitPrice: '', total: '' },
    ]);
    const [todayDate, setTodayDate] = useState('');

    const [modalIsOpen, setModalIsOpen] = useState(false)
    const [modalIsOpenitem, setModalIsOpenitem] = useState(false)
    const [focusedRowIndex, setFocusedRowIndex] = useState(null);
    const [focusedRowitem, setFocusedRowitem] = useState(null);
    const [purchaseitem, setpurchaseitem] = useState([{ item_name: '', gst_no: '' }])
    const [purchaseclient, setpurchaseclient] = useState([{ name: '', address: '', city: '', state: '', mobile_number: '', gst_no: '' }])
    const [purchase_client, setpurchase_client] = useState([])
    const [purchase_item, setpurchase_item] = useState([])
    const [filteredClients, setFilteredClients] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [TotalAmount, setTotalAmount] = useState(0);
    const [selectedClient, setSelectedClient] = useState(null);


    const handleClientSelection = (client) => {
        setSelectedClient(client);
        const updatedRows = [...rows];
        updatedRows[focusedRowIndex].party_name = client.name; // Set the selected client's name in the input field
        setRows(updatedRows);
        setFilteredClients([]); // Clear the filtered clients list
    };




    const filterClients = (input) => {
        const filtered = purchase_client.filter((client) => {
            return client.name.toLowerCase().includes(input.toLowerCase());
        });
        setFilteredClients(filtered);
    };



    const filterItems = (input) => {
        const filtered = purchase_item.filter((item) => {
            return item.item_name.toLowerCase().includes(input.toLowerCase());
        });
        setFilteredItems(filtered);
    };

    useEffect(() => {
        // invoice_no();
        setCurrentDate(); // Function to set today's date
        get_purchaseclient()
        get_purchaseitem()
    }, []);

    const get_purchaseclient = () => {
        axios.get('http://localhost:3001/getclient')
            .then(response => {
                console.log(response.data)
                setpurchase_client(response.data)
            })
    }

    const get_purchaseitem = () => {
        axios.get('http://localhost:3001/getitem')
            .then(response => {
                console.log(response.data)
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
            console.log(`Pressed Enter in row ${index}, field ${field}`);
            const nextRowIndex = index + 1;
            if (nextRowIndex < rows.length) {
                const nextRowInput = document.getElementById(`${field}-${nextRowIndex}`);
                if (nextRowInput) {
                    nextRowInput.focus();
                }
            }
        }
    };

    const removeRow = (index) => {
        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        // Update index numbers of remaining rows
        for (let i = index; i < updatedRows.length; i++) {
            updatedRows[i].id = i + 1;
        }
        setRows(updatedRows);
    }


    const handleRowChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;


       

        if (field === 'party_name') {

            filterClients(value);
        } else if (field === 'item_name') {
            filterItems(value);
        }

        if (field === 'qauntity' || field === 'amount') {
            // Recalculate the total amount when the "Quantity" or "Amount" field changes
            let TotalAmount = 0;
            updatedRows.forEach((row) => {
                const quantity = parseFloat(row.qauntity) || 0;
                const amount = parseFloat(row.amount) || 0;
                TotalAmount += quantity * amount;
            });
            setTotalAmount(TotalAmount);
        }

        setRows(updatedRows);

        // calculateGrandTotal();
    };

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


            {focusedRowIndex !== null && (
                <tr>
                    <td colSpan="6">
                        <div style={{ position: 'absolute', height: '100vh', overflowY: 'scroll', width: '25vw', zIndex: 1, marginLeft: '62vw', border: '1px solid black', backgroundColor: 'white' }}>
                            <h3 style={{ textAlign: 'center', position: 'sticky', top: 0, backgroundColor: 'white' }}>List of purchase Client</h3>
                            {/* Add your content related to "Item Name" here */}
                            {filteredClients.map((client, index) => (
                                <h5 key={index + 1} style={{ marginLeft: '5%' }}
                                    >{client.name}<button className='btn btn-warning'  onClick={() => handleClientSelection(client)}>add</button></h5>
                            ))}
                        </div>
                    </td>
                </tr>
            )}

            {focusedRowitem !== null && (
                <tr>
                    <td colSpan="6">
                        <div style={{ position: 'absolute', height: '100vh', width: '25vw', overflowY: 'scroll', zIndex: 1, marginLeft: '62vw', border: '1px solid black', backgroundColor: 'white' }}>
                            <h3 style={{ textAlign: 'center', position: 'sticky', top: 0, backgroundColor: 'white' }}>List of item</h3>
                            {/* Add your content related to "Item Name" here */}
                            {filteredItems.map((item, index) => (
                                <h5 key={index + 1} style={{ marginLeft: '5%' }}>{item.item_name}</h5>
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
                                <th></th>
                                <th>Party Name</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody >

                            {rows.map((row, index) => {
                                return (

                                    <tr style={{ margin: '5px' }}>
                                        <td style={{ textAlign: 'center' }}>{row.id}.</td>
                                        <td style={{ textAlign: 'center' }}>
                                            <input
                                                // id={`item_name-${index}`}
                                                className='form-control rounded'
                                                style={{ width: '100%' }}
                                                value={selectedClient}  
                                                  onChange={(e) =>  handleRowChange(index, 'party_name', e.target.value)} // Set row.party_name

                                                // onKeyPress={(e) => handleKeyPress(e, index, 'qty')}
                                                onFocus={() => setFocusedRowIndex(index)}
                                                onBlur={() => setFocusedRowIndex(null)}
                                            />
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <input
                                                type='tel'
                                                name='qty'

                                                // id={`qty-${index}`}
                                                className='form-control rounded'
                                                style={{ width: '100%' }}
                                                value={rows.item_name}  
                                                onChange={(e) => handleRowChange(index, 'item_name', e.target.value)}
                                                onFocus={() => setFocusedRowitem(index)}
                                                onBlur={() => setFocusedRowitem(null)}
                                            />
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <input
                                                type='tel'
                                                pattern='[0-9]*'
                                                // id={`unitPrice-${index}`}
                                                className='form-control rounded'
                                                style={{ width: '100%' }}
                                                value={row.unitPrice}
                                                name='qauntity'
                                                onChange={(e) => handleRowChange(index, 'qauntity', e.target.value)}
                                                onKeyPress={(e) => handleKeyPress(e, index + 1, 'qauntity')}
                                                onClick={handleKeyPress}
                                            />
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            <input
                                                // id={`total-${index}`}
                                                className='form-control rounded'
                                                style={{ width: '100%' }}
                                                value={row.amount}
                                                name='amount'
                                                onChange={(e) => handleRowChange(index, 'amount', e.target.value)}
                                            // onKeyPress={(e) => handleKeyPress(e, index + 1, 'itemName')}
                                            // onClick={handleKeyPress}

                                            />
                                        </td>
                                        <td style={{ textAlign: 'center' }}>
                                            {rows.length > 1 ? (
                                                <button className='btn btn-danger' onClick={() => removeRow(index)}>
                                                    Remove
                                                </button>
                                            ) : null}
                                        </td>
                                    </tr>

                                )
                            }
                            )}
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
