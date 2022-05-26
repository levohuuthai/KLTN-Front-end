import React, { useState } from "react";
import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Register from "./components/Register/Register";
import AuthenRegister from "./components/AuthenRegister/AuthenRegister";

AuthFeature.propTypes = {};

function AuthFeature(props) {
  const [SDT, setSDT] = useState();
  const handleReceiveSDT = (sdt) => {
    setSDT(sdt);
  };
  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/register"
          element={<Register onReceiveSDT={handleReceiveSDT} />}
        />
        <Route
          path="/authenregister"
          element={<AuthenRegister onFromSDT={SDT} />}
        />
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default AuthFeature;
