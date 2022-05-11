import "./App.css";
import { Routes, Route, Redirect, useLocation } from "react-router-dom";
import React, { Fragment } from "react";
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
import MyOrderGroupFeature from "features/MyOrderGroup";
import Admin from "features/Admin";
import NotFound from "components/NotFound/NotFound";
import AuthFeature from "features/Auth";
import SearchFeature from "features/Search";
import DiscountFeature from "features/Discount";
import WishList from "features/WishList/WishList";

function App() {
  const location = useLocation();

  return (
    <Fragment>
      <DataProvider>
        {location.pathname.match(/\/admin/) ? (
          <Routes>
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth/*" element={<AuthFeature />} />
              <Route path="/products/*" element={<ProductFeature />} />
              <Route path="/search/*" element={<SearchFeature />} />
              <Route path="/discount/*" element={<DiscountFeature />} />
              <Route path="/cart" element={<CartFeature />} />
              <Route path="/checkout/*" element={<CheckoutFeature />} />
              <Route path="/myorder/*" element={<MyOrderGroupFeature />} />{" "}
              <Route path="/wishlist/*" element={<WishList />} />
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </>
        )}
      </DataProvider>
    </Fragment>
  );
}

export default App;
