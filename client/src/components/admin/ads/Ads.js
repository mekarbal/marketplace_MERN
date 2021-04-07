import React, { useState, useEffect, Redirect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import CheckIcon from "@material-ui/icons/Check";
import Alert from "@material-ui/lab/Alert";
import AddAds from "./AddAds";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { IconButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "35ch",
    },
  },
}));

function Ads({ history }) {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const next = () => {
    setPage(page + 1);
    getAllAds(page);
  };
  const prev = () => {
    if (page !== 1) {
      setPage(page - 1);
      getAllAds(page);
    }
  };
  let token = localStorage.getItem("adminToken");

  const getAllAds = async () => {
    await axios
      .get(`http://localhost:4000/ads/dataAds/?page=${page}&limit=3`, {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {
        setAds(res.data);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    getAllAds(page);
    !token && history.push("/admin/");
  }, [ads, page, token]);

  return (
    <div className="container mb-5">
      <AddAds />
      <h1 className="justify-content-center mt-5">All Ads</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Table   hover>
        <thead>
          <tr>
            <th>Ads Price</th>
            <th>Ads Start Date</th>
            <th>Ads End Date</th>
            <th>Ads Image</th>
          </tr>
        </thead>
        <tbody>
          {ads.map((item) => {
            return (
              <tr key={item._id}>
                <td>${item.pricing}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td>
                  <img
                    src={`/uploads/${item.picture}`}
                    style={{ width: "100px", height: "100px" }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <div className="pagination mb-5">
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
    </div>
  );
}

export default Ads;
