import "./App.css";
import { Routes, Route, Redirect } from "react-router-dom";
import { Fragment } from "react";
import Home from "features/Home";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
function App() {
  return (
    <Fragment>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
      <Footer />
    </Fragment>
  );
}

export default App;
