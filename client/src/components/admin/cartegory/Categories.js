import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddCategory from "./AddCategory";
import { useHistory } from "react-router-dom";
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

function Categories() {
  const classes = useStyles();
  let history = useHistory();
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);

  const next = () => {
    setPage(page + 1);
    getAllCategories(page);
  };
  const prev = () => {
    if (page !== 1) {
      setPage(page - 1);
      getAllCategories(page);
    }
  };
  let token = localStorage.getItem("adminToken");

  const getAllCategories = async (page) => {
    await axios
      .get(`http://localhost:4000/category/dataCat/?page=${page}&limit=3`, {
        headers: {
          "auth-token": token,
        },
      })
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  };
  const deleteCat = async (id) => {
    console.log(id);

    await axios
      .delete("http://localhost:4000/category/" + id, {
        headers: {
          "auth-token": token,
        },
      })
      .then(() => {
        getAllCategories(page);
      })
      .catch((err) => console.log(err));
  };

  const updateCat = async (id) => {
    console.log(id);
    history.push("/admin/category/" + id, {
      headers: {
        "auth-token": token,
      },
    });
  };

  useEffect(() => {
    if (token) {
      getAllCategories(page);
    } else {
      history.push("/admin/");
    }
  }, [categories, page]);

  return (
    <div className="container">
      <AddCategory />
      <Table bordered hover>
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item) => {
            return (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>
                  <button
                    type="submit"
                    onClick={() => deleteCat(item._id)}
                    className="btn btn-outline-danger mr-2"
                  >
                    <DeleteIcon />
                  </button>
                  <button
                    type="submit"
                    className="btn btn-outline-success "
                    onClick={() => updateCat(item._id)}
                  >
                    <EditIcon />
                  </button>
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

export default Categories;
