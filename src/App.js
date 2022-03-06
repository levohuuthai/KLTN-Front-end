import "./App.css";
import { Routes, Route, Redirect } from "react-router-dom";
import { Fragment } from "react";
import Home from "features/Home";
import Header from "components/Header/Header";
import Footer from "components/Footer/Footer";
import Login from "features/Auth/components/Login/Login";
import Register from "features/Auth/components/Register/Register";
import AuthenRegister from "features/Auth/components/AuthenRegister/AuthenRegister";
import { Scrollbars } from "react-custom-scrollbars";
import ProductFeature from "features/Product";
import { DataProvider } from "store/store";
import CartFeature from "features/Cart";
import CheckoutFeature from "features/Checkout";
function App() {
  return (
    <Fragment>
      <DataProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/authenregister" element={<AuthenRegister />} />
          <Route path="/products/*" element={<ProductFeature />} />
          <Route path="/cart" element={<CartFeature />} />
          <Route path="/checkout/*" element={<CheckoutFeature />} />
        </Routes>
        <Footer />
      </DataProvider>
    </Fragment>
  );
}

export default App;
