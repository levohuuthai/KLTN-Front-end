import React from "react";
import classes from "./formChangePass.module.scss";
import { useState, useEffect } from "react";
import authAPI from "api/authAPI";
import { Button, makeStyles, Typography } from "@material-ui/core";
import PasswordField from "components/Form-control/PasswordField";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
toast.configure();
const useStyles = makeStyles((theme) => ({
  // emailInput: { padding: theme.spacing(2) },
  title: {
    color: "#444",
  },
  titlePassword: {
    color: "#444",
    // paddingTop: "0px",
    marginBottom: "-10px",
  },
  submit: {
    background: "black",
    width: "130px",
    height: "50px",
    color: "#fff",
    transition: "all 0.6s",
    marginTop: "5px",
    textAlign: "right",
    "&:hover": {
      background: "#ba933e",
      transition: "all 0.6s",
    },
  },
}));
const FormChangePass = (props) => {
  const cancelHandler = () => {
    props.onCancel(false);
  };

  //form mới
  const classesMUI = useStyles();
  const schema = yup.object().shape({
    password: yup.string().required("Vui lòng nhập mật khẩu"),
    repassword: yup
      .string()
      .required("Vui lòng nhập lại mật khẩu")
      .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
    newpassword: yup.string().required("Vui lòng nhập mật khẩu mới"),
  });
  const form = useForm({
    defaultValues: {
      password: "",
      repassword: "",
      newpassword: "",
    },
    resolver: yupResolver(schema),
  });
  const handleSubmit = async (values) => {
    console.log(values);
    const fetchUpdatePassword = async () => {
      try {
        const verify = await authAPI.ChangePassword({
          password: values.password,
          reEnterPassword: values.repassword,
          newPassword: values.newpassword,
        });
        if (verify.status === 200) {
          console.log("Success");
          props.onFormFalse(false);
          toast.success("Đổi mật khẩu thành công", {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
          });
        }
      } catch (error) {
        toast.error("Mật khẩu hiện tại không đúng", {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
        });
      }
    };
    fetchUpdatePassword();
    form.reset();
  };
  return (
    <div className={classes.ViewchangePass}>
      <div className={classes.header}>
        <h2>Tạo mật khẩu mới</h2>
        <div onClick={cancelHandler}>
          <i className="fas fa-times"></i>
        </div>
      </div>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className={`${classes.form} d-flex flex-column`}
      >
        <div className={classes.InputChangePassword}>
          <Typography className={classesMUI.titlePassword}>
            Mật Khẩu hiện tại <span style={{ color: "red" }}>*</span>
          </Typography>
          <PasswordField
            name="password"
            label="Nhập mật khẩu hiện tại"
            form={form}
          />
        </div>
        <div>
          <Typography className={classesMUI.titlePassword}>
            Mật Khẩu hiện tại <span style={{ color: "red" }}>*</span>
          </Typography>
          <PasswordField
            name="repassword"
            label="Nhập lại mật khẩu hiện lại"
            form={form}
          />
        </div>
        <div>
          <Typography className={classesMUI.titlePassword}>
            Mật Khẩu mới <span style={{ color: "red" }}>*</span>
          </Typography>
          <PasswordField
            name="newpassword"
            label="Nhập mật khẩu mới"
            form={form}
          />
        </div>
        <div style={{ textAlign: "right" }}>
          <Button type="submit" className={classesMUI.submit}>
            Đổi mật khẩu
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FormChangePass;
