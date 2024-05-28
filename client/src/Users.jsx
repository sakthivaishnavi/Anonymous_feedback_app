import axios from "axios";
import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { LuSendHorizonal } from "react-icons/lu";
import { FiEdit3 } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";



function Users ()
{
    const [users, setUsers] = useState([])

    useEffect(()=>{
        axios.get('https://anonymous-feedback-app.onrender.com')
        .then(result => setUsers(result.data))
        .catch(err => console.log(err))

    }, [])

    const handleDelete =(id) => {
        axios.delete('https://anonymous-feedback-app.onrender.com/deleteUser/'+id)
        .then(res=> {console.log(res)
           window.location.reload()})
        .catch(errr => console.log(errr))

    }

     return (
        <div className="d-flex vh-100 bg-dark justify-content-center align-items-center m-3">
            <div className='w-50 bg-primary-subtle rounded p-4'>
                <h3 className="text-dark p-1"><em><u>Anonymous Message</u></em></h3><br/>
                <Link to="/create" className='btn btn-dark p-2'>Send Message<LuSendHorizonal /></Link><br/><br/>
                
                <div className="table-responsive">
                <table className="table table-primary table-hover">
                    <thead>
                        <tr className="text-center">
                            <th>Serial No.</th>
                            <th>Message</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        
                        {
                            users.map((user) =>{
                               return <tr key={user._id}>
                                    <td><b>{user.no}</b></td>
                                    <td><em><b>{user.name}</b></em></td>
                                    <td>
                                    <Link to={`/update/${user._id}`} className='btn btn-outline-dark m-1'><em><b>Update<FiEdit3 /></b> </em></Link>
                                    <button className='btn btn-outline-dark m-1'
                                     onClick={(e) => handleDelete(user._id)}><em><b>Delete<BsTrash /></b></em></button>
                                     </td>
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

export default Users;