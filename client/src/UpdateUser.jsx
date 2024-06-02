import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import { IoMdArrowRoundBack } from "react-icons/io";

function UpdateUser() {
    const { id } = useParams();
    const [no, setNumber] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:3001/getUser/${id}`)
            .then(result => {
                setNumber(result.data.no || '');
                setName(result.data.name || '');
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    const Update = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`http://localhost:3001/updateUser/${id}`, { no, name });
            setLoading(false);
            navigate('/edit');
        } catch (error) {
            console.log(error);
            setLoading(false);
            alert('Update failed. Please try again.');
        }
    };

    const handleBack = () => {
        setLoading(true);
        navigate('/edit');
    };

    return (
        <div className="d-flex vh-100 bg-dark justify-content-center align-items-center m-3">
            <div className='w-50 bg-primary-subtle rounded p-3'>
                <form onSubmit={Update}>
                    <div className="d-flex justify-content-start align-items-center mb-3">
                        <button type="button" className="btn btn-dark btn-sm p-1 me-2" onClick={handleBack}>
                            <IoMdArrowRoundBack style={{ fontSize: '16px' }} />
                        </button>
                        <h1 className="mb-0"><em><u>Update Message</u></em></h1>
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="no">Emoji</label>
                        <input type="text" placeholder='Enter an emoji' className='form-control'
                            onChange={(e) => setNumber(e.target.value)} value={no} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="name">Message</label>
                        <input type="text" placeholder='Enter Message' className='form-control'
                            onChange={(e) => setName(e.target.value)} value={name} />
                    </div>
                    <br/>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className='btn btn-outline-dark m-1'>Update</button>
                    </div>
                </form>
                {loading && (
                    <div className="d-flex justify-content-center align-items-center position-fixed top-0 start-0 vh-100 vw-100 bg-dark bg-opacity-75">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default UpdateUser;
