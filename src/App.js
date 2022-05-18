import "./App.css";
import { Routes, Route, useLocation, Navigate, Outlet } from "react-router-dom";
import React, { Fragment } from "react";
import Home from "features/Home";
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
import { useSelector } from "react-redux";
import { authentication } from "authentication/authentication";
import Cookies from "js-cookie";

function App() {
  const location = useLocation();
  const loggedInUser = useSelector((state) => state.user.current);
  console.log(loggedInUser);
  return (
    <Fragment>
      <DataProvider>
        {location.pathname.match(/\/admin/) ? (
          loggedInUser?.role === "admin" ? (
            <Routes>
              <Route path="/admin/*" element={<Admin />} />
            </Routes>
          ) : (
            <h2
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              Không được phép
            </h2>
          )
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth/*" element={<AuthFeature />} />
              <Route path="/products/*" element={<ProductFeature />} />
              <Route path="/search/*" element={<SearchFeature />} />
              <Route path="/discount/*" element={<DiscountFeature />} />
              <Route path="/cart" element={<CartFeature />} />
              {/* <Route path="/checkout/" element={<PrivateRoute />}>
                <Route path="/checkout/" element={<CheckoutFeature />} />
              </Route> */}
              <Route path="/checkout/*" element={<CheckoutFeature />} />
              <Route
                path="/customer/*"
                element={<MyOrderGroupFeature />}
              />{" "}
              <Route path="/wishlist/*" element={<WishList />} />
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </>
        )}
      </DataProvider>
    </Fragment>
  );
}

// function PrivateRouter({ component: Component, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         authentication.isAuthencation() ? (
//           <Component {...props} />
//         ) : (
//           <Navigate to="/" />
//         )
//       }
//     ></Route>
//   );
// }

// const PrivateRoute = () => {
//   const auth = Cookies.get("token");
//   return auth ? <Outlet /> : <Navigate to="/auth/login" />;
// };

export default App;
