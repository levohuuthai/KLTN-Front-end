import React from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import SearchPage from "./pages/SearchPage/SearchPage";

function SearchFeature(props) {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        {/* <Route path="/detail" element={<DetailPage />} /> */}
      </Routes>
      <Footer />
    </div>
  );
}

export default SearchFeature;
