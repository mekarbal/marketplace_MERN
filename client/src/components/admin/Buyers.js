import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
function Buyers() {
  let history = useHistory();
  const [buyers, setBuyers] = useState([]);
  const [error, setError] = useState("");
  let token = localStorage.getItem("adminToken");
  const getAllBuyers = async () => {
    await axios
      .get("http://localhost:4000/buyer", {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {
        setBuyers(res.data);
      })
      .catch((err) => setError(err));
  };
  const deleteBuyer = async (id) => {
    console.log(id);

    await axios
      .delete("http://localhost:4000/buyer/" + id, {
        headers: {
          "auth-token": token,
        },
      })
      .then(() => {
        getAllBuyers();
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    getAllBuyers();
  }, [buyers]);

  return (
    <div className="container">
      <h1 className="justify-content-center">All Buyers</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Buyer Name</th>
            <th>Buyer Email</th>
            <th>Buyer Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {buyers.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.full_name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <button
                    type="submit"
                    onClick={() => deleteBuyer(item._id)}
                    className="btn btn-outline-danger mr-2"
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Buyers;
