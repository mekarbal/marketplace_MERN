import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "120px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

toast.configure();
export default function AddProductAuction() {
  const classes = useStyles();
  const db = firebase.firestore();
  const [productName, setProductName] = useState("");
  const [initialPrice, setInitialPrice] = useState(0);
  const [image, setImage] = useState("");

  let token = localStorage.getItem("adminToken");
  const addCategory = async (e) => {
    e.preventDefault();

    if (db) {
      if (productName === "" || initialPrice === 0 || image === "") {
        toast.error("All fields are required");
      } else {
        db.collection("products").add({
          productName: productName,
          image: image,
          price: Number(initialPrice),
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setProductName("");
        setInitialPrice(0);
        setImage("");
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add Product to Auction
        </Typography>

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="productName"
            label="Product Name"
            name="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            autoComplete="productName"
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="image"
            label="Product Image"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            autoComplete="image"
            autoFocus
          />

          <TextField
            type="number"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="initialPrice"
            label="Initial Price"
            name="initialPrice"
            value={initialPrice}
            onChange={(e) => setInitialPrice(e.target.value)}
            autoComplete="initialPrice"
            autoFocus
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e) => addCategory(e)}
            className={classes.submit}
          >
            Add Product
          </Button>
        </form>
      </div>
    </Container>
  );
}
