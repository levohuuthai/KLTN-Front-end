import React from "react";
import { Routes, Route } from "react-router-dom";
import MyOrder from "./pages/MyOrder/MyOrder";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import MyOrderDetail from "./pages/MyOrderDetail/MyOrderDetail";

function MyOrderGroupFeature(props) {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MyOrder />} />
        <Route path="/detail" element={<MyOrderDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default MyOrderGroupFeature;
