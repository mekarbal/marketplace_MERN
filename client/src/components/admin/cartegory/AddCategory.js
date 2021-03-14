import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
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

export default function AddCategory() {
  const classes = useStyles();

  const [category, setCategory] = useState("");
  const [err, setErr] = useState("");
  const [succ, setSucc] = useState("");

  const addCategory = async (e) => {
    e.preventDefault();

    if (category === "") {
      setErr("All fields are required");
      setSucc("");
    } else {
      await axios
        .post("http://localhost:4000/category/", { name: category })
        .then(() => {
          setErr("");
          setSucc("Category added");
          setCategory("");
        })
        .catch((err) => {
          setErr(err);
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

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="category"
            label="Category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            autoComplete="category"
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
            Add Category
          </Button>
        </form>
      </div>
    </Container>
  );
}
