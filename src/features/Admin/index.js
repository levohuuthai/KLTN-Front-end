import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProductAdmin from "./pages/AddProductAdmin/AddProductAdmin";
import DashBoard from "./pages/DashBoard/DashBoard";
import ListCoupon from "./pages/ListCoupon/ListCoupon";
import ListOrderAdmin from "./pages/ListOrderAdmin/ListOrderAdmin";
import ListOrderDetailAdmin from "./pages/ListOrderDetailAdmin/ListOrderDetailAdmin";
import ListProductAdmin from "./pages/ListProductAdmin/ListProductAdmin";
import ListProductDetailAdmin from "./pages/ListProductDetailAdmin/ListProductDetailAdmin";
import ListTypeProductAdmin from "./pages/ListTypeProductAdmin/ListTypeProductAdmin";
import ListUserAdmin from "./pages/ListUserAdmin/ListUserAdmin";
import ListMess from "./pages/ListMess/ListMess";
import ListShipperAdmin from "./pages/ListShipperAdmin/ListShipperAdmin";
import UpdateProductAdmin from "./pages/UpdateProductAdmin/UpdateProductAdmin";
import Statistic from "./pages/Statistic/Statistic";
import ListOrderShipperAdmin from "./pages/ListOrderShipperAdmin/ListOrderShipperAdmin";
import ListOrderDetailShipperAdmin from "./pages/ListOrderDetailShipperAdmin/ListOrderDetailShipperAdmin";

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
        <Route path="/listcoupon" element={<ListCoupon />} />{" "}
        <Route path="/listmess" element={<ListMess />} />{" "}
        <Route path="/statistic" element={<Statistic />} />{" "}
        <Route path="/listshipper" element={<ListShipperAdmin />} />{" "}
        <Route path="/listordershipper" element={<ListOrderShipperAdmin />} />{" "}
        <Route
          path="/listorderDetailshipper"
          element={<ListOrderDetailShipperAdmin />}
        />
      </Routes>
      {/* <AsideAdmin /> */}
    </div>
  );
}

export default Admin;
