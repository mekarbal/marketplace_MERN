import React, { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import FormContainer from "./FormContainer";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import BuyerProfile from "./BuyerProfile";

const Register = ({ history }) => {
  const notify = () => {
    toast.success("Check you Email to Sign In", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [identity, setIdentity] = useState("");
  const [typeLogin, setTypeLogin] = useState("");

  const data = {
    full_name,
    email,
    phone,
    password,
    address,
    identity,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (typeLogin === "Seller") {
      await axios
        .post("http://localhost:4000/seller/", data)
        .then((res) => {
          notify();
          localStorage.setItem("sellerToken", res.data.token);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axios
        .post("http://localhost:4000/buyer/", data)
        .then((res) => {
          localStorage.setItem("buyerToken", res.data.token);
          console.log(res);
          history.push("/user/" + res.data._id);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <FormGroup controlId="full_name">
          <FormLabel>Full Name</FormLabel>
          <FormControl
            type="full_name"
            placehoder="Enter Full Name"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="phone">
          <FormLabel>Phone</FormLabel>
          <FormControl
            type="number"
            placehoder="Enter Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></FormControl>
        </FormGroup>

        <FormGroup controlId="address">
          <FormLabel>Address</FormLabel>
          <FormControl
            type="text"
            placehoder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></FormControl>
        </FormGroup>
        <FormGroup controlId="identity">
          <FormLabel>Identity</FormLabel>
          <FormControl
            type="text"
            placehoder="Enter Identy"
            value={identity}
            onChange={(e) => setIdentity(e.target.value)}
          ></FormControl>
        </FormGroup>

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
        </FormGroup>

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
          Register
        </Button>

        <Link to="/login" className="btn btn-primary ml-5">
          Login
        </Link>
      </Form>
    </FormContainer>
  );
};

export default Register;
