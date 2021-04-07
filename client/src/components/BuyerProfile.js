import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import jwt from "jwt-decode";
import { Table } from "@material-ui/core";
const BuyerProfile = () => {
  const [profile, setProfile] = useState({});
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("buyerToken");
  const _idB = jwt(token)._id;

  const getAllOrders = async (id) => {
    await axios
      .get("http://localhost:4000/order/user/" + id)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  useEffect(async () => {
    await axios
      .get("http://localhost:4000/buyer/" + _idB)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        setError(err);
      });
    await getAllOrders(_idB);
  }, [error, profile]);
  return (
    <>
      <Container>
        {error && <Alert variant="danger">{error}</Alert>}

        <Row className="mt-5">
          <Col md={6}>
            <h1>Buyer Profile</h1>

            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder={profile.full_name}
                  value={profile.full_name}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={profile.address}
                  value={profile.address}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder={profile.email}
                  value={profile.email}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="devise">
                <Form.Label>devise</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={profile.devise}
                  value={profile.devise}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="identity">
                <Form.Label>Identity</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={profile.identity}
                  value={profile.identity}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId="phone">
                <Form.Label>Identity</Form.Label>
                <Form.Control
                  type="number"
                  placeholder={profile.phone}
                  value={profile.phone}
                ></Form.Control>
              </Form.Group>
            </Form>
          </Col>
          <Col md={6}>
            <h1>My Orders</h1>
            <Table hover className="text-center">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>image</th>
                  <th>Is Livred</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item) => {
                  return (
                    <tr key={item._id}>
                      {item.product.map((product) => (
                        <>
                          <td key={product._id}>{product.name}</td>
                          <td>${product.price}</td>
                          <td align="center">
                            <img
                              style={{ height: "40px", width: "40px" }}
                              src={`/uploads/${product.picture[0]}`}
                            />
                          </td>
                        </>
                      ))}
                      {item.isLivred ? <td>Livred</td> : <td>In Progress</td>}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BuyerProfile;
