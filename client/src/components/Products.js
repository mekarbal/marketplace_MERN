import React, { useState, useEffect, Redirect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import jwt from "jwt-decode";
import AddProduct from "./AddProduct";
import Alert from "@material-ui/lab/Alert";
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

function Products({ history }) {
  const [products, setProducts] = useState([]);
  const [err, setErr] = useState("");

  const [page, setPage] = useState(1);
  const classes = useStyles();
  const next = () => {
    setPage(page + 1);
    getAllProducts(page);
  };
  const prev = () => {
    if (page !== 1) {
      setPage(page - 1);
      getAllProducts(page);
    }
  };

  let token = localStorage.getItem("sellerToken");
  const _idSeller = jwt(token)._id;

  const getAllProducts = async (page) => {
    await axios
      .get(
        `http://localhost:4000/product/get/${_idSeller}?page=${page}&limit=2`,
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };
  const deleteProduct = async (id) => {
    await axios
      .delete("http://localhost:4000/product/" + id)
      .then((res) => {
        getAllProducts(page);
        console.log(res);
      })
      .catch((err) => setErr(err.response.data));
  };

  useEffect(() => {
    getAllProducts(page);
    !token && history.push("/seller/");
  }, [products, page, token]);

  return (
    <div className="container mb-5">
      <AddProduct />
      {err && (
        <Alert className="justify-content-center mt-5" variant="success">
          {err}
        </Alert>
      )}
      <h1 className="justify-content-center mt-5">All Products</h1>
      <Table   hover>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => {
            return (
              <tr key={item._id}>
                <td>
                  <img
                    src={`/uploads/${item.picture}`}
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <button
                    type="submit"
                    onClick={() => deleteProduct(item._id)}
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

export default Products;
