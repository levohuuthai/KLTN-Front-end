import React from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import DiscountPage from "./pages/DiscountPage/DiscountPage";

function DiscountFeature(props) {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<DiscountPage />} />
        {/* <Route path="/detail" element={<DetailPage />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default DiscountFeature;
