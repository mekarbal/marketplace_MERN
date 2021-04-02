import React, { useEffect, useState } from "react";
import jwt from "jwt-decode";
import { Card, Col, Row, Button } from "react-bootstrap";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

const SellerInfo = () => {
  const [seller, setSeller] = useState({});
  const sellerToken = localStorage.getItem("sellerToken");
  const _idSeller = jwt(sellerToken)._id;

  const getSellerById = async (id) => {
    await axios
      .get("http://localhost:4000/seller/" + id)
      .then((response) => {
        setSeller(response.data);
      })
      .catch((err) => console.log(err.response.data));
  };

  useEffect(() => {
    getSellerById(_idSeller);
  }, []);

  const styles = {
    name: {
      color: "white",
    },
    p: {
      color: "white",
    },
  };
  return (
    <Row className="justify-content-center mb-5">
      <div class="jumbotron" style={{ width: "40%" }}>
        <h1 class="display-3" style={styles.name}>
          {seller.full_name}
        </h1>
        <hr class="my-4" />
        <p class="lead" style={styles.p}>
          Email: {seller.email}
        </p>
        <hr class="my-4" />
        <p class="lead" style={styles.p}>
          Type : {seller.type}
        </p>
        <hr class="my-4" />
        <p class="lead" style={styles.p}>
          Type : {seller.phone}
        </p>
        <hr class="my-4" />
        <p class="lead" style={styles.p}>
          Address : {seller.address}
        </p>
        <hr class="my-4" />
        <p class="lead" style={styles.p}>
          Number Products : {seller.productsCount}
        </p>
        <hr class="my-4" />
        <p class="lead" style={styles.p}>
          Turn Over : {seller.turnOver}
        </p>
      </div>
    </Row>
  );
};

export default SellerInfo;
