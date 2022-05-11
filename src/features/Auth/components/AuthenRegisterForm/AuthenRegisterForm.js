import React, { useState } from "react";
import { useForm } from "react-hook-form";
import style from "./AuthenRegisterForm.module.scss";
import PropTypes from "prop-types";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/Form-control/InputField";
import { makeStyles } from "@material-ui/styles";
import PasswordField from "components/Form-control/PasswordField";
import { Button, TextField, Typography } from "@material-ui/core";
import imgbackground4 from "assets/images/auth/login/imgbackground4.jpg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
AuthenRegisterForm.propTypes = { onSubmit: PropTypes.func };
const useStyles = makeStyles((theme) => ({
  // emailInput: { padding: theme.spacing(2) },
  title: {
    color: "#444",
  },
  titlePassword: {
    color: "#444",
    paddingTop: "13px",
  },
  submit: {
    background: "black",
    width: "130px",
    height: "50px",
    color: "#fff",
    transition: "all 0.6s",
    marginTop: "20px",
    "&:hover": {
      background: "#ba933e",
      transition: "all 0.6s",
    },
  },
  forgetPassword: {
    color: "#444",
    paddingTop: "30px",
  },
}));

function AuthenRegisterForm(props) {
  const classes = useStyles();
  const schema = yup.object().shape({
    code: yup.string().required("Vui lòng nhập mã Code"),
    firstName: yup.string().required("Vui lòng nhập Họ"),
    lastName: yup.string().required("Vui lòng nhập Tên"),
    password: yup.string().required("Vui lòng nhập mật khẩu"),
    Repassword: yup
      .string()
      .required("Vui lòng nhập lại mật khẩu")
      .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
  });
  const form = useForm({
    defaultValues: {
      code: "",
      firstName: "",
      lastName: "",
      password: "",
      Repassword: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    const { onSubmit } = props;

    if (onSubmit) {
      onSubmit(values);
    }

    // form.reset();
  };
  return (
    <div className={`${style.form_login} wrap`}>
      <div className={`${style.background_slider} `}>
        <div className={style.imgbackground}>
          <img src={imgbackground4} alt="" />
        </div>
        <div className={style.title_background}>
          Tài khoản của tôi <p>Trang chủ / Tài khoản</p>
        </div>
      </div>
      <div className={style.title}>Xác thực đăng ký</div>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={`${style.form} d-flex flex-column`}
      >
        <div className={style.code_bg}>
          <div className={style.content_code}>
            <span>Mã kích hoạt đã được gửi đến số điện thoại</span>
            <span className={style.sdt}>{props.onFromPhone}</span>

            <div className={style.inputCode}>
              <InputField name="code" label="Nhập mã code ở " form={form} />
            </div>
            <span className={style.receive_code}>Nhận lại mã kích hoạt</span>
          </div>
        </div>
        <div className="d-flex">
          <div>
            <Typography className={classes.title}>
              Họ <span style={{ color: "red" }}>*</span>
            </Typography>
            <InputField name="firstName" label="Nhập họ" form={form} />
          </div>
          <div style={{ marginLeft: "50px" }}>
            <Typography className={classes.title}>
              Tên <span style={{ color: "red" }}>*</span>
            </Typography>
            <InputField name="lastName" label="Nhập tên" form={form} />
          </div>
        </div>
        <Typography className={classes.titlePassword}>
          Mật Khẩu <span style={{ color: "red" }}>*</span>
        </Typography>
        <PasswordField name="password" label="Nhập mật khẩu" form={form} />
        <Typography className={classes.titlePassword}>
          Nhập lại mật khẩu <span style={{ color: "red" }}>*</span>
        </Typography>
        <PasswordField
          name="Repassword"
          label="Nhập lại mật khẩu"
          form={form}
        />
        <Button type="submit" variant="contained" className={classes.submit}>
          Xác nhận
        </Button>
        <div className={`${style.comeback}`}>
          <Link to="/auth/register" />
          Quay lại
        </div>
      </form>
    </div>
  );
}

export default AuthenRegisterForm;
