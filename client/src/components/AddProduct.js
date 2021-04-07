import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";
import jwt from "jwt-decode";
import { toast } from "react-toastify";

toast.configure();
const AddProduct = () => {
  const [price, setPrice] = useState("");
  const [productName, setProductName] = useState("");
  const [picture, setPicture] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [err, setErr] = useState("");
  let token = localStorage.getItem("sellerToken");
  const _idSeller = jwt(token)._id;
  const isValid = jwt(token).isValid;
  const getAllCategories = async () => {
    await axios
      .get("http://localhost:4000/category")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => toast.success(err.response.data));
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("picture", picture);
    formData.append("name", productName);
    formData.append("id_category", category);
    formData.append("id_seller", _idSeller);
    formData.append("price", price);
    formData.append("description", description);

    if (isValid) {
      await axios
        .post("http://localhost:4000/product/", formData, {
          headers: {
            "auth-token": token,
          },
        })
        .then((response) => {
          console.log(response);
          setPrice("");
          setDescription("");
          setProductName("");
          setPicture("");
          toast.success(response.data);
        })
        .catch((err) => toast.error(err.response.data));
    } else {
      toast.error("Your Account is Not Valid, An Admin will validate it ASAP ");
    }
  };
  return (
    <>
      <Row className="justify-content-center bordred">
        <Col md={8}>
          <h1>Add Product</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="productName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={productName}
                name="productName"
                onChange={(e) => setProductName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                name="price"
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="stock"></Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                name="description"
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <select
                name="category"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-control"
              >
                <option value="">Choose Category</option>
                {categories.map((cat) => (
                  <option value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </Form.Group>

            <Form.Group controlId="picture">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="picture"
                onChange={(e) => setPicture(e.target.files[0])}
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

export default AddProduct;
