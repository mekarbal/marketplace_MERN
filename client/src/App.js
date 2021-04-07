import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import MarketPlace from "./components/MarketPlace";
import SellerDashboard from "./components/SellerDashboard";
import SellerProfile from "./components/SellerProfile";
import Home from "./components/Home";
import AdminsLogin from "./components/AdminsLogin";
import ChangePassword from "./components/ChangePassword";
function App() {
  return (
    <div className="App mb-5">
      <Router>
        <Switch>
          <Route path="/admin/login" exact component={AdminsLogin}></Route>
          <Route path="/admin/" component={AdminDashboard}></Route>
          <Route path="/seller/" exact component={SellerProfile}></Route>
          <Route path="/seller/profile" exact component={SellerProfile}></Route>
          <Route path="/seller/st" component={SellerProfile}></Route>
          <Route path="/seller/products" component={SellerProfile}></Route>
          <Route path="/seller/pack" component={SellerProfile}></Route>
          <Route
            path="/seller/resetPassword/:id"
            exact
            component={ChangePassword}
          ></Route>
          <Route path="/" component={MarketPlace}></Route>
          <Route path="/regiter" component={MarketPlace}></Route>
          <Route path="/user/:id" component={MarketPlace}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
