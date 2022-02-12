import React from "react";
import PropTypes from "prop-types";
import { Route, Routes } from "react-router-dom";
import Slide from "./pages/Slide";

Home.propTypes = {};

function Home(props) {
  return (
    <div>
      Home
      <Routes>
        <Route path="" element={<Slide />}></Route>
      </Routes>
    </div>
  );
}

export default Home;
