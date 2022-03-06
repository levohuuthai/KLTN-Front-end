import React from "react";
import PropTypes from "prop-types";
import { Routes, Route, Redirect } from "react-router-dom";
import Address from "./pages/Address/Address";
import Payment from "./pages/Payment/Payment";

CheckoutFeature.propTypes = {};

function CheckoutFeature(props) {
  return (
    <div>
      <Routes>
        <Route path="/address" element={<Address />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </div>
  );
}

export default CheckoutFeature;
