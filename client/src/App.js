import NavBar from "./components/admin/NavBar";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Categories from "./components/admin/cartegory/Categories";
import AddCategory from "./components/admin/cartegory/AddCategory";
import UpdateCat from "./components/admin/cartegory/UpdateCat";
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Switch>
          <Route path="/admin/category" component={Categories}></Route>
          <Route path="/admin/addcategory" component={AddCategory}></Route>
          <Route path="/admin/category/:id" component={UpdateCat}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
