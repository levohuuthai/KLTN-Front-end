import React from "react";
import PropTypes from "prop-types";
import { Routes, Route, Redirect } from "react-router-dom";
import MyOrder from "./pages/MyOrder/MyOrder";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import MyOrderDetail from "./pages/MyOrderDetail/MyOrderDetail";

MyOrderGroupFeature.propTypes = {};

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
