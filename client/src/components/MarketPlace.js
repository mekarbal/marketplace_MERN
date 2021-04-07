import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import Login from "./Login";
import Register from "./Register";
import BuyerProfile from "./BuyerProfile";
import ChangePassword from "./ChangePassword";
import Header from "./Header";
import Home from "./Home";
import ProductScreen from "./ProductScreen";
import AdminsLogin from "./AdminsLogin";
const MarketPlace = ({ history }) => {
  let [token, setToken] = useState("");
  const tokenFromStorage = localStorage.getItem("buyerToken");

  useEffect(() => {
    tokenFromStorage !== undefined && setToken(tokenFromStorage);
    if (token) {
      <Redirect to={"/"} />;
    }
  }, [token, history]);

  const logout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <>
      <Header />

      {/* <Route path="/seller/:id" component={ChangePassword}></Route> */}
      <Route path="/" exact component={Home}></Route>
      <Route path="/product/:id" component={ProductScreen}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/regiter" component={Register}></Route>
      <Route path="/user" component={BuyerProfile}></Route>
    </>
  );
};

export default MarketPlace;
