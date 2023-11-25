import axios from 'axios'
import React, { useEffect, useState } from 'react'
import  { BsFileEarmarkPdfFill }from "react-icons/bs"
import jsPDF from 'jspdf';
import  { FaFilter }from "react-icons/fa"
import 'jspdf-autotable';

const History = () => {
  const[history,sethistory]=useState([])
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  // const [datahistory,   setdatahistory] = useState('');


  let today=new Date();
let dd=today.getDate();
let mm=today.getMonth()+1;
let yy=today.getFullYear()
let cdate=yy+"-"+mm+"-"+dd;

  useEffect(()=>{
    run_history()
    // run_history1()
  },[])

  const run_history=()=>{
    axios.get("http://localhost:3001/history")
    .then(response=>{
      console.log(response.data)
      sethistory(response.data)
      setFilteredHistory(response.data);

    })
    .catch(error => {
      console.error(error);
    });
  }

  // const downloadPdf = (invoice_no) => {
  //   const pdf = new jsPDF();
  //   alert(invoice_no)
  //   pdf.text(20, 20, `Name: ${datahistory.client_name}`);
  //   pdf.text(20, 30, `total_qty: ${datahistory.total_qty}`);
  //   pdf.text(20, 40, `invoice_no: ${datahistory.invoice_no}`);
  //   pdf.text(20, 50, `grand_total: ${datahistory.grand_total}`);
  //   pdf.text(20, 60, `grand_total: ${datahistory.itemName}`);
  //   pdf.text(20, 70, `grand_total: ${datahistory.qty}`);
  //   pdf.text(20, 80, `grand_total: ${datahistory.unitPrice}`);
  //   // pdf.text(20, 30, `Time: ${rowData.time}`); // Replace with the correct time value
  //   // Add other row data as needed
  //   pdf.save('row_data.pdf');

  //   axios.get('http://localhost:3001/historydata')
  //   .then(response=>{
  //     console.log(response.data[0]['id'])
  //     setdatahistory(response.data)

  //   }).catch(err=>{
  //     console.log(err)
  //   })
  // };

  const downloadPdf = (invoice_no) => {
    axios.get(`http://localhost:3001/historydata?invoice_no=${invoice_no}`)
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
  
  

        pdf.save('row_data.pdf');
      })
      .catch(err => {
        console.log(err);
      });
  };

  // ... 
  const handleFilterChange = (event) => {
    const searchText = event.target.value.toLowerCase();
    setFilterText(searchText);
  
    const filteredData = history.filter((item) =>
      item.client_name.toLowerCase().includes(searchText) &&
      (!selectedMonth ||
        new Date(item.date).getMonth() + 1 === parseInt(selectedMonth))
    );
    setFilteredHistory(filteredData);
  };
  const handleMonthFilterChange = (event) => {
    const selectedMonth = event.target.value;
    setSelectedMonth(selectedMonth);

    if (selectedMonth === '') {
      setFilteredHistory(history);
    } else {
      const filteredData = history.filter((item) => {
        const itemMonth = new Date(item.date).getMonth() + 1; // Months are 0-indexed in JavaScript Date
        return (
          itemMonth.toString().padStart(2, '0') === selectedMonth &&
          item.client_name.toLowerCase().includes(filterText.toLowerCase())
        );
      });
      setFilteredHistory(filteredData);
    }
  };

  return (
    <main>
      <div style={{ padding: '5% 5% 5% 5%' ,display:'flex'  }}>
        <div>
        <input className='form-control rounded'  value={filterText} onChange={handleFilterChange}  placeholder='Search by name...'
         style={{ width: '70vw' }} />
        </div>
            <select style={{border:'none'}}  value={selectedMonth}  onChange={handleMonthFilterChange} >
              
              <option style={{border:'none'}} value=''>All<FaFilter/></option>
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
            <thead className='text-white' style={{ position: 'sticky', top: 0, backgroundColor: '#2E0D9B', color: 'black' }}>
            
                <th style={{ textAlign: 'end' }}></th>
                <th style={{ textAlign: 'start' }}>Name</th>
                <th style={{ textAlign: 'center' }}>Date</th>
                <th style={{ textAlign: 'center', paddingRight: '5%' }}>Qty</th>
                <th style={{ textAlign: 'center' }}>Invoice No</th>
                <th style={{ textAlign: 'center' }}>Total amount</th>
                <th style={{ textAlign: 'center' }}>pdf</th>
              
            </thead>
            <tbody>
               {
                filteredHistory.map((val,index)=>{

                  //let n=val.date
                  //alert(newdate)

                  //alert(n.getDate());
                  // let mm1=newdate.getMonth()+1;
                  // let yy1=newdate.getFullYear()
                  // let date=yy1+"-"+mm1+"-"+dd1;
                  
                   return(
                     <>
                 <tr key={index} style={{ margin: '1% 0' }}>
                <td style={{ textAlign: 'end' }}>{index + 1}</td>
                <td style={{ textAlign: 'start' }}>{val.client_name}</td>
                <td style={{ textAlign: 'center' }}>{val.date}</td>
                <td style={{ textAlign: 'center', paddingRight: '5%' }}>{val.total_qty}</td>
                <td style={{ textAlign: 'center' }}>{val.invoice_no}</td>
                <td style={{ textAlign: 'center' }}>{val.grand_total}</td>
                <td style={{ textAlign: 'center' }}><BsFileEarmarkPdfFill color='#2E0D9B' onClick={() => downloadPdf(val.invoice_no)}/></td>
              </tr>
                </>
                  )
                })
               }
            </tbody>
          </table>
        </div>
      </div>
      
    </main>
  )
}

export default History
