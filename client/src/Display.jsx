import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LuSendHorizonal } from "react-icons/lu";
import { BiLogInCircle } from "react-icons/bi";

function Display() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001')
            .then(result => setUsers(result.data))
            .catch(err => console.log(err));
    }, []);

    const handleNavigation = (path) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate(path);
        }, 1000); // Simulate loading delay
    };

    return (
        <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
            <div className='w-50 bg-primary-subtle rounded p-4'>
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="text-dark p-1"><em><u>Anonymous Message</u></em></h3>
                    <button onClick={() => handleNavigation('/login')} className='btn btn-dark'>
                        Admin Login <BiLogInCircle />
                    </button>
                </div>
                <br /> <br />
                <div className="d-flex justify-content-center">
                    <button onClick={() => handleNavigation('/create')} className='btn btn-dark p-3'>
                        Send Messages <LuSendHorizonal />
                    </button>
                </div>
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

export default Display;
