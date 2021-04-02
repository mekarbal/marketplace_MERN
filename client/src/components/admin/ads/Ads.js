import React, { useState, useEffect, Redirect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import CheckIcon from "@material-ui/icons/Check";
import Alert from "@material-ui/lab/Alert";
import AddAds from "./AddAds";
function Ads({ history }) {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState("");
  let token = localStorage.getItem("adminToken");

  const getAllAds = async () => {
    await axios
      .get("http://localhost:4000/ads", {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {
        setAds(res.data);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    getAllAds();
    !token && history.push("/admin/");

  }, [ads, token]);

  return (
    <div className="container mb-5">
      <AddAds />
      <h1 className="justify-content-center mt-5">All Ads</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Ads Price</th>
            <th>Ads Start Date</th>
            <th>Ads End Date</th>
            <th>Ads Image</th>
          </tr>
        </thead>
        <tbody>
          {ads.map((item) => {
            return (
              <tr key={item._id}>
                <td>${item.pricing}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>
                  <img
                    src={`/uploads/${item.picture}`}
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Ads;
