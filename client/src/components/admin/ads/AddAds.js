import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

const AddAds = () => {
  const [pricing, setPricing] = useState("");
  const [picture, setPicture] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const token = localStorage.getItem("adminToken");
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("picture", picture);
    formData.append("pricing", pricing);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);

    console.log(formData.get("picture"));

    await axios
      .post("http://localhost:4000/ads/", formData, {
        headers: {
          "auth-token": token,
        },
      })
      .then((response) => {
        console.log(response);
        console.log("ads added");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Row className="justify-content-center ">
        <Col md={8}>
          <h1>Sign Up</h1>

          <Form onSubmit={submitHandler}>
            <Form.Group controlId="pricing">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={pricing}
                name="pricing"
                onChange={(e) => setPricing(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="picture">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="picture"
                onChange={(e) => setPicture(e.target.files[0])}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                name="startDate"
                type="date"
                placeholder="Enter Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                placeholder="Enter password"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default AddAds;
