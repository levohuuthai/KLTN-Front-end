import React from "react";
import { Route, Routes } from "react-router-dom";
import AsideAdmin from "./components/AsideAdmin/AsideAdmin";
import AddProductAdmin from "./pages/AddProductAdmin/AddProductAdmin";
import DashBoard from "./pages/DashBoard/DashBoard";
import ListCoupon from "./pages/ListCoupon/ListCoupon";
import ListOrderAdmin from "./pages/ListOrderAdmin/ListOrderAdmin";
import ListOrderDetailAdmin from "./pages/ListOrderDetailAdmin/ListOrderDetailAdmin";
import ListProductAdmin from "./pages/ListProductAdmin/ListProductAdmin";
import ListProductDetailAdmin from "./pages/ListProductDetailAdmin/ListProductDetailAdmin";
import ListTypeProductAdmin from "./pages/ListTypeProductAdmin/ListTypeProductAdmin";
import ListUserAdmin from "./pages/ListUserAdmin/ListUserAdmin";
import UpdateProductAdmin from "./pages/UpdateProductAdmin/UpdateProductAdmin";

function Admin(props) {
  return (
    <div>
      {/* <AsideAdmin /> */}
      <Routes>
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/listproduct" element={<ListProductAdmin />} />{" "}
        <Route path="/listdetailproduct" element={<ListProductDetailAdmin />} />{" "}
        <Route path="/addproduct" element={<AddProductAdmin />} />
        <Route path="/updateproduct" element={<UpdateProductAdmin />} />
        <Route path="/listuser" element={<ListUserAdmin />} />{" "}
        <Route path="/listypeproduct" element={<ListTypeProductAdmin />} />{" "}
        <Route path="/listorder" element={<ListOrderAdmin />} />{" "}
        <Route path="/listorderDetail" element={<ListOrderDetailAdmin />} />{" "}
        <Route path="/listcoupon" element={<ListCoupon />} />
      </Routes>
      {/* <AsideAdmin /> */}
    </div>
  );
}

export default Admin;
