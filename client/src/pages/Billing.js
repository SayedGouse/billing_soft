import React, { useEffect, useState } from 'react'
// import { GrAddCircle } from 'react-icons/gr'
// import { MdOutlineRemoveCircleOutline } from 'react-icons/md'
import { AiOutlinePrinter } from 'react-icons/ai'
import { MdQrCodeScanner } from 'react-icons/md'
import axios from 'axios'
import Modal from 'react-modal'; // Import react-modal
import ReactDOMServer from 'react-dom/server'; // Add this import
import { Tab, Tabs } from 'react-bootstrap';


const Billing = () => {

  const [rows, setRows] = useState([
    { id: 1, itemName: '', qty: '', unitPrice: '', total: '' },
    { id: 2, itemName: '', qty: '', unitPrice: '', total: '' },
    { id: 3, itemName: '', qty: '', unitPrice: '', total: '' },
    { id: 4, itemName: '', qty: '', unitPrice: '', total: '' },
    // { id: 5, itemName: '', qty: '', unitPrice: '', total: '' },
  ]);

  // const [creditPaymentAmount, setCreditPaymentAmount] = useState('');

  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yy = today.getFullYear()
  let cdate = yy + "-" + mm + "-" + dd;
  // let ctime = today.toLocaleTimeString();

  const [client_data, setclient_data] = useState(
    { gst_number: '', client_name: '', address: '' }
  )

  const [invoice, setinvoice] = useState('')

  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [gst, setGst] = useState(6);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [creditPaymentAmount, setCreditPaymentAmount] = useState('');

  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  // const [discount,setdiscount]=useState('')

  // const [grandTotal, setGrandTotal] = useState(0);
  // const [totalQty, setTotalQty] = useState(0);

  const [showScannerModal, setShowScannerModal] = useState(false);
  const [selectedScanner, setSelectedScanner] = useState(null);



  const openScannerModal = () => {
    setShowScannerModal(true);
  };

  const closeScannerModal = () => {
    setShowScannerModal(false);
  };

  const handleScannerSelect = (scanner) => {
    setSelectedScanner(scanner);
    closeScannerModal();
  };


  const hanlerchange = (e) => {
    const { name, value } = e.target
    setclient_data({ ...client_data, [name]: value })
    console.log(client_data)

  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');

    // const finalAmountWithCredit = grandTotal - discountAmount + gstAmount;
    // if (selectedPaymentMethod === 'credit') {
    //   finalAmountWithCredit -= parseFloat(creditPaymentAmount || 0);
    // }

    const content = (

      <html>
        <head>
          <title>Invoice</title>
          {/* <link rel="stylesheet" type="text/css" href="printstyle.css" /> */}
          <style>

          </style>
        </head>
        <body style={{ page: 'A4' }}>
          <div className="printable-content">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h1 style={{ color: '#2E0D9B' }}>Invoice</h1>
              <img style={{ width: '10%', height: '20%' }} src="logo.jpg" alt='not found' />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div >
                <label>Invoice To:</label> salman Khan<br />
                Street Gandhi Nagar, <br />
                Dharwad, 580024 <br />
                Mobile : 9670665774 <br />
                Email : salmankhan@gmail.com
              </div>

              <div >
                <label>Invoice To:</label> salman Khan<br />
                Street Gandhi Nagar, <br />
                Dharwad, 580024 <br />
                Mobile : 9670665774 <br />
                Email : salmankhan@gmail.com
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '5%' }}>

              <div className='col-lg-3'>
                <label style={{ color: '#2E0D9B' }}>Date</label>
                <p> <b>{cdate}</b></p>
              </div>
              <div className='col-lg-3'>
                <label style={{ color: '#2E0D9B' }}>Invoice No:</label>
                <p><b>{invoice}</b></p>
              </div >
              <div className='col-lg-3'>
                <label style={{ color: '#2E0D9B' }}>GST No:</label>
                <p><b>{client_data.gst_number}</b></p>
              </div>
              <div className='col-lg-3'>
                <label style={{ color: '#2E0D9B' }}>Amount:</label>
                <p><b>{finalAmount}</b></p>
              </div>



            </div>


            <div>
              <table style={{ width: '100vw', alignItems: 'start' }} >
                <thead >

                  <th>Sl. No.</th>
                  <th>Item Name</th>
                  <th>Qty</th>
                  <th>Per Unit Price</th>
                  <th>Total</th>

                </thead>
                <tbody >
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: 'center' }}>{index + 1}</td>
                      <td style={{ textAlign: 'center' }}>{row.itemName}</td>
                      <td style={{ textAlign: 'center' }}>{row.qty}</td>
                      <td style={{ textAlign: 'center' }}>{row.unitPrice}</td>
                      <td style={{ textAlign: 'center' }}>{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <hr style={{ border: '1px solid #2E0D9B' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <h4>Scanner</h4>
                {selectedScanner === 'scanner1' ? (
                  <img src='download.png' alt='scanner' />
                ) : selectedScanner === 'scanner2' ? (
                  <img src='scaner.png' alt='scanner' />
                ) : (
                  <p>No scanner selected</p>
                )}
              </div>


              <div>
                <h4>Summary</h4>
                <p>Total Quantity: {finalqty}</p>
                <p>Discount Percentage: {finaldiscount}%</p>
                <p>GST Rate: {gst}%</p>
                <div>Grand Total: {finalAmount}/-</div>

                <div>paid Amount:{creditPaymentAmount}/-</div>
              </div>
            </div>
          </div>
        </body>
      </html>
    );

    printWindow.document.open();
    printWindow.document.write(ReactDOMServer.renderToStaticMarkup(content));
    printWindow.document.close();

    printWindow.print();
  };



  const clientdata = (e) => {
    e.preventDefault()
    const paymentData = {};
    
    if (selectedPaymentMethod === 'Cash') {
      paymentData.cash = finalAmount;
    } else if (selectedPaymentMethod === 'upi') {
      paymentData.upi = finalAmount;
    } else if (selectedPaymentMethod === 'credit') {
      paymentData.credit = finalAmount;
    }
    axios.post("http://localhost:3001/clientdata", {

      client_data: client_data,
      billdata: rows,
      invoice: invoice,
      finalAmount: finalAmount,
      finalgst: finalgst,
      finaldiscount: finaldiscount,
      finalqty: finalqty,
      paymentData: paymentData,
      creditPaymentAmount:creditPaymentAmount,
      balance:creditpay
    
      
      

    }).then(response => {
      console.log(response)
      window.location.reload()
    }).catch(err => {
      console.log(err)
    })
  }

  // const calculateGrandTotal = () => {
  //   let totalAmount = 0;
  //   for (const row of rows) {
  //     const rowTotal = parseFloat(row.total) || 0;
  //     totalAmount += rowTotal;
  //   }
  //   return totalAmount.toFixed(2);
  // };

  
  const handleRowChange = (index, field, value) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;


    if (field === 'qty' || field === 'unitPrice') {
      // Calculate total based on qty and unitPrice
      const qty = (updatedRows[index].qty) || 0;
      const unitPrice = parseFloat(updatedRows[index].unitPrice) || 0;
      updatedRows[index].total = (qty * unitPrice).toFixed(2);

    }

    setRows(updatedRows);

    // calculateGrandTotal();
  };


  const calculateGrandTotal = () => {
    return rows.reduce((total, row) => total + parseFloat(row.total || 0), 0);
  };

  const calculateTotalQuantity = () => {
    return rows.reduce((totalQty, row) => totalQty + parseFloat(row.qty || 0), 0);
  };



  const bill_detail = (e) => {
    e.preventDefault()
    axios.post("http://localhost:3001/billdata", {
      billdata: rows
    }).then(response => {
      console.log(response)

    }).catch(err => {
      console.log(err)
    })
  }

    const handleKeyPress = (e, index, field) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // Prevent the form submission
    const newRow = { id: rows.length + 1, itemName: '', qty: '', unitPrice: '', total: '' };
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

  // const handleKeyPress = (e, index, field) => {
  //   if (e.key === 'Enter') {
  //     const newRow = { id: rows.length + 1, itemName: '', qty: '', unitPrice: '', total: '' };
  //     setRows([...rows, newRow]);
  //     console.log(`Pressed Enter in row ${index}, field ${field}`);
  //     const nextRowIndex = index + 1;
  //     if (nextRowIndex < rows.length) {
  //       const nextRowInput = document.getElementById(`${field}-${nextRowIndex}`);
  //       if (nextRowInput) {
  //         nextRowInput.focus();
  //       }
  //     }
  //   }
  // };

  // const addRow = () => {
  //   const newRow = { id: rows.length + 1, itemName: '', qty: '', unitPrice: '', total: '' };
  //   setRows([...rows, newRow]);
  // };

  const removeRow = (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    // Update index numbers of remaining rows
    for (let i = index; i < updatedRows.length; i++) {
      updatedRows[i].id = i + 1;
    }
    setRows(updatedRows);

    // Update grand total
    // calculateGrandTotal();
  };

  const calculateDiscountAmount = () => {
    const grandTotal = calculateGrandTotal();
    return (grandTotal * discountPercentage) / 100 || 0;
  };

  const handleDiscountChange = (e) => {
    const newDiscount = parseFloat(e.target.value);
    setDiscountPercentage(newDiscount);
  };

  const calculateGstAmount = (amount) => {
    return (amount * gst) / 100;
  };

  useEffect(() => {
    invoice_no()
  }, [])

  const invoice_no = async () => {
    try {
      const response = await axios.get("http://localhost:3001/invoice");
      const invoiceNumber = response.data.invoice_no;
      setinvoice(invoiceNumber);
    } catch (error) {
      console.log(error);
    }
  };

  const grandTotal = calculateGrandTotal();
  const discountAmount = calculateDiscountAmount();
  const gstAmount = calculateGstAmount(grandTotal - discountAmount);

  // Calculate the final amount including discounts and GST
  const finalAmount = (grandTotal - discountAmount + gstAmount).toFixed(2);
  const creditpay = (grandTotal - discountAmount + gstAmount-(creditPaymentAmount || 0)).toFixed(2);

  const finalgst = calculateGstAmount(calculateGrandTotal() - calculateDiscountAmount()).toFixed(2)

  const finaldiscount = isNaN(discountPercentage) ? '' : discountPercentage || 0

  const finalqty = calculateTotalQuantity()

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '100%',
      maxWidth: '600px',
      maxHeight: '100%',
      overflow: 'auto',
      height: '400px'

    },
  };

 




  return (
    <main style={{width:'85vw', background:'white'}}>
    <Tabs  style={{ margin: 0, padding: 0,marginTop:"-10%" }} defaultActiveKey="billing" id="billing-tabs"> {/* Define the Tabs component */}
          <Tab  style={{ margin: 0, padding: 0 }} eventKey="billing" title="Billing"> {/* Define the first tab */}
            {/* Your existing Billing content */}
      <div className="printable-content">
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
         
          
        </div>
        
        <form onSubmit={bill_detail}>


          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '10px' }} >

            <p><input type='radio' name='payment_method' checked={selectedPaymentMethod === 'Cash'} onChange={handlePaymentMethodChange} value='Cash' style={{ marginRight: '5px', marginLeft: '40px' }} />cash
              <input type='radio' name='payment_method' checked={selectedPaymentMethod === 'credit'} onChange={handlePaymentMethodChange} value='credit' style={{ marginRight: '5px', marginLeft: '40px' }} />credit
              <input type='radio' name='payment_method' checked={selectedPaymentMethod === 'upi'} onChange={handlePaymentMethodChange} value='upi' style={{ marginRight: '5px', marginLeft: '40px' }} />upi</p>

            <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '4%' }}>
              <tr>
                <th>GST Number</th>
                <input type='text' name='gst_number' value={client_data.gst_number} className='form-control rounded' style={{ width: 500 }} onChange={hanlerchange} />
              </tr>
            </div>
            <div style={{ margin: '1% 0 0 5%' }}>
              <button onClick={handlePrint} style={{ border: 'none', background: 'white' }}> <button type='submit' className='btn' onClick={clientdata} style={{ border: 'none' }}> <AiOutlinePrinter className='scanner' size={40} />
                <p>Printer</p></button></button>
            </div>
            <div style={{ margin: '1% 0 0 5%' }}>
              <div className="scanner" onClick={openScannerModal} >
                <MdQrCodeScanner size={40} />
                <p>Scanner</p>
              </div>
              <Modal
                isOpen={showScannerModal}
                onRequestClose={closeScannerModal}
                style={modalStyles}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="scanner-option" onClick={() => handleScannerSelect('scanner1')}>
                    <img src="download.png" alt="scanner" />

                  </div>
                  <div className="scanner-option" onClick={() => handleScannerSelect('scanner2')}>
                    <img src="scaner.png" alt="scanner" />

                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '5%' }}>
                  <button className="close-modal btn btn-warning" onClick={closeScannerModal}>
                    Close
                  </button>
                </div>
              </Modal>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }} >
            <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '2%', marginTop: '1%' }}>
              <tr>
                <th>Client name</th>
                <input type='text' name='client_name' value={client_data.client_name} className='form-control rounded' style={{ width: 450 }} onChange={hanlerchange} />
              </tr>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '4%', marginTop: '1%' }}>
              <tr>
                <th>Invoice code</th>
                <input type='text' name='invoice_no' value={invoice} className='form-control rounded' style={{ width: 500 }} readOnly />
              </tr>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }} >
            <div style={{ display: 'flex', justifyContent: 'center', marginLeft: '2%', marginTop: '1%' }}>
              <tr>
                <th>Client Address</th>
                <input type='text' name='address' value={client_data.address} className='form-control rounded' style={{ width: 450 }} onChange={hanlerchange} />
              </tr>
            </div>
          </div>

          <div className='d-flex flex-colunm container-fluid' style={{ marginTop: '1%', padding: '0 5% 0 5%' }}>

            <div className='table-container' style={{ width: '100%', height: '250px', overflowY: 'scroll', alignItems: 'start' }}>
              <table className='table table-striped table-rounded'>
                <thead style={{ position: 'sticky', top: 0, backgroundColor: 'white', color: 'black' }}>
                  <th style={{ textAlign: 'center' }}>Sl.No.</th>
                  <th style={{ textAlign: 'center' }}>Item Name</th>
                  <th style={{ textAlign: 'center', paddingRight: '5%' }}>Qty</th>
                  <th style={{ textAlign: 'center' }}>Per Unit Price</th>
                  <th style={{ textAlign: 'center' }}>Total</th>
                  <th style={{ textAlign: 'center', backgroundColor: 'white' }}>Action</th>

                </thead>
                <tbody>
                  {rows.map((row, index) => {
                    return (

                      <tr>
                        <td style={{ textAlign: 'center' }}>{row.id}.</td>
                        <td style={{ textAlign: 'center' }}>
                          <input
                            id={`itemName-${index}`}
                            className='form-control rounded'
                            style={{ width: '100%' }}
                            value={row.itemName}
                            onChange={(e) => handleRowChange(index, 'itemName', e.target.value)}
                          // onKeyPress={(e) => handleKeyPress(e, index, 'qty')}
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <input
                            type='tel'
                            name='qty'
                            pattern='[0-9]*'
                            id={`qty-${index}`}
                            className='form-control rounded'
                            style={{ width: '100%' }}
                            value={row.qty}
                            onChange={(e) => handleRowChange(index, 'qty', e.target.value)}
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <input
                            type='tel'
                            pattern='[0-9]*'
                            id={`unitPrice-${index}`}
                            className='form-control rounded'
                            style={{ width: '100%' }}
                            value={row.unitPrice}
                            name='unitPrice'
                            onChange={(e) => handleRowChange(index, 'unitPrice', e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e, index + 1, 'unitPrice')}
                            onClick={handleKeyPress}
                          />
                        </td>
                        <td style={{ textAlign: 'center' }}>
                          <input
                            id={`total-${index}`}
                            className='form-control rounded'
                            style={{ width: '100%' }}
                            value={row.total}
                            name='unitPrice'
                            onChange={(e) => handleRowChange(index, 'total', e.target.value)}
                            // onKeyPress={(e) => handleKeyPress(e, index + 1, 'itemName')}
                            // onClick={handleKeyPress}
                            readOnly
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
          </div>
          <div>
            <h3 style={{ margin: '2% 0 0 3%' }}>Grand Total</h3>
            <div style={{ marginTop: '1%', display: 'flex', justifyContent: 'center' }}>

              <div className='btn cash' name='grand_total' style={{ padding: '2% 8% 2% 8%', fontWeight: 'bold', fontSize: '40px' }}>  {finalAmount}
                /-</div>
              <div style={{ display: 'flex', justifyContent: 'end', marginLeft: '30%' }}>
                <div>
                  <th>Total Qty</th>
                  <input type='text' name='total_qty' className='form-control rounded' value={finalqty} readOnly />
                  <th>Discount(%)</th>
                  <input type='text' name='discount' className='form-control rounded' value={finaldiscount} onChange={handleDiscountChange} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'end', marginLeft: '3%' }}>
                <div>
                  <th>GST
                    <select
                      className='rounded'
                      style={{ border: 'none !important', marginBottom: '6%' }}
                      value={gst}
                      onChange={(e) => setGst(parseFloat(e.target.value))}
                    >
                      <option className='rounded' value={1}>1%</option>
                      <option className='rounded' value={6}>6%</option>
                      <option className='rounded' value={8}>8%</option>
                      <option className='rounded' value={10}>10%</option>
                      <option className='rounded' value={12}>12%</option>
                      <option className='rounded' value={18}>18%</option>
                      <option className='rounded' value={20}>20%</option>
                    </select>
                  </th>
                  <input type='text' name='finalgst' className='form-control  rounded' value={finalgst}
                    readOnly />
                  {selectedPaymentMethod === 'credit' && (
                    <div>
                      <th>Paying Amount</th>
                      <input
                        type='text'
                        pattern='[0-9]*'
                        className='form-control rounded'
                        value={creditPaymentAmount}
                        onChange={(e) => setCreditPaymentAmount(e.target.value)}
                      />
                      
                    
                    </div>
                  
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>

        
      </div>

           </Tab>
           <Tab eventKey="otherTab" title="Other Tab"> {/* Define the second tab */}
             {/* Content for the second tab */}
             
             
           </Tab>
         </Tabs>
    </main>
  )
}

export default Billing

