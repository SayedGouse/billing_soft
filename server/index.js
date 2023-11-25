const express = require('express')
const app = express()
const mysql =require ('mysql')
const cors = require ('cors')
const nodemailer =require ('nodemailer')


app.use(cors())
app.use(express.json())

const dbcom = mysql.createConnection({
    host:"localhost",
    "user":'root',
    "password":'',
    "database":'billing_software'
})

dbcom.connect(function(err){
    if(err)throw err;
    console.log("database Connected")
})

app.listen(3001, () => {
    console.log("running on port 3001");
});

let today=new Date();
dd=today.getDate();
mm=today.getMonth()+1;
yy=today.getFullYear()
let cdate=yy+"-"+mm+"-"+dd;
// let ctime=today.toLocaleTimeString();


app.post('/signup',(req,res)=>{

    // signupdata=req.body.signupdata
    // fullname=signupdata.fullname
    // dob=signupdata.dob
    // mobile_no=signupdata.mobile_no
    // gender=signupdata.gender
    // email=signupdata.email
    // adhar_card_no=signupdata.adhar_card_no
    // address=signupdata.address
    // password=signupdata.password

    const {fullname,dob, mobile_no, gender, email, adhar_card_no, address, password}=req.body.signupdata
    utype='agent'
    console.log(req.body)
    const sql="insert into sign_up(fullname,dob,mobile_no,gender,email,adhar_card_no,address,password)values(?,?,?,?,?,?,?,?)";
    dbcom.query(sql,[fullname,dob,mobile_no,gender,email,adhar_card_no,address,password],(err,result)=>{
        if(err){
            console.log(err);}
        else{
            dbcom.query("insert into login(email,password,utype)values(?,?,?)",[email,password,utype])
            res.send(result);

        }
    })
})



    app.get('/get_data',(req,res)=>{
        dbcom.query('select * from sign_up',(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        })
    })

    app.get('/editdata',(req,res)=>{
        dbcom.query('select * from sign_up',(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        })
    })

    app.delete("/deleteuser/delete/:id",(req,res)=>{
        const id=req.params.id
        dbcom.query('delete from sign_up where id=?',id,(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        })

    })

    app.get('/get_edit_data/:id',(req,res)=>{
        const id = req.params.id;
        dbcom.query('select * from sign_up where id = ?',id,(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        })
    })


    app.get('/getclient',(req,res)=>{
    
        dbcom.query('select * from purchase_client',(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        })
    })


    app.get('/getitem',(req,res)=>{
    
        dbcom.query('select * from purchase_item',(err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        })
    })

    app.post('/incash',(req,res)=>{
        const amount = req.body.amount;
        dbcom.query('insert into cash_details(cash)values(?)',[amount],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        }
        )
    })

  
    app.post('/inupi',(req,res)=>{
        const amount=req.body.amount
        dbcom.query('insert into cash_details(upi)values(?)',[amount],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        }
        )
    })

    app.post('/afteredit/:id',(req,res)=>{
        const id=req.params.id;
        const { fullname,dob, mobile_no,gender, email, adhar_card_no,address,password}=req.body;
        console.log(req.body)
        const sql="update sign_up set fullname=?, dob=?, mobile_no=? ,gender=?, email=?, adhar_card_no=? , address=? , password=? where id =?";
        const value= [
            fullname,
            dob,
            mobile_no,
            gender, 
            email, 
            adhar_card_no,
            address,
            password,
            id
        ]

        dbcom.query(sql, value,(err,result)=>{
            if(err){
                console.log(err)
            }
            else{
                res.send(result)
            }
        })
    })


    app.post('/purchasedetails',(req,res)=>{
        const rows=req.body.row
    

        const sql='insert into purchase_details(party_name, item_name, qauntity, amount)values ?';
        const value=rows.map(row => [row.party_name, row.item_name, row.qauntity, row.amount]);
        
        dbcom.query(sql,[value],(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        }
        )
    })

    app.get('/getdata',(req,res)=>{
        console.log("expense")
        dbcom.query('select * from expense',(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
                console.log(result)
            }
        })
    })

   app.post('/expense',(req,res)=>{
    const {date, discription, amount} =req.body.data
    const selectedCategory=req.body.selectedCategory


    const sql="insert into expense(date,discription,category,amount)values(?,?,?,?)";
    const value=[date, discription,selectedCategory, amount]

    dbcom.query(sql,value,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })

   })


    app.post("/clientdata",(req,res)=>{
        const {gst_number,client_name,address}=req.body.client_data
         billData = req.body.billdata;
         invoice= req.body.invoice
        // client_data=req.body.client_data
        // gst_number=client_data.gst_number
        // client_name=client_data.client_name
        // address=client_data.address
          finalAmount=req.body. finalAmount;
         finalgst=req.body.finalgst;
         finaldiscount=req.body.finaldiscount
         finalqty=req.body.finalqty
         paymentData= req.body.paymentData
         creditPaymentAmount=req.body.creditPaymentAmount
         balance=req.body.balance
        
         

        console.log(req.body)
        const sql="insert into client_data(gst_number,client_name,address,invoice_no,grand_total,total_qty,date)values(?,?,?,?,?,?,?)";
        const value=[gst_number,client_name,address,invoice,finalAmount,finalqty, cdate]

        dbcom.query(sql,value,(err,result)=>{
            if(err){
                console.log(err)
            }else{

                if(paymentData.cash){
                    dbcom.query("insert into cash_details(cash,invoice_no)values(?,?)",[finalAmount,invoice])
                } else if (paymentData.upi){
                    dbcom.query("insert into cash_details(upi,invoice_no)values(?,?)",[finalAmount,invoice])
                }

                //dbcom.query("insert into bill_details(itemName,qty, unitPrice, total)values(?,?,?,?)",billData.map(row => [row.itemName, row.qty, row.unitPrice, row.total]))
                const sql1 = "INSERT INTO bill_details (itemName, qty, unitPrice, total,invoice_no) VALUES ?";
                const values = billData.map(row => [row.itemName, row.qty, row.unitPrice, row.total,invoice]);

                dbcom.query(sql1, [values]);

                dbcom.query("insert into total_detail(total_amount,finalgst,discount,total_qty,invoice_no)values(?,?,?,?,?)",
                [finalAmount,finalgst,finaldiscount,finalqty,invoice]);

                if(paymentData.credit){
                    dbcom.query("insert into credit(client_name,invoice_no,created,due_date,finalAmount,balance)values(?,?,?,?,?,?)",
                [client_name,invoice,cdate,cdate,finalAmount,balance]);
                }
               

                
                // dbcom.query("insert into client_data(invoice_no)values(?)",[invoice])

                // dbcom.query('insert into cash_details (cash,upi,invoice_no) values(?,?,?)',[finalAmount,invoice])
                // dbcom.query('insert into cash_details (upi,invoice_no) values(?,?)',[finalAmount,invoice])

               
                res.send(result)
            }
        })  
    })

    app.post("/login",(req,res)=>{
        // logdata =req.body.logindata
        // email=logdata.email
        // password=logdata.password
    
        const {email,password}=req.body.logindata
        dbcom.query("Select * from login where email =? And password =?",[email,password],
        (err,result)=>{
            if(err){
                console.log(err)
            } else{
                const otp=Math.floor(Math.random()*(9999 - 1000 + 1) + 1000)
        const {email} =req.body.logindata
        console.log(email)
         dbcom.query("select * from login where email = ?",[email],(err,result)=>{
             if(err)
             {console.log(err)}
             else
             {
                let transporter = nodemailer.createTransport({
                    host:"smtp.gmail.com",
                    port:587,
                    auth:{
                        user:"sayedgouse1995@gmail.com",
                        pass:"uesivmekddgafywg"
                    }
                });
            
                let info =transporter.sendMail({
                    from:'"salman"<sayedgouse1995@gmail.com>',
                    // to:username,
                    to:"sayedgouse1995@gmail.com",
                    subject:"One Time Password",
                    html:"Your OTP :" + [otp],
                    //html:"<b>Food Order System</b>"+[otp],
                 }); 
                dbcom.query("insert into otp(otp,status)values(?,?)",[otp,'active'])
    
                }
         });

                
                res.send(result)
            }
           })
        })

    app.get('/sendmail/',async(req,res)=>{
        let testAccount= await nodemailer.createTestAccount();
        //connect with email
        let transporter = await nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            auth:{
                user:"sayedgouse1995@gmail.com",
                pass:"uesivmekddgafywg"
            }
        });
    
        let info = await transporter.sendMail({
            from:'"salman"<sayedgouse1995@gmail.com>',
            to:"salmapeerzade07@gmail.com",
            subject:"Hello Kabir",
            text:"Hello kabir sing",
            html:"<b>Hello habibi</b>",
         });
         console.log("Message sent :%s",info.messageId);
         res.json(info);
     })
    
     app.post('/forgotpass',(req,res)=> {
        const otp=Math.floor(Math.random()*(9999 - 1000 + 1) + 1000)
        username=req.body.email
        console.log(username)
         dbcom.query("select * from login where email = ?",[username],(err,result)=>{
             if(err)
             {console.log(err)}
             else
             {
                let transporter = nodemailer.createTransport({
                    host:"smtp.gmail.com",
                    port:587,
                    auth:{
                        user:"sayedgouse1995@gmail.com",
                        pass:"uesivmekddgafywg"
                    }
                });
            
                let info =transporter.sendMail({
                    from:'"salman"<sayedgouse1995@gmail.com>',
                    // to:username,
                    to:"sayedgouse1995@gmail.com",
                    subject:"One Time Password",
                    html:"Your OTP :" + [otp],
                    //html:"<b>Food Order System</b>"+[otp],
                 }); 
                dbcom.query("insert into otp(otp,status)values(?,?)",[otp,'active'])
    
                res.send(result);}
         });
     });
    
     // Otp Verification
    app.post('/otp',(req,res) => {
        otp=req.body.otp
        console.log(otp)
        dbcom.query("SELECT * from otp where otp =?",[otp],
        (err,result)=> {
            if(err){
                console.log(err);}
            else{
                
               res.send(result); }     
        }
        );
    });
    

    app.post('/resetpass',(req,res) => {
        newpass=req.body.newpass
        confirmpass=req.body.confirmpass
        uid=req.body.uid
    
            dbcom.query("update login set password=? where email =?",[newpass,uid],
        (err,result)=> {
            if(err){
                console.log(err);}
            else{
               res.send(result);
               console.log(result)
             }     
        }
        ); 
       
    });


    app.post('/clientpurchase',(req,res) => {
        purchaseclient=req.body.purchaseclient
        name= purchaseclient.name
        address= purchaseclient.address
        city= purchaseclient.city
        state= purchaseclient.state
        mobile_number= purchaseclient.mobile_number
        gst_no= purchaseclient.gst_no
        // const {name,address,city,state,mobile_number,gst_no}=req.body.purchaseclient
       
    
            dbcom.query('insert into purchase_client(name,address,city,state,mobile_number,gst_no)values(?,?,?,?,?,?)',
            [name,address,city,state,mobile_number,gst_no],
        (err,result)=> {
            if(err){
                console.log(err);}
            else{
               res.send(result);
               console.log(result)
             }     
        }
        ); 
       
    });


    app.post('/itempurchase',(req,res) => {
        
         const {item_name,gst_no}=req.body.purchaseitem
       
    
            dbcom.query('insert into purchase_item(item_name,gst_no)values(?,?)',
            [item_name,gst_no],
        (err,result)=> {
            if(err){
                console.log(err);}
            else{
               res.send(result);
               console.log(result)
             }     
        }
        ); 
       
    });


    app.post('/credit',(req,res) => {
        
        const {amount}=req.body.formdata
      
   
           dbcom.query('insert into purchase_item(item_name,gst_no)values(?,?)',
           [item_name,gst_no],
       (err,result)=> {
           if(err){
               console.log(err);}
           else{
              res.send(result);
              console.log(result)
            }     
       }
       ); 
      
   });


   

    app.get('/invoice', (req, res) => {
        console.log("Received request for /invoice"); // Debugging line
        dbcom.query("SELECT MAX(invoice_no) + 1 AS nextInvoice FROM client_data", (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json({ error: 'Failed to generate invoice number' });
          } else {
            const nextInvoice = result[0].nextInvoice || 1000; // Default to 1000
            console.log("Generated invoice number:", nextInvoice); // Debugging line
            res.json({ invoice_no: nextInvoice });
          }
        });
      });


      app.get('/history',(req,res)=>{
            const query=("select * from client_data")
        dbcom.query(query,(err,result)=>{
            if(err){
                console.log(err)
            }else{
                res.send(result)
            }
        })
      })

      app.get('/credit',(req,res)=>{
        const query=("select * from credit")
    dbcom.query(query,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
  })

//   app.get('/cash', (req, res) => {
//     const query = 'SELECT * FROM cash_details';
//     dbcom.query(query, (err, result) => {
//       if (err) {
//         console.log(err);
//         res.status(500).json({ error: 'An error occurred while fetching data.' });
//       } else {
//         // Calculate the total number of records
//         const totalRecords = result.length;
  
//         // Filter records for "Cash" payment method
//         const cashRecords = result.filter((record) => record.paymentmethod === 'cash');
//         const totalCash = cashRecords.length;
  
//         // Filter records for "UPI" payment method
//         const upiRecords = result.filter((record) => record.paymentmethod === 'upi');
//         const totalUpi = upiRecords.length;
  
//         // Send the data and totals to the client
//         res.json({ data: result, totalRecords, totalCash, totalUpi });
//       }
//     });
//   });

app.get('/cash', (req, res) => {
    const cashQuery = 'SELECT  SUM(cash) AS totalCash FROM cash_details';
    const upiQuery = 'SELECT  SUM(upi) AS totalUpi FROM cash_details';
    const creditQuery = 'SELECT  SUM(balance) AS totalbalance FROM credit';

    // Create an object to store the results
    const resultObj = {};

    // Query the database for total cash amount
    dbcom.query(cashQuery, (err, cashResult) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: 'An error occurred while fetching data.' });
        } else {
            // Get the total cash amount from the result
            resultObj.totalCash = cashResult.length > 0 ? cashResult[0].totalCash : 0;

            // Query the database for total UPI amount
            dbcom.query(upiQuery, (err, upiResult) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ error: 'An error occurred while fetching data.' });
                } else {
                    // Get the total UPI amount from the result
                    resultObj.totalUpi = upiResult.length > 0 ? upiResult[0].totalUpi : 0;

                    // Query the database for total credit balance
                    dbcom.query(creditQuery, (err, creditResult) => {
                        if (err) {
                            console.log(err);
                            res.status(500).json({ error: 'An error occurred while fetching data.' });
                        } else {
                            // Get the total credit balance from the result
                            resultObj.totalbalance = creditResult.length > 0 ? creditResult[0].totalbalance : 0;

                            // Send the results to the client
                            res.json(resultObj);
                        }
                    });
                }
            });
        }
    });
});


  app.post('/balance',(req,res)=>{
    const { amount, invoice_no } = req.body;
    formdata=req.body.formdata
    paymentmethod=formdata.paymentmethod.toLowerCase();
    console.log(invoice_no)
    const query=("UPDATE credit Set balance=balance-? WHERE invoice_no = ?")
    value =[amount, invoice_no]
dbcom.query(query,value,(err,result)=>{
    if(err){
        console.log(err)
    }else{


        if(paymentmethod==='cash'){
            dbcom.query('insert into cash_details(cash, invoice_no)values(?,?)', [amount,invoice_no])
            if(err){
                console.log(err)
            }
        }else if(paymentmethod ==='upi'){
            dbcom.query('insert into cash_details(upi, invoice_no)values(?,?)', [amount,invoice_no])

            if(err){
                console.log(err)
            }
        }
        console.log(result)
        res.send(result)
    }
})
})




  
      app.get('/historydata',(req,res)=>{
        const invoice_no = req.query.invoice_no; // Get the invoice_no from the query parameter
        const query = `
    SELECT bd.*, cd.client_name, cd.address, td.total_qty, td.total_amount, td.finalgst, td.invoice_no, td.discount
    FROM bill_details AS bd
    JOIN client_data AS cd ON bd.invoice_no = cd.invoice_no
    JOIN total_detail AS td ON bd.invoice_no = td.invoice_no
    WHERE bd.invoice_no = ?`; // Add a WHERE clause to filter by invoice_no
    dbcom.query(query, [invoice_no], (err, result) => {
        if (err) {
            console.log(err)
        }else{
            res.send(result)
        }
    })
  })


  app.get('/creditdata',(req,res)=>{
    const invoice_no = req.query.invoice_no; // Get the invoice_no from the query parameter
    const query = `
SELECT bd.*, cd.client_name, cd.address, td.total_qty, td.total_amount, td.finalgst, td.invoice_no, td.discount ,cr.balance
FROM bill_details AS bd
JOIN client_data AS cd ON bd.invoice_no = cd.invoice_no
JOIN total_detail AS td ON bd.invoice_no = td.invoice_no
JOIN credit AS cr ON bd.invoice_no = cr.invoice_no
WHERE bd.invoice_no = ?`; // Add a WHERE clause to filter by invoice_no
dbcom.query(query, [invoice_no], (err, result) => {
    if (err) {
        console.log(err)
    }else{
        res.send(result)
    }
})
})


 


    // app.post("/billdata",(req,res)=>{

    //     const billData = req.body.billdata;
    //     console.log(req.body)
    //     const sql="insert into bill_details(itemName,qty, unitPrice, total)values(?,?,?,?)";
    //     const value=billData.map(row => [row.itemName, row.qty, row.unitPrice, row.total]);

    //     dbcom.query(sql,value,(err,result)=>{
    //         if(err){
    //             console.log(err)
    //         }else{
    //             res.send(result)
    //         }
    //     })
    // })


    // app.post("/billdata", (req, res) => {
    //     const billData = req.body.billdata;
      
    //     const sql = "INSERT INTO bill_details (itemName, qty, unitPrice, total) VALUES (?, ?, ?, ?)";
        
    //     const values = billData.map(row => [row.itemName, row.qty, row.unitPrice, row.total]);
      
    //     dbcom.query(sql, [values], (err, result) => {
    //         if(err){
    //             console.log(err)
    //         }else{
    //             res.send(result)
    //         }
    //     });
    //   });