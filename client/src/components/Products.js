import React, { useState, useEffect, Redirect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import CheckIcon from "@material-ui/icons/Check";
import Alert from "@material-ui/lab/Alert";
import jwt from "jwt-decode";
import AddProduct from "./AddProduct";
function Products({ history }) {
  const [products, setProducts] = useState([]);
  let token = localStorage.getItem("sellerToken");
  const _idSeller = jwt(token)._id;

  const getAllAds = async () => {
    await axios
      .get("http://localhost:4000/product/user/" + _idSeller, {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllAds();
    !token && history.push("/seller/");
  }, [products, token]);

  return (
    <div className="container mb-5">
      <AddProduct />
      <h1 className="justify-content-center mt-5">All Products</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Category</th>
            <th>Product Image</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>{item.category[0].name}</td>
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

export default Products;
