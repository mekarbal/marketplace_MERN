import React, { useEffect, useState } from "react";
import AdsCarousel from "./AdsCarousel";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { Container, IconButton, makeStyles } from "@material-ui/core";
import Product from "./Product";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "35ch",
    },
  },
}));

const Home = () => {
  const classes = useStyles();
  const [ads, setAds] = useState([]);
  const [err, setErr] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const next = () => {
    setPage(page + 1);
    getAllProducts(page);
  };
  const prev = () => {
    if (page !== 1) {
      setPage(page - 1);
      getAllProducts(page);
    }
  };
  const getAllAds = async () => {
    await axios
      .get("http://localhost:4000/ads")
      .then((res) => setAds(res.data))
      .catch((err) => setErr(err.response.data));
  };

  const getAllProducts = async (page) => {
    await axios
      .get(`http://localhost:4000/product/dataPr/all?page=${page}&limit=8`)
      .then((res) => setProducts(res.data))
      .catch((err) => setErr(err.response.data));
  };

  useEffect(() => {
    getAllAds();
    getAllProducts(page);
  }, [page]);

  return (
    <>
      <Container className="mt-5">
        <div className="justify-content-center ">
          <AdsCarousel ads={ads} />
        </div>
        <h1 className="mt-5">Latest Products</h1>
        <Row className="mt-5">
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        <div className="pagination">
          <IconButton
            aria-label="delete"
            className={classes.margin}
            size="small"
            onClick={prev}
          >
            <ArrowBackIosIcon fontSize="inherit" />
          </IconButton>
          <p>Page : {page}</p>
          <IconButton
            aria-label="delete"
            className={classes.margin}
            size="small"
            onClick={next}
          >
            <ArrowForwardIosIcon fontSize="inherit" />
          </IconButton>
        </div>
      </Container>
    </>
  );
};

export default Home;
