import React from "react";
import { Route } from "react-router-dom";
import ChangePassword from "./ChangePassword";
import Pack from "./Pack";
import Products from "./Products";
import SellerDashboard from "./SellerDashboard";
import SellerInfo from "./SellerInfo";
import SellerStatisctics from "./SellerStatisctics";

const SellerProfile = () => {
  return (
    <div className="mb-5">
      <SellerDashboard />

      <Route path="/seller/profile" component={SellerInfo}></Route>
      <Route path="/seller/st" component={SellerStatisctics}></Route>
      <Route path="/seller/products" component={Products}></Route>
      <Route path="/seller/pack" component={Pack}></Route>
    </div>
  );
};

export default SellerProfile;
