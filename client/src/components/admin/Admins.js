import React, { useState, useEffect, Redirect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import jwt from "jwt-decode";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
import AddAdmin from "./AddAdmin";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { IconButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "35ch",
    },
  },
}));

function Admins() {
  const classes = useStyles();
  let history = useHistory();
  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState("");
  let token = localStorage.getItem("adminToken");
  const isAdmin = jwt(token).isAdmin;
  const [page, setPage] = useState(1);

  const next = () => {
    setPage(page + 1);
    getAllSellers(page);
  };
  const prev = () => {
    if (page !== 1) {
      setPage(page - 1);
      getAllSellers(page);
    }
  };
  const getAllSellers = async (page) => {
    await axios
      .get(`http://localhost:4000/admin/dataAdmin?page=${page}&limit=3`, {
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
      getAllSellers(page);
    } else {
      history.push("/admin/login");
    }
  }, [sellers, page]);

  return (
    <div className="container">
      <AddAdmin />
      <h1 className="justify-content-center">All Admins</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table  bordeed hover>
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

export default Admins;
