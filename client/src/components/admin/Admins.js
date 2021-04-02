import React, { useState, useEffect, Redirect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import jwt from 'jwt-decode'
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import AddAdmin from "./AddAdmin";
function Admins() {
  let history = useHistory();
  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState("");
  let token = localStorage.getItem("adminToken");
  const isAdmin = jwt(token).isAdmin;
  const getAllSellers = async () => {
    await axios
      .get("http://localhost:4000/admin", {
        headers: {
          "auth-token": !isAdmin,
        },
      })
      .then((res) => {
        setSellers(res.data);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    if (!isAdmin) {
      getAllSellers();
    } else {
      history.push("/admin/");
    }
  }, [sellers]);

  return (
    <div className="container">
        <AddAdmin/>
      <h1 className="justify-content-center">All Admins</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Admin Name</th>
            <th>Admin Email</th>
            <th>Admin Phone</th>
            <th>AdminType</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.full_name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                {item.isAdmin === false ? (
                  <td>Super Admin</td>
                ) : (
                  <td>Simple Admin</td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Admins;
