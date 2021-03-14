import NavBar from "./components/admin/NavBar";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Categories from "./components/admin/cartegory/Categories";
import AddCategory from "./components/admin/cartegory/AddCategory";
function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Switch>
          <Route path="/admin/category" exact component={Categories}></Route>
          <Route path="/admin/addcategory" component={AddCategory}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
