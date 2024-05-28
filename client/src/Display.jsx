import axios from "axios";
import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { TbEdit } from "react-icons/tb";

function Display ()
{
    const [users, setUsers] = useState([])

    useEffect(()=>{
        axios.get('https://anonymous-feedback-app.onrender.com')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))

    }, [])

    

     return (
        <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
            <div className='w-50 bg-primary-subtle rounded p-4'>
                <h3 className="text-dark p-1"><em><u>Anonymous Message</u></em></h3><br/>
                <Link to="/edit" className='btn btn-dark p-2'>Edit Messages <TbEdit /></Link><br/><br/>
                
                <div className="table-responsive">
                <table className="table table-primary table-hover">
                    <thead>
                        <tr className="text-center">
                            <th>Serial No.</th>
                            <th >Message</th>
                          
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        
                        {
                            users.map((user) =>{
                               return <tr key={user._id}>
                                    <td><b>{user.no}</b></td>
                                    <td><em><b>{user.name}</b></em></td>
                                </tr>
                            })
                        }
                        
                    </tbody>
                </table>
                </div>
            </div>
        
        </div>
    )
}

export default Display;