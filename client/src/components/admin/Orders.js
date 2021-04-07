import React, { useState, useEffect, Redirect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import CheckIcon from "@material-ui/icons/Check";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { IconButton, makeStyles } from "@material-ui/core";
import { toast } from "react-toastify";

toast.configure();
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "35ch",
    },
  },
}));

function Orders() {
  const classes = useStyles();
  let history = useHistory();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const next = () => {
    setPage(page + 1);
    getAllOrders(page);
  };
  const prev = () => {
    if (page !== 1) {
      setPage(page - 1);
      getAllOrders(page);
    }
  };
  let token = localStorage.getItem("adminToken");
  const getAllOrders = async (page) => {
    await axios
      .get(`http://localhost:4000/order`, {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => toast.error(err));
  };
  const validOrder = async (id) => {
    await axios
      .patch(
        "http://localhost:4000/order/" + id,
        {},
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then(() => {
        getAllOrders(page);
        toast.success("Order Delivred SuccessFully");
      })
      .catch((err) => toast.error(err));
  };

  useEffect(() => {
    if (token) {
      getAllOrders(page);
    } else {
      history.push("/admin/login");
    }
  }, [orders, page]);

  return (
    <div className="container">
      <h1 className="justify-content-center">All Orders</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table hover>
        <thead>
          <tr>
            <th> Product</th>
            <th> Name</th>
            <th> Phone</th>
            <th> Address</th>
            <th> City</th>
            <th> Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.product[0].name}</td>
                <td>{item.full_name}</td>
                <td>{item.address}</td>
                <td>{item.phone}</td>
                <td>{item.city}</td>
                <td>{item.country}</td>

                {item.isLivred === false ? (
                  <td>
                    <button
                      type="submit"
                      onClick={() => validOrder(item._id)}
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

export default Orders;
