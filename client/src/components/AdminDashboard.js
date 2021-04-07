import React from "react";
import { Route } from "react-router";
import NavBar from "./admin/NavBar";
import UpdateCat from "./admin/cartegory/UpdateCat";
import Categories from "./admin/cartegory/Categories";
import Buyers from "./admin/Buyers";
import Sellers from "./admin/Sellers";
import Ads from "./admin/ads/Ads";
import Admins from "./admin/Admins";
import Orders from "./admin/Orders";
import DeliveryMen from "./admin/DeliveryMen";
const AdminDashboard = () => {
  return (
    <div className="mb-5">
      <NavBar />
      <Route path="/admin/categories" component={Categories}></Route>
      <Route path="/admin/category/:id" component={UpdateCat}></Route>
      <Route path="/admin/buyers" component={Buyers}></Route>
      <Route path="/admin/sellers" component={Sellers}></Route>
      <Route path="/admin/ads" component={Ads}></Route>
      <Route path="/admin/admins" component={Admins}></Route>
      <Route path="/admin/orders" component={Orders}></Route>
      <Route path="/admin/deliverymen" component={DeliveryMen}></Route>
    </div>
  );
};

export default AdminDashboard;
