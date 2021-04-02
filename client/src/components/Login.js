import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import FormContainer from "./FormContainer";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeLogin, setTypeLogin] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (typeLogin === "Seller") {
      console.log("seller");
      await axios
        .post("http://localhost:4000/seller/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response.data.token);
          localStorage.setItem("sellerToken", response.data.token);

          if (response.data.seller.is_password_reset === false) {
            history.push("/seller/" + response.data.seller._id);
          } else {
            history.push("/seller/profile");
          }
        })
        .catch((err) => console.log(err.response.data));
    } else {
      await axios
        .post("http://localhost:4000/buyer/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          console.log(response);
          localStorage.setItem("buyerToken", response.data);
          history.push("/user/" + response.data._id);
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
              label="Seller"
              id="seller"
              name="seller"
              value="Seller"
              onChange={(e) => setTypeLogin(e.target.value)}
            ></Form.Check>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col>
            <Form.Check
              type="radio"
              label="Buyer"
              id="buyer"
              name="buyer"
              value="Buyer"
              onChange={(e) => setTypeLogin(e.target.value)}
            ></Form.Check>
          </Col>
        </FormGroup>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
        <Link to="/regiter" className="btn btn-primary ml-5">
          Register
        </Link>
      </Form>
    </FormContainer>
  );
};

export default Login;
