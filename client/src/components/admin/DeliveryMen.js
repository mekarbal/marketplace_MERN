import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import Alert from "@material-ui/lab/Alert";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { IconButton, makeStyles } from "@material-ui/core";
import AddDeliveryMen from "./AddDeliveryMen";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "35ch",
    },
  },
}));

function DeliveryMen() {
  const [deliveryMen, setDeliveryMen] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const next = () => {
    setPage(page + 1);
    getAllDeliveryMen(page);
  };
  const prev = () => {
    if (page !== 1) {
      setPage(page - 1);
      getAllDeliveryMen(page);
    }
  };
  let token = localStorage.getItem("adminToken");
  const getAllDeliveryMen = async () => {
    await axios
      .get(
        `http://localhost:4000/delivery/dataDelivery/?page=${page}&limit=3`,
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((res) => {
        setDeliveryMen(res.data);
      })
      .catch((err) => setError(err));
  };
  const deleteDeliveryMen = async (id) => {
    await axios
      .delete("http://localhost:4000/delivery/" + id, {
        headers: {
          "auth-token": token,
        },
      })
      .then(() => {
        getAllDeliveryMen(page);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    getAllDeliveryMen(page);
  }, [deliveryMen, page]);

  return (
    <div className="container">
      <AddDeliveryMen />
      <h1 className="justify-content-center">All delivery Men</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table hover>
        <thead>
          <tr>
            <th>Buyer Name</th>
            <th>Buyer Email</th>
            <th>Buyer Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {deliveryMen.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.full_name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <button
                    type="submit"
                    onClick={() => deleteDeliveryMen(item._id)}
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
      <div className="pagination mb-5">
        <IconButton
          aria-label="delete"
          className={classes.margin}
          size="small"
          onClick={prev}
        >
          <ArrowBackIosIcon fontSize="inherit" />
        </IconButton>
        <p>Page : {page}</p>
        <IconButton
          aria-label="delete"
          className={classes.margin}
          size="small"
          onClick={next}
        >
          <ArrowForwardIosIcon fontSize="inherit" />
        </IconButton>
      </div>
    </div>
  );
}

export default DeliveryMen;
