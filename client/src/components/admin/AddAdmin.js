import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import jwt from "jwt-decode";
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

export default function AddAdmin() {
  const classes = useStyles();

  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [err, setErr] = useState("");
  const [succ, setSucc] = useState("");
  let token = localStorage.getItem("adminToken");
  const isAdmin = jwt(token).isAdmin;

  const addCategory = async (e) => {
    e.preventDefault();

    if (
      full_name === "" ||
      email === "" ||
      password === "" ||
      phone === "" ||
      address === ""
    ) {
      setErr("All fields are required");
      setSucc("");
    } else {
      await axios
        .post(
          "http://localhost:4000/admin/",
          {
            full_name,
            email,
            phone,
            address,
            password,
          },
          {
            headers: { "auth-token": !isAdmin },
          }
        )
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          setErr(err.response.data);
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {err && <Alert severity="error">{err}</Alert>}
      {succ && <Alert severity="success">{succ}</Alert>}
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Category
        </Typography>

        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="full_name"
            label="Full Name"
            name="full_name"
            value={full_name}
            onChange={(e) => setFullName(e.target.value)}
            autoComplete="full_name"
            autoFocus
          />
          <TextField
            type="number"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="phone"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="address"
            label="Address"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            autoComplete="address"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            type="email"
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
          />
          <TextField
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="password"
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
            Add Admin
          </Button>
        </form>
      </div>
    </Container>
  );
}
