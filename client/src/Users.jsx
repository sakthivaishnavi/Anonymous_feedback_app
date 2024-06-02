import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit3 } from "react-icons/fi";
import { BsTrash } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";
import "../src/styles.css"

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001")
      .then((result) => {
        setUsers(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/deleteUser/" + id)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((errr) => console.log(errr));
  };

  return (
    <div className="d-flex vh-100 bg-dark justify-content-center align-items-center">
      {loading ? (
        <div className="loaderContainer">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="w-50 bg-primary-subtle rounded p-4">
          <div className="d-flex justify-content-start align-items-center mb-3">
            <button
              type="button"
              className="btn btn-dark btn-sm p-1 me-2"
              onClick={() => navigate("/login")}
            >
              <IoMdArrowRoundBack style={{ fontSize: "16px" }} />
            </button>
            <h1 className="mb-0">
              <em>
                <u>Anonymous Message</u>
              </em>
            </h1>
          </div>

          <div className="table-responsive">
            <table className="table table-primary table-hover">
              <thead>
                <tr className="text-center">
                  <th>Emoji</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {users.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>
                        <b>{user.no}</b>
                      </td>
                      <td>
                        <em>
                          <b>{user.name}</b>
                        </em>
                      </td>
                      <td>
                        <Link
                          to={`/update/${user._id}`}
                          className="btn btn-outline-dark m-1"
                        >
                          <em>
                            <b>
                              Update
                              <FiEdit3 />
                            </b>{" "}
                          </em>
                        </Link>
                        <button
                          className="btn btn-outline-dark m-1"
                          onClick={(e) => handleDelete(user._id)}
                        >
                          <em>
                            <b>
                              Delete
                              <BsTrash />
                            </b>
                          </em>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
