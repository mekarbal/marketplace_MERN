import { Container, FormGroup } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import PayWithPaypal from "./PayWithPaypal";
import { toast } from "react-toastify";

toast.configure();
const ProductScreen = ({ match, history }) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDiv, setShowDiv] = useState(false);
  const [showPayPalButton, setShowPayPalButton] = useState(false);
  const [product, setProduct] = useState({});
  const [full_name, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [curr, setCurr] = useState("");
  const [checkoutAddress, setCheckoutAddress] = useState({});
  const currency = localStorage.getItem("currency");

  const token = localStorage.getItem("buyerToken");

  let dataAdd = {
    phone: phone,
    address: address,
    country: country,
    city: city,
    full_name: full_name,
    totalPrice: product.price,
    id_product: product._id,
    id_seller: product.id_seller,
  };
  const getProductById = async (id) => {
    await axios
      .get("http://localhost:4000/product/" + id)
      .then((res) => {
        setLoading(true);
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => setError(err.response.data));
  };

  const onChange = (e) => {
    localStorage.setItem("currency", e.target.value);
    history.push("/product/" + match.params.id);
  };

  const changeCurrency = async () => {
    console.log(curr);
    axios
      .get(
        "http://data.fixer.io/api/latest?access_key=1089b7408c1b3b08aa6a68a958d7ed22"
      )
      .then((response) => {
        const data = response.data.rates;
        if (currency) {
          var to = data[currency];
          setCurr(to);
        } else {
          var to = data.EUR;
          setCurr(to);
        }
      })
      .catch((err) => console.log(err));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(phone, address, country, city, full_name);
    if (
      phone === "" ||
      address === "" ||
      country === "" ||
      city === "" ||
      full_name === ""
    ) {
      toast.error("all fields are required");
    } else {
      localStorage.setItem("addressOrder", JSON.stringify(dataAdd));
      setShowPayPalButton(true);
    }
  };

  const createOrder = async () => {
    await axios
      .post(
        "http://localhost:4000/order/",
        {
          phone: phone,
          address: address,
          country: country,
          city: city,
          full_name: full_name,
          totalPrice: product.price,
          id_product: product._id,
          id_seller: product.id_seller,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const data = () => {
    setShowDiv(!showDiv);
  };
  useEffect(() => {
    getProductById(match.params.id);
    setCheckoutAddress(localStorage.getItem("addressOrder"));
    changeCurrency();
  }, [currency]);
  return (
    <Container>
      {loading ? (
        <h1>Loading........</h1>
      ) : error ? (
        <h1>{error}</h1>
      ) : (
        <Row className="mt-5">
          <Col md={6}>
            <Image
              src={"/uploads/" + product.picture}
              alt={product.name}
              fluid
            />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                Price : {Number(product.price * curr).toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>
                Description :{product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup.Item>
                <Row>
                  <Form.Control as="select" onChange={onChange}>
                    <option value="USD" selected>
                      USD
                    </option>
                    <option value="MAD">MAD</option>
                  </Form.Control>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Price :</Col>
                  <Col>
                    <strong>{Number(product.price * curr).toFixed(2)}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={!token || product.isBuyed}
                  onClick={data}
                >
                  Buy
                </Button>
              </ListGroup.Item>
            </Card>
          </Col>
        </Row>
      )}

      {showDiv && (
        <div className="mt-5">
          <Row>
            <Col md={6}>
              <Form onSubmit={submitHandler}>
                <FormGroup>
                  <label>Full Name</label>
                  <input
                    type="text"
                    className="from-control"
                    name="full_name"
                    placeholder="Enter Name"
                    value={full_name}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Phone</label>
                  <input
                    type="text"
                    className="from-control"
                    name="phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Address</label>
                  <input
                    type="text"
                    className="from-control"
                    name="address"
                    placeholder="Enter address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label>Country</label>
                  <input
                    type="text"
                    className="from-control"
                    name="country"
                    placeholder="Enter Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label>City</label>
                  <input
                    type="text"
                    className="from-control"
                    name="City"
                    placeholder="Enter City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Button type="submit" variant="primary" className="mt-3">
                    Place Order
                  </Button>
                </FormGroup>
                <FormGroup>
                  {showPayPalButton && (
                    <PayWithPaypal
                      checkoutAddress={checkoutAddress}
                      createOrder={createOrder}
                      id={match.params.id}
                    />
                  )}
                </FormGroup>
              </Form>
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default ProductScreen;
