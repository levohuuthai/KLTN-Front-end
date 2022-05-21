import React from "react";
import { Routes, Route } from "react-router-dom";
import MyOrder from "./pages/MyOrder/MyOrder";
import MyAddress from "./pages/MyAddress/MyAddress";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import MyOrderDetail from "./pages/MyOrderDetail/MyOrderDetail";

function MyOrderGroupFeature(props) {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/myorder/" element={<MyOrder />} />
        <Route path="/myorder/detail/" element={<MyOrderDetail />} />{" "}
        <Route path="/myaddress/" element={<MyAddress />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default MyOrderGroupFeature;
