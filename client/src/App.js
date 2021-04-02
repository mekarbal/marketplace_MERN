import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard";
import MarketPlace from "./components/MarketPlace";
import SellerDashboard from "./components/SellerDashboard";
import SellerProfile from "./components/SellerProfile";
function App() {
  return (
    <div className="App mb-5">
      <Router>
        <Switch>
          <Route path="/seller/"  component={SellerProfile}></Route>
          <Route path="/login" component={MarketPlace}></Route>
          <Route path="/regiter" component={MarketPlace}></Route>
          <Route path="/user/:id" component={MarketPlace}></Route>
          <Route path="/seller/:id" component={MarketPlace}></Route>
          <Route path="/admin/" component={AdminDashboard}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
