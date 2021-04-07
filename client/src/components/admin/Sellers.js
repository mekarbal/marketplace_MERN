import React, { useState, useEffect, Redirect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import CheckIcon from "@material-ui/icons/Check";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";
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

function Sellers() {
  const classes = useStyles();
  let history = useHistory();
  const [sellers, setSellers] = useState([]);
  const [error, setError] = useState("");
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
  let token = localStorage.getItem("adminToken");
  const getAllSellers = async (page) => {
    await axios
      .get(`http://localhost:4000/seller//dataSeller?page=${page}&limit=3`, {
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
        getAllSellers(page);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    if (token) {
      getAllSellers(page);
    } else {
      history.push("/admin/");
    }
  }, [sellers, page]);

  return (
    <div className="container">
      <h1 className="justify-content-center">All Sellers</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table   hover>
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

export default Sellers;
