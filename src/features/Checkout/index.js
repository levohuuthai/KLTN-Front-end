import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Address from "./pages/Address/Address";
import Payment from "./pages/Payment/Payment";
import HeaderCheckout from "./components/HeaderCheckout/HeaderCheckout";
import Cookies from "js-cookie";
import { GlobalContext } from "store/store";
import { ACTIOS } from "store/actions";

CheckoutFeature.propTypes = {};

function CheckoutFeature(props) {
  return (
    <div>
      <HeaderCheckout />
      <Routes>
        <Route path="/address" element={<Address />} />
        {/* <Route exact path="/payment/" element={<PrivateRoute />}>
          <Route exact path="/payment/" element={<PrivateRouteAddress />}> */}
        <Route exact path="/payment/" element={<Payment />} />{" "}
        {/* </Route>
        </Route> */}
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

const PrivateRoute = () => {
  const auth = Cookies.get("token");
  return auth ? <Outlet /> : <Navigate to="/auth/login" />;
};
const PrivateRouteAddress = () => {
  const { state } = useContext(GlobalContext);
  return state.dataAddress.length > 0 ? (
    <Outlet />
  ) : (
    <Navigate to="/checkout/address" />
  );
};

export default CheckoutFeature;
