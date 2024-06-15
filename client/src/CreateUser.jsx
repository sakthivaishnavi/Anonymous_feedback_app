import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

function CreateUser() {
    const [no, setNumber] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();
        const confirmation = window.confirm('Are you sure you want to send this message?');
        if (confirmation) {
            setLoading(true);
            console.log("Sending data:", { no, name });
            axios.post("https://anonymous-feedback-app.onrender.com/createUser", { no, name })
                .then(result => {
                    console.log("Response received:", result);
                    setLoading(false);
                    navigate('/');
                })
                .catch(err => {
                    console.error("Error occurred:", err);
                    setLoading(false);
                });
        }
    };

    const handleBack = () => {
        setLoading(true);
        navigate('/');
    };

    return (
        <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
            <div className='w-50 bg-primary-subtle rounded p-3'>
                <form onSubmit={Submit}>
                    <div className="d-flex justify-content-start align-items-center mb-3">
                        <button 
                            type="button" 
                            className="btn btn-dark btn-sm p-1 me-2" 
                            onClick={handleBack}
                        >
                            <IoMdArrowRoundBack style={{ fontSize: '16px' }} />
                        </button>
                        <h1 className="mb-0"><em><u>Add Message</u></em></h1>
                    </div>

                    <div className='mb-2'>
                        <label htmlFor="">Emoji</label>
                        <input 
                            type="text" 
                            placeholder='Enter an emoji' 
                            className='form-control'
                            value={no} 
                            required
                            onChange={(e) => setNumber(e.target.value)} 
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Message</label>
                        <input 
                            type="text" 
                            placeholder='Enter Message' 
                            className='form-control'
                            value={name} 
                            required
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <br />
                    <div className="d-flex justify-content-center">
                        <button type="submit" className='btn btn-outline-dark m-1'>Add</button>
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

export default CreateUser;
