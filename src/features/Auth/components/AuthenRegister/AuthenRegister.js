import React from "react";
import PropTypes from "prop-types";
import AuthenRegisterForm from "../AuthenRegisterForm/AuthenRegisterForm";

AuthenRegister.propTypes = {};

function AuthenRegister(props) {
  const handleSubmit = (values) => {
    console.log("Form: ", values);
  };
  return (
    <div>
      <AuthenRegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default AuthenRegister;
