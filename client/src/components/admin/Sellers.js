import React, { useState, useEffect, Redirect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import CheckIcon from "@material-ui/icons/Check";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
function Sellers() {
  let history= useHistory();
  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState("");
  let token = localStorage.getItem("adminToken");
  const getAllSellers = async () => {
    await axios
      .get("http://localhost:4000/seller", {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {
        setSellers(res.data);
      })
      .catch((err) => setError(err));
  };
  const validSeller = async (id) => {
    console.log(id);

    await axios
      .patch(
        "http://localhost:4000/seller/valid/" + id,
        {},
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then(() => {
        getAllSellers();
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    if (token) {
      getAllSellers();
    } else {
      history.push("/admin/");
    }
  }, [sellers]);

  return (
    <div className="container">
      <h1 className="justify-content-center">All Sellers</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Seller Name</th>
            <th>Seller Email</th>
            <th>Seller Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.full_name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                {item.isValid === false ? (
                  <td>
                    <button
                      type="submit"
                      onClick={() => validSeller(item._id)}
                      className="btn btn-outline-warning mr-2"
                    >
                      <CheckIcon />
                    </button>
                  </td>
                ) : (
                  <td>
                    <button
                      type="submit"
                      className="btn btn-outline-success mr-2"
                      disabled
                    >
                      <CheckIcon />
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Sellers;
