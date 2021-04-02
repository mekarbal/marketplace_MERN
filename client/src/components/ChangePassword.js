import { Container } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const ChangePassword = ({ history }) => {
  const [password, setPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [err, setErr] = useState("");
  let token = localStorage.getItem("sellerToken");

  const submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .patch(
        "http://localhost:4000/seller/update",
        { password: password, newPassword: newPassword },
        {
          headers: { "auth-token": token },
        }
      )
      .then(() => {
        history.push("/seller/profile");
      })
      .catch((err) => {
        console.log(err);
        setErr(err.response.data);
      });
  };
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h1>Change Your Password</h1>
          {success && (
            <>
              <Alert variant="success">{success}</Alert>
              <Link to="/seller/profile">
                <Button type="submit" variant="default">
                  Go to Profile
                </Button>
              </Link>
            </>
          )}
          {err && <Alert variant="success">{err}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="password">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="text"
                placeholder={newPassword}
                value={newPassword}
                onChange={(e) => setnewPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
