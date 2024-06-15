import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { toast } from 'react-toastify';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const loginSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://anonymous-feedback-app.onrender.com/login', { email, password });
            console.log(response.data.message);
            toast.dark('Logging in...');
            navigate('/edit');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Network Error');
            }
            console.error(error);
            toast.error(error);
        }
    };

    return (
        <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
            <div className="w-50 bg-primary-subtle rounded p-3">
                <form onSubmit={loginSubmit} className="d-flex flex-column">
                    <div className="d-flex justify-content-start align-items-center mb-3">
                        <button type="button" className="btn btn-dark btn-sm p-1 me-2" onClick={() => navigate('/')}>
                            <IoMdArrowRoundBack style={{ fontSize: '16px' }} />
                        </button>
                        <h1 className="mb-0"><em><u>Login</u></em></h1>
                    </div>

                    {error && <p className="text-danger text-center">{error}</p>}
                    
                    <div className="mb-3">
                        <input type="email" className="form-control" placeholder="Email" name="email" autoComplete="off"
                            value={email} required onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" placeholder="Password" name="password" autoComplete="off"
                            value={password} required onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className='btn btn-outline-dark m-1'>Login Now!</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
