import React from "react";
import PropTypes from "prop-types";
import { Routes, Route, Redirect } from "react-router-dom";
import Address from "./pages/Address/Address";
import Payment from "./pages/Payment/Payment";
import HeaderCheckout from "./components/HeaderCheckout/HeaderCheckout";

CheckoutFeature.propTypes = {};

function CheckoutFeature(props) {
  return (
    <div>
      <HeaderCheckout />
      <Routes>
        <Route path="/address" element={<Address />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default CheckoutFeature;
