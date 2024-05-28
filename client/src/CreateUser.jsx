import React, { useState } from "react";
import axios from 'axios'
import {useNavigate} from "react-router-dom"

function CreateUser()
{
    const [no, setNumber] = useState()
    const [name, setName] = useState()
    const navigate = useNavigate()

    const Submit = (e) => {
        e.preventDefault();
        axios.post("https://anonymous-feedback-app.onrender.com/createUser", {no, name})
        .then(result => {
            console.log(result)
            navigate('/edit')
        })
        .catch(err => console.log(err))
    }
    
    return(
        <div className="d-flex vh-100 bg-dark justify-content-center align-items-center m-3">
            <div className='w-50 bg-primary-subtle rounded p-3'>
                <form onSubmit={Submit}>
                    <h2><em><u>Add Message</u></em></h2><br/>
                    
                    <div className='mb-2'>
                    <label htmlFor="">Serial Number</label>
                        <input type="number" placeholder='Enter Number' className='form-control'
                        onChange={(e) => setNumber(e.target.value)}/>                                               
                    </div>
                    <div className='mb-2'>
                        <label htmlFor="">Message</label>
                        <input type="text" placeholder='Enter Message' className='form-control'
                        onChange={(e) => setName(e.target.value)}/>
                    </div>
                   <br/>
                    <button type="submit" className='btn btn-outline-dark m-1'>Add</button>
                             </form>
            </div>

        </div>
    )
}

export default CreateUser;