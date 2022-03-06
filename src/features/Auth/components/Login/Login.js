import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../LoginForm/LoginForm";
import style from "./Login.module.scss";

Login.propTypes = {};

function Login(props) {
  const handleSubmit = (values) => {
    console.log("Form: ", values);
  };
  return (
    <div>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
