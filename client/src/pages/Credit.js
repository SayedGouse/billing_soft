import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineBars } from "react-icons/ai"
import { FaFilter } from "react-icons/fa"
import Modal from 'react-modal';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
Modal.setAppElement('#root');

const Credit = () => {
    const [credit, setcredit] = useState([])
    const [filteredcredit, setFilteredcredit] = useState([]);
    const [filterText, setFilterText] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const [formdata, setformdata] = useState(
        {
            amount: '',
            date: '',
            paymentmethod: 'cash'
        }
    )


    let today=new Date();
    let dd=today.getDate();
    let mm=today.getMonth()+1;
    let yy=today.getFullYear()
    let cdate=yy+"-"+mm+"-"+dd;
    //const [paymentmethod, setpaymentmethod]=useState('')

    const handlerchange = (e) => {
        const { name, value } = e.target
        // if(name === 'paymentmethod' ){
        //     setpaymentmethod(value)
        //     alert(formdata.paymentmethod)
        // }else{
            
            setformdata({ ...formdata, [name]: value })
            
        //}
    }

    const submitdata = () => {
        const invoice_no = formdata.invoice_no;
        alert(invoice_no)
    
        // e.peventDefault()
        axios.post('http://localhost:3001/balance', {
            invoice_no: formdata.invoice_no,
            amount: formdata.amount,
            formdata:formdata
        }).then(response => {
            
            alert(invoice_no)
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        run_history()
        // run_history1()
    }, [])

    const run_history = () => {
        axios.get("http://localhost:3001/credit")
            .then(response => {
                console.log(response.data)
                setcredit(response.data)
                setFilteredcredit(response.data);

            })
            .catch(error => {
                console.error(error);
            });
    }


    const handleFilterChange = (event) => {
        const searchText = event.target.value.toLowerCase();
        setFilterText(searchText);

        const filteredData = credit.filter((item) =>
            item.client_name.toLowerCase().includes(searchText) &&
            (!selectedMonth ||
                new Date(item.date).getMonth() + 1 === parseInt(selectedMonth))
        );
        setFilteredcredit(filteredData);
    };
    const handleMonthFilterChange = (event) => {
        const selectedMonth = event.target.value;
        setSelectedMonth(selectedMonth);

        if (selectedMonth === '') {
            setFilteredcredit(credit);
        } else {
            const filteredData = credit.filter((item) => {
                const itemMonth = new Date(item.date).getMonth() + 1; // Months are 0-indexed in JavaScript Date
                return (
                    itemMonth.toString().padStart(2, '0') === selectedMonth &&
                    item.client_name.toLowerCase().includes(filterText.toLowerCase())
                );
            });
            setFilteredcredit(filteredData);
        }
    };

    const handleRowClick = (index) => {
        setSelectedRow(index === selectedRow ? null : index);
    };

    // Function to open the modal
    const openModal = (invoice_no) => {
        setModalIsOpen(true);
        setformdata({ ...formdata, invoice_no: invoice_no });
    };

    // Function to close the modal
    const closeModal = () => {
        setModalIsOpen(false);
    };


    const downloadPdf = (invoice_no) => {
        axios.get(`http://localhost:3001/creditdata?invoice_no=${invoice_no}`)
          .then(response => {
            const datahistory = response.data;
            const pdf = new jsPDF();
    
            pdf.setFontSize(18);
            pdf.setTextColor(46, 13, 155);
            pdf.text(20, 15, 'Invoice');
    
            pdf.setFontSize(10); // Adjust the font size as needed
            // Add the "Invoice To" section
            pdf.setTextColor(0,0,0);
            pdf.text(20, 25, `Invoice No: ${invoice_no}`);
            pdf.text(20, 30, 'salman Khan');
            pdf.text(20, 35, 'Street Gandhi Nagar,');
            pdf.text(20, 40, 'Dharwad, 580024');
            pdf.text(20, 45, 'Mobile: 9670665774');
            pdf.text(20, 50, 'Email: salmankhan@gmail.com');
    
    
            pdf.text(120, 20, `Invoice No: ${invoice_no}`);
            pdf.text(120, 25, `Invoice No: ${invoice_no}`);
            pdf.text(120, 30, 'salman Khan');
            pdf.text(120, 35, 'Street Gandhi Nagar,');
            pdf.text(120, 40, 'Dharwad, 580024');
            pdf.text(120, 45, 'Mobile: 9670665774');
            pdf.text(120, 50, 'Email: salmankhan@gmail.com');
    
    
            pdf.text(20, 65, 'Date: ');
            pdf.text(20, 70, `${cdate}` );
    
            pdf.text(70, 65, 'invoice: ');
            pdf.text(70, 70, `${invoice_no}:`);
    
            if (datahistory && datahistory[0] && datahistory[0].finalgst !== undefined) {
              const finalgst = datahistory[0].finalgst;
              pdf.text(120, 65, 'Gst: ');
              pdf.text(120, 70, `${finalgst}:`);
            }
    
            if (datahistory && datahistory[0] && datahistory[0].total_amount !== undefined) {
              const total_amount = datahistory[0].total_amount;
              pdf.text(170, 65, 'Amount: ');
              pdf.text(170, 70, `${total_amount}:`);
            }
    
            // pdf.text(120, 65, 'gst:');
            // pdf.text(120, 70, `${invoice_no}`);
    
            // pdf.text(170, 65, 'Amount: ');
            // pdf.text(170, 70, `${invoice_no}`);
    
            // Add the table for datahistory
            const tableData = [];
            datahistory.forEach(item => {
              tableData.push([item.itemName, item.qty, item.unitPrice,item.total]);
            });
    
            pdf.autoTable({
              startY: 85, // Adjust the Y position as needed
              head: [['Item Name', 'Qty', 'Unit Price','total']],
              body: tableData,
            });
    
            pdf.setDrawColor(46, 13, 155);
            pdf.setLineWidth(0.5); // Set line width as needed
          
            pdf.line(10, pdf.autoTable.previous.finalY + 10, 200, pdf.autoTable.previous.finalY + 10); // Adjust the Y position as needed
    
    
            if (datahistory && datahistory[0] && datahistory[0].total_amount !== undefined) {
              const total_amount = datahistory[0].total_amount;
              pdf.text(150, pdf.autoTable.previous.finalY + 30, `SubTotal: ${total_amount}`);
            } else {
              pdf.text(150, pdf.autoTable.previous.finalY + 30, 'SubTotal: N/A');
            }
      
            if (datahistory && datahistory[0] && datahistory[0].discount !== undefined) {
              const discount = datahistory[0].discount;
              pdf.text(150, pdf.autoTable.previous.finalY + 35, `Discount: ${discount}`);
            } else {
              pdf.text(150, pdf.autoTable.previous.finalY + 35, 'Discount: N/A');
            }
      
            if (datahistory && datahistory[0] && datahistory[0].total_qty !== undefined) {
              const total_qty = datahistory[0].total_qty;
              pdf.text(150, pdf.autoTable.previous.finalY + 40, `Total Qty: ${total_qty}`);
            } else {
              pdf.text(150, pdf.autoTable.previous.finalY + 40, 'Total Qty: N/A');
            }
      
            if (datahistory && datahistory[0] && datahistory[0].finalgst !== undefined) {
              const finalgst = datahistory[0].finalgst;
              pdf.text(150, pdf.autoTable.previous.finalY + 45, `Final GST: ${finalgst}`);
            } else {
              pdf.text(150, pdf.autoTable.previous.finalY + 45, 'Final GST: N/A');
            }
      
            if (datahistory && datahistory[0] && datahistory[0].invoice_no !== undefined) {
              const invoice_no = datahistory[0].invoice_no;
              pdf.text(150, pdf.autoTable.previous.finalY + 50, `Invoice No: ${invoice_no}`);
            } else {
              pdf.text(150, pdf.autoTable.previous.finalY + 50, 'Invoice No: N/A');
            }
      
            if (datahistory && datahistory[0] && datahistory[0].balance !== undefined) {
              const balance = datahistory[0].balance;
              pdf.text(150, pdf.autoTable.previous.finalY + 55, `Balance: ${balance}`);
            } else {
              pdf.text(150, pdf.autoTable.previous.finalY + 55, 'Invoice No: N/A');
            }
      
      
    
            pdf.save('row_data.pdf');
          })
          .catch(err => {
            console.log(err);
          });
      };

    return (
        <main>
            <div style={{ padding: '5% 5% 5% 5%', display: 'flex' }}>
                <div>
                    <input className='form-control rounded' value={filterText} onChange={handleFilterChange} placeholder='Search by name...'
                        style={{ width: '70vw' }} />
                </div>
                <select style={{ border: 'none' }} value={selectedMonth} onChange={handleMonthFilterChange} >

                    <option style={{ border: 'none' }} value=''>All<FaFilter /></option>
                    <option value='01'>January</option>
                    <option value='02'>February</option>
                    <option value='03'>March</option>
                    <option value='04'>April</option>
                    <option value='05'>May</option>
                    <option value='06'>June</option>
                    <option value='07'>July</option>
                    <option value='08'>August</option>
                    <option value='09'>September</option>
                    <option value='10'>October</option>
                    <option value='11'>November</option>
                    <option value='12'>December</option>
                </select>

            </div>
            <div className='container-fluid' style={{ marginTop: '1%', padding: '0 5% 0 5%' }}>
                <div className='table-container rounded' style={{ width: '80vw', maxHeight: '240px', overflowY: 'scroll', alignItems: 'start' }}>
                    <table className='table table-striped rounded'>
                        <thead className='text-white' style={{ position: 'sticky', top: 0, zIndex:2, backgroundColor: '#2E0D9B', color: 'black' }}>

                            <th style={{ textAlign: 'end' }}></th>
                            <th style={{ textAlign: 'start' }}>Name</th>
                            <th style={{ textAlign: 'start' }}>Invoice no</th>
                            <th style={{ textAlign: 'center' }}>Created</th>
                            <th style={{ textAlign: 'center' }}>Due date</th>
                            <th style={{ textAlign: 'center' }}>Total amount</th>
                            <th style={{ textAlign: 'center' }}>Balance</th>
                            <th style={{ textAlign: 'center' }}>pdf</th>

                        </thead>
                        <tbody>
                            {
                                filteredcredit.map((val, index) => {
                                    const isSelectedRow = selectedRow === index;
                                    return (
                                        <>
                                            <tr key={index} style={{ margin: '1% 0',position :'relative',top:0 }} onClick={() => handleRowClick(index)} >
                                                <td style={{ textAlign: 'end' }}>{index + 1}</td>
                                                <td style={{ textAlign: 'start' }}>{val.client_name}</td>
                                                <td style={{ textAlign: 'start' }}>{val.invoice_no}</td>
                                                <td style={{ textAlign: 'center' }}>{val.created}</td>
                                                <td style={{ textAlign: 'center', paddingRight: '5%' }}>{val.due_date}</td>
                                                <td style={{ textAlign: 'center' }}>{val.finalAmount}</td>
                                                <td style={{ textAlign: 'center' }}>{val.balance}</td>
                                                <td style={{ textAlign: 'center' }}>
                                                    <AiOutlineBars color="#2E0D9B" />
                                                    {isSelectedRow && (
                                                        <div className='addamount'  style={{ position: 'absolute', zIndex: 1, right: '0', top: '50%', transform: 'translateY(-50%)' }}>
                                                            <p className='download' onClick={() => openModal(val.invoice_no)}>Add Amount</p>
                                                            <hr style={{ marginTop: '-1%', marginBottom: '-1%' }} stroke="black" strokeWidth="1" />
                                                            <p className='download' onClick={() => downloadPdf(val.invoice_no)}>Download</p>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
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
                    <h2>Add Amount</h2>
                    <form onSubmit={submitdata}>
                        <div className="mb-3">
                            <label htmlFor="amount" className="form-label">Amount:</label>
                            <input type="text" name='amount' value={formdata.amount} className="form-control" onChange={handlerchange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="paymentDate" className="form-label">Payment Date:</label>
                            <input type="date" className="form-control"  onChange={handlerchange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Payment Method:</label>
                            <select className="form-select" name='paymentmethod' Value={formdata.paymentmethod} onChange={handlerchange}>
                                <option value='cash'>Cash</option>
                                <option value='upi'>UPI</option>
                            </select>
                        </div>
                        <div className="text-center m-1" >
                            <input type="submit" value='submit' className="btn btn-primary m-1" />
                            <button type="button" className="btn btn-secondary m-1" onClick={closeModal}>Cancel</button>
                        </div>
                    </form>
                </Modal>
            </div>

        </main>
    )
}

export default Credit
