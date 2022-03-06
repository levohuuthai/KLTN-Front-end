import React from "react";
import PropTypes from "prop-types";
import { Routes, Route, Redirect } from "react-router-dom";
import ListPage from "./pages/ListPage/ListPage";
import DetailPage from "./pages/DetailPage/DetailPage";

ProductFeature.propTypes = {};

function ProductFeature(props) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/detail" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default ProductFeature;
