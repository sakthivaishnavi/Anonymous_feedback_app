import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios'

function UpdateUser() {
    const { id } = useParams();
    const [no, setNumber] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3001/getUser/${id}`)
            .then(result => {
                console.log(result.data);
                setNumber(result.data.no || '');
                setName(result.data.name || '');
                
            })
            .catch(err => console.log(err));
    }, [id]);

    const Update = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/updateUser/${id}`, { no, name});
            navigate('/edit');
        } catch (error) {
            console.log(error);
            alert('Update failed. Please try again.');
        }
    };


    return (
        <div className="d-flex vh-100 bg-dark justify-content-center align-items-center m-3">
            <div className='w-50 bg-primary-subtle rounded p-3'>
                <form onSubmit={Update}>
                    <h2><em><u>Update User</u></em></h2><br/>
                    <div className='mb-2'>
                        <label htmlFor="no">Number</label>
                        <input type="number" placeholder='Enter Number' className='form-control'
                            onChange={(e) => setNumber(e.target.value)} value={no} />

                    </div>
                    <div className='mb-2'>
                        <label htmlFor="name">Message</label>
                        <input type="text" placeholder='Enter Message' className='form-control'
                            onChange={(e) => setName(e.target.value)} value={name} />

                    </div>
                    <br/>
                    <button type="submit" className='btn btn-outline-dark m-1'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateUser;
