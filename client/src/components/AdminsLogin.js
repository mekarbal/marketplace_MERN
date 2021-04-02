import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import FormContainer from "./FormContainer";

const AdminsLogin = () => {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeLogin, setTypeLogin] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (typeLogin === "Admin") {
      await axios
        .post("http://localhost:4000/admin/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          localStorage.setItem("adminToken", response.data);
          history.push("/admin/categories");
        })
        .catch((err) => console.log(err));
    } else {
      await axios
        .post("http://localhost:4000/superAdmin/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response);
          localStorage.setItem("superAdminToken", response.data);
          history.push("/admin/categories");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <FormGroup controlId="email">
          <FormLabel>Email Address</FormLabel>
          <FormControl
            type="email"
            placehoder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="password">
          <FormLabel>Password</FormLabel>
          <FormControl
            type="password"
            placehoder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></FormControl>
        </FormGroup>{" "}
        <FormGroup>
          <Col>
            <Form.Check
              type="radio"
              label="Admin"
              id="admin"
              name="admin"
              value="Admin"
              onChange={(e) => setTypeLogin(e.target.value)}
            ></Form.Check>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col>
            <Form.Check
              type="radio"
              label="Super Admin"
              id="superAdmin"
              name="superAdmin"
              value="Super Admin"
              onChange={(e) => setTypeLogin(e.target.value)}
            ></Form.Check>
          </Col>
        </FormGroup>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
    </FormContainer>
  );
};

export default AdminsLogin;
