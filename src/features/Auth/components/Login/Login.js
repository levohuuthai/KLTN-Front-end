import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../LoginForm/LoginForm";
import { signin } from "./userSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
Login.propTypes = {};

function Login(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let user = undefined;
  const handleSubmit = async (values) => {
    try {
      const action = signin({
        phone: values.SDT,
        password: values.password,
      });

      const resultAction = await dispatch(action);
      user = unwrapResult(resultAction);
      console.log(user);
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      }
      if (user.role === "shipper") {
        navigate("/admin/listordershipper");
      } else if (user.role === "user") {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      // const action = signin({
      //   phone: values.SDT,
      //   password: values.password,
      // });

      // const resultAction = await dispatch(action);
      // user = unwrapResult(resultAction);
      // if (user !== undefined) {
      toast.error(error.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 2000,
      });
      // }
    }
  };
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
