import React from "react";
import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";

index.propTypes = {};

function index(props) {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default index;
