import React, { useState } from "react";
import { useForm } from "react-hook-form";
import style from "./RegisterForm.module.scss";
import PropTypes from "prop-types";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "components/Form-control/InputField";
import { makeStyles } from "@material-ui/styles";
import { Button, Typography } from "@material-ui/core";
import iconGoogle from "assets/images/auth//login/iconGoogle.jpg";
import imgbackground4 from "assets/images/auth/login/imgbackground4.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import authAPI from "api/authAPI";

RegisterForm.propTypes = { onSubmit: PropTypes.func };
const useStyles = makeStyles((theme) => ({
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

function RegisterForm(props) {
  const [error, setError] = useState("");
  let navigate = useNavigate();
  const schema = yup.object().shape({
    SDT: yup
      .string()
      .required("Vui lòng nhập số điện thoại")
      .test(
        "Số điện thoại bắt đầu là 0 và gồm 10 kí số ",
        "Số điện thoại bắt đầu là 0 và gồm 10 kí số",
        (value) => {
          const regex = /^(0|84)[0-9]{9}$/;
          return regex.test(value);
        }
      ),
    // .test("Số điện thoại bắt đầu là 0 và gồm 10 kí số ", error, (value) => {
    //   return error;
    // }),
  });
  const classes = useStyles();
  const form = useForm({
    defaultValues: {
      SDT: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      onSubmit(values);
    }
    form.reset();
    // navigate("/auth/authenregister");
  };
  const handleLoginGoogle = (e) => {
    const fetchRequestLoginGoogle = async () => {
      try {
        const requestLoginGoogle = await authAPI.loginGoogle();
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestLoginGoogle();
  };
  const handleLoginFacebook = (e) => {
    const fetchRequestLoginFacebook = async () => {
      try {
        const requestLoginFacebook = await authAPI.loginFacebook();
      } catch (error) {
        console.log(error);
      }
    };
    fetchRequestLoginFacebook();
  };
  return (
    <div className={`${style.form_register} wrap`}>
      <div className={`${style.background_slider} `}>
        <div className={style.imgbackground}>
          <img src={imgbackground4} alt="" />
        </div>
        <div className={style.title_background}>
          Tài khoản của tôi <p>Trang chủ / Tài khoản</p>
        </div>
      </div>
      <div className={style.title}>Đăng ký</div>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={`${style.form} d-flex flex-column`}
      >
        <Typography className={classes.title}>
          Số điện thoại <span style={{ color: "red" }}>*</span>
        </Typography>
        <InputField name="SDT" label="Nhập số điện thoại" form={form} />
        <Button type="submit" className={classes.submit}>
          Tiếp theo
        </Button>
        <div className={`${style.or} position-relative`}>
          <p className="position-absolute">Hoặc tiếp tục bằng</p>
        </div>
        <div className={style.buttonsns}>
          <div className={style.facebook} onClick={handleLoginFacebook}>
            <i className="fab fa-facebook"></i> Facebook
          </div>
          <div className={style.google} onClick={handleLoginGoogle}>
            <img src={iconGoogle} alt="icon google" /> Google
          </div>
        </div>
        <div className={`${style.policy} text-center`}>
          <p>
            Bằng việc đăng ký, bạn đã đồng ý với Rubix về
            <br />
            <span> Điều khoản dịch vụ & chính sách bảo mật</span>
          </p>
        </div>
        <div className={`${style.login}`}>
          <p>
            Bạn đã có tài khoản{" "}
            <Link to="/login">
              <span>Đăng nhập </span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
