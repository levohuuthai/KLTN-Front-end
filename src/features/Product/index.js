import React from "react";
import PropTypes from "prop-types";
import { Routes, Route, Redirect } from "react-router-dom";
import ListPage from "./pages/ListPage/ListPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";

ProductFeature.propTypes = {};

function ProductFeature(props) {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/detail" element={<DetailPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default ProductFeature;
