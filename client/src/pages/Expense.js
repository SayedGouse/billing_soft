import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';



const Expense = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [data, setData] = useState({ date: '', description: '', category: '', amount: '' });
    const [selectedCategory, setSelectedCategory] = useState('');
    const [expenseData, setExpenseData] = useState([]);

  

    useEffect(() => {
        // Fetch expense data from your server when the component mounts
        axios.get('http://localhost:3001/getdata')
            .then(response => {
                setExpenseData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    // Function to open the modal
    const openModal = () => {
        setModalIsOpen(true);
    };

    // Function to close the modal
    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handlerchange = (e) => {
        const { name, value } = e.target;
        if (name === 'category') {
            setSelectedCategory(value);
        } else {
            setData({ ...data, [name]: value });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/expense', {
            data,
            selectedCategory
        })
        .then(response => {
            console.log(response);
            setModalIsOpen(false);
            window.location.reload();
        })
        .catch(err => {
            console.error(err);
        });
    }

    // let today=new Date();
    // let dd=today.getDate();
    // let mm=today.getMonth()+1;
    // let yy=today.getFullYear()
    // let cdate=yy+"-"+mm+"-"+dd;

    return (
        <main style={{ width: '75vw', padding: '5%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '75vw' }}>
                <div>
                    <h3>Daily Expenses</h3>
                </div>
                <div>
                    <button className='btn btn-outline-warning' onClick={openModal}>Add Expense</button>
                </div>
            </div>
            <table style={{ width: '75vw', margin: '5%' }}>
                <thead>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                </thead>
                <tbody>
                {expenseData.map((expense, index) => (
                        <tr key={index}>
                            <td>{expense.date}</td>
                            <td>{expense.discription}</td>
                            <td>{expense.category}</td>
                            <td>{expense.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

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

                <form onSubmit={handleSubmit}>
                    <div className="mb-1">
                        <label className="form-label fw-bold">Date</label>
                        <input type="date" name='date' className="form-control"  onChange={handlerchange} />
                    </div>
                    <div className="mb-1">
                        <label className="form-label fw-bold">Description</label>
                        <input type="text" name='discription' className="form-control" onChange={handlerchange} />
                    </div>
                    <div className="mb-1">
                        <label className="form-label fw-bold">Category</label>
                        <select name='category' className='form-control' onChange={handlerchange} value={selectedCategory}>
                            <option >Select</option>
                            <option value="Food">Food</option>
                            <option value="transportation">Transportation</option>
                            <option value="utilities">Utilities</option>
                            <option value="Rent">Rent</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="mb-1">
                        <label className="form-label fw-bold">Amount</label>
                        <input type="text" name='amount' className="form-control" onChange={handlerchange} />
                    </div>


                    <div className="text-center m-1" >
                        <button type="submit" className="btn btn-primary m-1">Save</button>
                        <button type="button" className="btn btn-secondary m-1" onClick={closeModal}>Cancel</button>
                    </div>
                </form>
            </Modal>
        </main>
    )
}

export default Expense
