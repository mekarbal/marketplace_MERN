import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import jwt from "jwt-decode";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
const SellerStatisctics = () => {
  const [products, setProducts] = useState([]);
  const [turnOver, setTurnOver] = useState(0);
  const [err, setErr] = useState("");

  const sellerToken = localStorage.getItem("sellerToken");
  const _idSeller = jwt(sellerToken)._id;

  const getAllProducts = async (id) => {
    await axios
      .get("http://localhost:4000/product/user/" + id, {
        headers: { "auth-token": sellerToken },
      })
      .then((res) => setProducts(res.data.length))
      .catch((err) => setErr(err.response.data));
  };
  const getTurnOver = async (id) => {
    await axios
      .get("http://localhost:4000/seller/" + id, {
        headers: { "auth-token": sellerToken },
      })
      .then((res) => setTurnOver(res.data.turnOver))
      .catch((err) => setErr(err.response.data));
  };

  useEffect(() => {
    getAllProducts(_idSeller);
    getTurnOver(_idSeller);
  }, []);

  return (
    <Row className="mr-5 justify-content-center">
      {err && <Alert variant="danger">{err}</Alert>}
      <Col md={3}>
        <div class="card border-success mb-3 ">
          <div class="card-header">Products</div>
          <div class="card-body">
            <h4 class="card-title">{products} products</h4>
          </div>
        </div>
      </Col>
      <Col md={3}>
        <div class="card border-danger  mb-3">
          <div class="card-header">Turn Over</div>
          <div class="card-body">
            <h4 class="card-title">${turnOver}</h4>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default SellerStatisctics;
