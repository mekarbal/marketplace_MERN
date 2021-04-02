import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const BuyerProfile = ({ match }) => {
  const id = match.params.id;
  const [profile, setProfile] = useState({});
  const [error, setError] = useState("");

  useEffect(async () => {
    await axios
      .get("http://localhost:4000/buyer/" + id)
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        setError(err);
      });
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
          <Col md={6}>My Orders</Col>
        </Row>
      </Container>
    </>
  );
};

export default BuyerProfile;
