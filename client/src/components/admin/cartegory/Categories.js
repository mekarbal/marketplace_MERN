import React, { useState, useEffect, Redirect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddCategory from "./AddCategory";
import UpdateCat from "./UpdateCat";
function Categories({ history }) {
  const [categories, setCategories] = useState([]);

  const getAllCategories = async () => {
    await axios
      .get("http://localhost:4000/category")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => console.log(err));
  };
  const deleteCat = async (id) => {
    console.log(id);

    await axios
      .delete("http://localhost:4000/category/" + id)
      .then(() => {
        getAllCategories();
      })
      .catch((err) => console.log(err));
  };

  const updateCat = async (id) => {
    history.push("/admin/category/" + id);
  };

  useEffect(() => {
    getAllCategories();
    console.log(categories);
  }, []);
  
  return (
    <div className="container">
      <AddCategory />
      <Table striped bordered hover>
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
    </div>
  );
}

export default Categories;
